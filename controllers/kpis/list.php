<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$id_proyecto = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id_proyecto) json_err('ID de proyecto inválido');

$pdo  = db();
$stmt = $pdo->prepare('
    SELECT
        k.id_kpi,
        k.nombre,
        k.descripcion,
        k.valor_meta,
        ek.codigo  AS estado,
        u.id_unidad_medida,
        u.nombre   AS unidad_nombre,
        u.simbolo  AS unidad_simbolo,
        (SELECT r.valor
         FROM ResultadoKPI r
         WHERE r.id_kpi = k.id_kpi
         ORDER BY r.fecha_resultado DESC
         LIMIT 1) AS valor_actual,
        (SELECT r.fecha_resultado
         FROM ResultadoKPI r
         WHERE r.id_kpi = k.id_kpi
         ORDER BY r.fecha_resultado DESC
         LIMIT 1) AS fecha_ultimo_resultado,
        (SELECT au.tipo_grafica
         FROM ResultadoKPI r2
         JOIN ArchivoUsuario au ON au.id_archivo_usuario = r2.id_archivo_usuario
         WHERE r2.id_kpi = k.id_kpi AND au.tipo_grafica IS NOT NULL
         ORDER BY r2.fecha_resultado DESC
         LIMIT 1) AS tipo_grafica,
        EXISTS(SELECT 1 FROM ResultadoKPI r3 WHERE r3.id_kpi = k.id_kpi) AS tiene_datos
    FROM KPI k
    LEFT JOIN UnidadMedida u  ON u.id_unidad_medida = k.id_unidad_medida
    JOIN  EstadoKPI ek         ON ek.id_estado_kpi   = k.id_estado_kpi
    WHERE k.id_proyecto = ?
      AND ek.codigo     = \'ACTIVO\'
    ORDER BY k.id_kpi
');
$stmt->execute([$id_proyecto]);
json_ok($stmt->fetchAll());
