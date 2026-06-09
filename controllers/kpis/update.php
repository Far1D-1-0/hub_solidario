<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();
$b  = body();

$id_kpi      = (int)($b['id_kpi']         ?? 0);
$nombre      = trim($b['nombre']          ?? '');
$descripcion = trim($b['descripcion']     ?? '');
$valor_meta  = isset($b['valor_meta']) ? (float)$b['valor_meta'] : null;
$id_unidad   = isset($b['id_unidad_medida']) && $b['id_unidad_medida'] ? (int)$b['id_unidad_medida'] : null;

if (!$id_kpi)                                   json_err('ID de KPI inválido');
if (!$nombre)                                   json_err('El nombre del KPI es requerido');
if ($valor_meta === null || $valor_meta <= 0)   json_err('El valor meta debe ser mayor a 0');

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

$pdo->prepare('UPDATE KPI SET nombre = ?, descripcion = ?, valor_meta = ?, id_unidad_medida = ? WHERE id_kpi = ?')
    ->execute([$nombre, $descripcion ?: null, $valor_meta, $id_unidad, $id_kpi]);
json_ok(['id_kpi' => $id_kpi, 'nombre' => $nombre, 'valor_meta' => $valor_meta]);
