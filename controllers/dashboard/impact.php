<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$pdo = db();

$activo_id = (int) $pdo->query(
    "SELECT id_estado_proyecto FROM EstadoProyecto WHERE codigo = 'ACTIVO'"
)->fetchColumn();

// ── Totales generales ─────────────────────────────────────────────────────────

$proyectos_activos = (int) $pdo->query(
    "SELECT COUNT(*) FROM Proyecto WHERE id_estado_proyecto = $activo_id"
)->fetchColumn();

// Suma del último resultado de cada KPI con unidad PERSONA en proyectos activos
$total_personas = (float) $pdo->query("
    SELECT COALESCE(SUM(r.valor), 0)
    FROM ResultadoKPI r
    JOIN (
        SELECT id_kpi, MAX(fecha_resultado) AS max_fecha
        FROM ResultadoKPI GROUP BY id_kpi
    ) lx ON lx.id_kpi = r.id_kpi AND lx.max_fecha = r.fecha_resultado
    JOIN KPI k          ON k.id_kpi = r.id_kpi
    JOIN UnidadMedida u ON u.id_unidad_medida = k.id_unidad_medida AND u.codigo = 'PERSONA'
    JOIN Proyecto p     ON p.id_proyecto = k.id_proyecto AND p.id_estado_proyecto = $activo_id
")->fetchColumn();

// Suma del último resultado de cada KPI con unidad HORA en proyectos activos
$total_horas = (float) $pdo->query("
    SELECT COALESCE(SUM(r.valor), 0)
    FROM ResultadoKPI r
    JOIN (
        SELECT id_kpi, MAX(fecha_resultado) AS max_fecha
        FROM ResultadoKPI GROUP BY id_kpi
    ) lx ON lx.id_kpi = r.id_kpi AND lx.max_fecha = r.fecha_resultado
    JOIN KPI k          ON k.id_kpi = r.id_kpi
    JOIN UnidadMedida u ON u.id_unidad_medida = k.id_unidad_medida AND u.codigo = 'HORA'
    JOIN Proyecto p     ON p.id_proyecto = k.id_proyecto AND p.id_estado_proyecto = $activo_id
")->fetchColumn();

// ── Impacto por categoría (ODS) ───────────────────────────────────────────────

// Mapeo fijo: categoria.codigo → ODS
const ODS_MAP = [
    'ALIMENTACION'   => ['ods' => 2,  'nombre' => 'Hambre Cero',             'color' => '#E11D48', 'etiqueta' => 'Beneficiarios registrados'],
    'SALUD'          => ['ods' => 3,  'nombre' => 'Salud y Bienestar',       'color' => '#2563EB', 'etiqueta' => 'Personas atendidas'],
    'EDUCACION'      => ['ods' => 4,  'nombre' => 'Educación de Calidad',    'color' => '#7C3AED', 'etiqueta' => 'Personas capacitadas'],
    'MEDIO_AMBIENTE' => ['ods' => 13, 'nombre' => 'Acción Climática',        'color' => '#16A34A', 'etiqueta' => 'Beneficiarios directos'],
    'CONSTRUCCION'   => ['ods' => 11, 'nombre' => 'Ciudades Sostenibles',    'color' => '#F05A28', 'etiqueta' => 'Personas beneficiadas'],
    'TECNOLOGIA'     => ['ods' => 10, 'nombre' => 'Reducción Desigualdades', 'color' => '#0EA5E9', 'etiqueta' => 'Personas capacitadas'],
    'ARTE'           => ['ods' => 11, 'nombre' => 'Arte y Cultura',          'color' => '#DB2777', 'etiqueta' => 'Participantes'],
];

// Por cada categoría: proyectos activos + suma del último valor PERSONA + suma de metas PERSONA
$stmt = $pdo->prepare("
    SELECT
        cat.codigo                         AS categoria_codigo,
        COUNT(DISTINCT p.id_proyecto)      AS num_proyectos,
        COALESCE(SUM(agg.total_actual), 0) AS total_actual,
        COALESCE(SUM(agg.total_meta),   0) AS total_meta
    FROM Categoria cat
    LEFT JOIN Proyecto p
        ON p.id_categoria        = cat.id_categoria
        AND p.id_estado_proyecto = :activo_id
    LEFT JOIN (
        SELECT
            k.id_proyecto,
            SUM(r.valor)       AS total_actual,
            SUM(k.valor_meta)  AS total_meta
        FROM KPI k
        JOIN UnidadMedida u ON u.id_unidad_medida = k.id_unidad_medida AND u.codigo = 'PERSONA'
        JOIN (
            SELECT r2.id_kpi, r2.valor
            FROM ResultadoKPI r2
            JOIN (
                SELECT id_kpi, MAX(fecha_resultado) AS max_fecha
                FROM ResultadoKPI GROUP BY id_kpi
            ) lx2 ON lx2.id_kpi = r2.id_kpi AND lx2.max_fecha = r2.fecha_resultado
        ) r ON r.id_kpi = k.id_kpi
        GROUP BY k.id_proyecto
    ) agg ON agg.id_proyecto = p.id_proyecto
    WHERE cat.codigo IN ('ALIMENTACION','SALUD','EDUCACION','MEDIO_AMBIENTE','CONSTRUCCION','TECNOLOGIA','ARTE')
    GROUP BY cat.codigo, cat.id_categoria
    ORDER BY cat.id_categoria
");
$stmt->execute([':activo_id' => $activo_id]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$por_categoria   = [];
$ods_impactados  = 0;
$ods_unicos      = [];

foreach ($rows as $row) {
    $codigo = $row['categoria_codigo'];
    if (!isset(ODS_MAP[$codigo])) continue;
    $meta   = (float) $row['total_meta'];
    $actual = (float) $row['total_actual'];
    $pct    = $meta > 0 ? min(100, round($actual / $meta * 100, 1)) : 0;
    $num_p  = (int) $row['num_proyectos'];

    if ($num_p > 0 && !in_array(ODS_MAP[$codigo]['ods'], $ods_unicos, true)) {
        $ods_unicos[] = ODS_MAP[$codigo]['ods'];
        $ods_impactados++;
    }

    $por_categoria[] = [
        'categoria_codigo' => $codigo,
        'ods_numero'       => ODS_MAP[$codigo]['ods'],
        'ods_nombre'       => ODS_MAP[$codigo]['nombre'],
        'color'            => ODS_MAP[$codigo]['color'],
        'etiqueta'         => ODS_MAP[$codigo]['etiqueta'],
        'num_proyectos'    => $num_p,
        'valor_actual'     => (int) $actual,
        'valor_meta'       => (int) $meta,
        'porcentaje'       => $pct,
    ];
}

json_ok([
    'totales' => [
        'beneficiarios'      => (int) $total_personas,
        'horas_voluntariado' => (int) $total_horas,
        'proyectos_activos'  => $proyectos_activos,
        'ods_impactados'     => $ods_impactados,
    ],
    'por_categoria' => $por_categoria,
]);
