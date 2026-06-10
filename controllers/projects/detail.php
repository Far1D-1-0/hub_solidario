<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id) json_err('ID de proyecto inválido');

$pdo = db();

// Datos principales del proyecto
$stmt = $pdo->prepare('
    SELECT
        p.id_proyecto         AS id,
        p.nombre,
        p.descripcion,
        p.imagen,
        p.ubicacion,
        p.about,
        p.objetivos,
        p.comunidad,
        p.operacion,
        p.porcentaje_completacion AS completacion,
        p.fecha_creacion,
        p.datos_importados,
        p.configuracion,
        p.id_categoria,
        c.nombre              AS categoria_nombre,
        c.color               AS categoria_color,
        c.codigo              AS categoria_codigo,
        u.id_usuario          AS lider_id,
        u.nombre              AS lider_nombre,
        u.foto_perfil         AS lider_foto,
        u.about               AS lider_about,
        u.instagram           AS lider_instagram,
        u.linkedin            AS lider_linkedin,
        u.linktree            AS lider_linktree,
        ep.codigo             AS estado
    FROM Proyecto p
    LEFT JOIN Categoria c       ON c.id_categoria        = p.id_categoria
    LEFT JOIN Usuario u         ON u.id_usuario          = p.id_usuario_lider
    JOIN  EstadoProyecto ep     ON ep.id_estado_proyecto = p.id_estado_proyecto
    WHERE p.id_proyecto = ?
');
$stmt->execute([$id]);
$project = $stmt->fetch();

if (!$project) json_err('Proyecto no encontrado', 404);

// Decodificar columnas JSON
$project['objetivos']        = json_decode($project['objetivos']        ?? '[]',   true) ?? [];
$project['operacion']        = json_decode($project['operacion']        ?? '[]',   true) ?? [];
$project['datos_importados'] = json_decode($project['datos_importados'] ?? 'null', true) ?? (object)[];
$proj_config                 = json_decode($project['configuracion']    ?? 'null', true) ?? [];
$project['charts_config']    = $proj_config['charts'] ?? [];
unset($project['configuracion']);

// KPIs con último resultado
$kpis = $pdo->prepare('
    SELECT
        k.id_kpi,
        k.nombre,
        k.descripcion,
        k.valor_meta,
        k.id_unidad_medida,
        um.nombre  AS unidad_nombre,
        um.simbolo AS unidad_simbolo,
        ek.codigo  AS estado,
        r.valor    AS valor_actual,
        r.fecha_resultado AS fecha_ultimo_resultado,
        (SELECT au.tipo_grafica
         FROM ResultadoKPI r2
         JOIN ArchivoUsuario au ON au.id_archivo_usuario = r2.id_archivo_usuario
         WHERE r2.id_kpi = k.id_kpi AND au.tipo_grafica IS NOT NULL
         ORDER BY r2.fecha_resultado DESC
         LIMIT 1) AS tipo_grafica
    FROM KPI k
    LEFT JOIN UnidadMedida um  ON um.id_unidad_medida = k.id_unidad_medida
    LEFT JOIN EstadoKPI ek     ON ek.id_estado_kpi    = k.id_estado_kpi
    LEFT JOIN ResultadoKPI r ON r.id_resultado_kpi = (
        SELECT id_resultado_kpi
        FROM ResultadoKPI
        WHERE id_kpi = k.id_kpi
        ORDER BY fecha_resultado DESC
        LIMIT 1
    )
    WHERE k.id_proyecto = ?
      AND ek.codigo = \'ACTIVO\'
    ORDER BY k.id_kpi
');
$kpis->execute([$id]);
$project['kpis'] = $kpis->fetchAll();

// Últimas 10 publicaciones
$pubs = $pdo->prepare('
    SELECT
        pub.id_publicacion AS id,
        pub.contenido,
        pub.fecha_publicacion,
        u.nombre AS autor_nombre
    FROM Publicacion pub
    JOIN Usuario u              ON u.id_usuario          = pub.id_usuario
    JOIN EstadoPublicacion ep   ON ep.id_estado_publicacion = pub.id_estado_publicacion
    WHERE pub.id_proyecto = ?
      AND ep.codigo = \'PUBLICADA\'
    ORDER BY pub.fecha_publicacion DESC
    LIMIT 10
');
$pubs->execute([$id]);
$project['publicaciones'] = $pubs->fetchAll();

// Conteo de testimonios por estado (solo roles públicos)
$ttest = $pdo->prepare('
    SELECT et.codigo AS estado, COUNT(*) AS total
    FROM Testimonio t
    JOIN EstadoTestimonio et ON et.id_estado_testimonio = t.id_estado_testimonio
    WHERE t.id_proyecto = ?
      AND t.tipo_participante IN (\'Beneficiario\', \'Estudiante\')
    GROUP BY et.codigo
');
$ttest->execute([$id]);
$project['testimonios_resumen'] = $ttest->fetchAll();

// Voluntarios activos
$vols = $pdo->prepare('
    SELECT u.id_usuario AS id, u.nombre, u.foto_perfil
    FROM ProyectoUsuario pu
    JOIN Usuario u ON u.id_usuario = pu.id_usuario
    WHERE pu.id_proyecto = ?
      AND pu.fecha_desvinculacion IS NULL
    ORDER BY pu.fecha_vinculacion
');
$vols->execute([$id]);
$project['voluntarios'] = $vols->fetchAll();

// Historial para gráficas (todos los resultados de KPIs activos, ordenados por fecha)
$hist = $pdo->prepare('
    SELECT r.id_kpi, r.valor, DATE_FORMAT(r.fecha_resultado, \'%Y-%m\') AS mes
    FROM ResultadoKPI r
    JOIN KPI k      ON k.id_kpi         = r.id_kpi
    JOIN EstadoKPI ek ON ek.id_estado_kpi = k.id_estado_kpi
    WHERE k.id_proyecto = ?
      AND ek.codigo = \'ACTIVO\'
    ORDER BY r.fecha_resultado ASC
');
$hist->execute([$id]);
$chartData = [];
foreach ($hist->fetchAll() as $row) {
    $chartData[(int)$row['id_kpi']][] = ['mes' => $row['mes'], 'valor' => (float)$row['valor']];
}
$project['chart_data'] = $chartData;

json_ok($project);
