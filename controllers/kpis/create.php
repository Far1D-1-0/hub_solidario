<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();
$b  = body();

$id_proyecto = (int)($b['id_proyecto']    ?? 0);
$nombre      = trim($b['nombre']          ?? '');
$descripcion = trim($b['descripcion']     ?? '');
$valor_meta  = isset($b['valor_meta']) ? (float)$b['valor_meta'] : null;
$id_unidad   = isset($b['id_unidad_medida']) && $b['id_unidad_medida'] ? (int)$b['id_unidad_medida'] : null;

if (!$id_proyecto)                              json_err('ID de proyecto inválido');
if (!$nombre)                                   json_err('El nombre del KPI es requerido');
if ($valor_meta === null || $valor_meta <= 0)   json_err('El valor meta debe ser mayor a 0');

$pdo  = db();
$proj = $pdo->prepare('SELECT id_usuario_lider FROM Proyecto WHERE id_proyecto = ?');
$proj->execute([$id_proyecto]);
$row = $proj->fetch();

if (!$row) json_err('Proyecto no encontrado', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$me['id'] !== (int)$row['id_usuario_lider'])
    json_err('Sin autorización', 403);

$activo = $pdo->query("SELECT id_estado_kpi FROM EstadoKPI WHERE codigo = 'ACTIVO'")->fetchColumn();

$pdo->prepare('INSERT INTO KPI (nombre, descripcion, valor_meta, id_proyecto, id_estado_kpi, id_unidad_medida) VALUES (?, ?, ?, ?, ?, ?)')
    ->execute([$nombre, $descripcion ?: null, $valor_meta, $id_proyecto, $activo, $id_unidad]);
$newId = (int)$pdo->lastInsertId();

$row2 = $pdo->prepare('
    SELECT k.id_kpi, k.nombre, k.descripcion, k.valor_meta, k.id_unidad_medida,
           NULL AS valor_actual, NULL AS fecha_ultimo_resultado,
           u.simbolo AS unidad_simbolo, u.nombre AS unidad_nombre
    FROM KPI k
    LEFT JOIN UnidadMedida u ON u.id_unidad_medida = k.id_unidad_medida
    WHERE k.id_kpi = ?
');
$row2->execute([$newId]);
json_ok($row2->fetch());
