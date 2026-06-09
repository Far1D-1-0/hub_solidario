<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();
$b  = body();

$id_kpi = (int)($b['id_kpi'] ?? 0);
$valor  = isset($b['valor']) ? (float)$b['valor'] : null;
$fecha  = trim($b['fecha'] ?? date('Y-m-d'));

if (!$id_kpi)        json_err('ID de KPI inválido');
if ($valor === null) json_err('El valor es requerido');
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) $fecha = date('Y-m-d');

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

$datasetTipo = $pdo->query("SELECT id_tipo_archivo FROM TipoArchivo WHERE codigo = 'DATASET'")->fetchColumn();
$ruta = 'manual/kpi_' . $id_kpi . '_' . time() . '_' . rand(100, 999);

$pdo->prepare('INSERT INTO ArchivoUsuario (ruta_archivo, id_usuario, id_tipo_archivo) VALUES (?, ?, ?)')
    ->execute([$ruta, $me['id'], $datasetTipo]);
$archivoId = (int)$pdo->lastInsertId();

$pdo->prepare('
    INSERT INTO ResultadoKPI (valor, fecha_resultado, id_kpi, id_archivo_usuario, id_usuario_registro)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE valor = VALUES(valor), id_archivo_usuario = VALUES(id_archivo_usuario)
')->execute([$valor, $fecha . ' 00:00:00', $id_kpi, $archivoId, $me['id']]);

json_ok(['id_kpi' => $id_kpi, 'valor' => $valor, 'fecha' => $fecha]);
