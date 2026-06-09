<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();
$b  = body();

$id_kpi = (int)($b['id_kpi'] ?? 0);
if (!$id_kpi) json_err('ID de KPI inválido');

$pdo  = db();
$stmt = $pdo->prepare('
    SELECT k.id_kpi, p.id_usuario_lider
    FROM KPI k
    JOIN Proyecto p ON p.id_proyecto = k.id_proyecto
    WHERE k.id_kpi = ?
');
$stmt->execute([$id_kpi]);
$row = $stmt->fetch();

if (!$row) json_err('KPI no encontrado', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$me['id'] !== (int)$row['id_usuario_lider'])
    json_err('Sin autorización', 403);

$inactivo = $pdo->query("SELECT id_estado_kpi FROM EstadoKPI WHERE codigo = 'INACTIVO'")->fetchColumn();
$pdo->prepare('UPDATE KPI SET id_estado_kpi = ? WHERE id_kpi = ?')->execute([$inactivo, $id_kpi]);
json_ok(['deleted' => $id_kpi]);
