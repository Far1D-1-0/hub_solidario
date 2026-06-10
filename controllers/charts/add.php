<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();

$b           = body();
$id_proyecto = (int)($b['id_proyecto'] ?? 0);
$id_kpi      = (int)($b['id_kpi']      ?? 0);

if (!$id_proyecto) json_err('id_proyecto es requerido');
if (!$id_kpi)      json_err('id_kpi es requerido');

$pdo  = db();
$proj = $pdo->prepare('SELECT id_usuario_lider, configuracion FROM Proyecto WHERE id_proyecto = ?');
$proj->execute([$id_proyecto]);
$row  = $proj->fetch();

if (!$row) json_err('Proyecto no encontrado', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$row['id_usuario_lider'] !== (int)$me['id']) {
    json_err('Sin autorización', 403);
}

// Confirm KPI belongs to project and has historical data
$kpiStmt = $pdo->prepare('
    SELECT k.id_kpi
    FROM KPI k
    JOIN EstadoKPI ek ON ek.id_estado_kpi = k.id_estado_kpi
    WHERE k.id_kpi = ? AND k.id_proyecto = ? AND ek.codigo = \'ACTIVO\'
');
$kpiStmt->execute([$id_kpi, $id_proyecto]);
if (!$kpiStmt->fetch()) json_err('KPI no encontrado en este proyecto', 404);

$hasData = $pdo->prepare('SELECT COUNT(*) FROM ResultadoKPI WHERE id_kpi = ?');
$hasData->execute([$id_kpi]);
if ((int)$hasData->fetchColumn() === 0) json_err('Este KPI no tiene datos históricos aún');

$config = json_decode($row['configuracion'] ?? 'null', true) ?? [];
$charts = $config['charts'] ?? [];

foreach ($charts as $c) {
    if ((int)$c['id_kpi'] === $id_kpi) json_err('Esta gráfica ya está en el dashboard');
}

$charts[] = ['id_kpi' => $id_kpi, 'tipo_grafica' => 'histograma'];
$config['charts'] = $charts;

$pdo->prepare('UPDATE Proyecto SET configuracion = ? WHERE id_proyecto = ?')
    ->execute([json_encode($config), $id_proyecto]);

json_ok(['charts' => $charts]);
