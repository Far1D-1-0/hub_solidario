<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();

if ($me['rol_codigo'] !== 'ADMIN' && $me['rol_codigo'] !== 'LIDER')
    json_err('Sin autorización', 403);

$b = body();

$nombre  = trim($b['nombre']           ?? '');
$desc    = trim($b['descripcion']      ?? '') ?: null;
$fecha   = trim($b['fecha_realizacion'] ?? '');
$idProy  = isset($b['id_proyecto']) ? (int)$b['id_proyecto'] : 0;

if (!$nombre) json_err('El nombre del evento es requerido');
if (!$fecha)  json_err('La fecha del evento es requerida');
if (!$idProy) json_err('El proyecto es requerido');

$pdo = db();

if ($me['rol_codigo'] === 'LIDER') {
    $check = $pdo->prepare('SELECT id_proyecto FROM Proyecto WHERE id_proyecto = ? AND id_usuario_lider = ?');
    $check->execute([$idProy, $me['id']]);
    if (!$check->fetch()) json_err('Sin autorización para este proyecto', 403);
}

$estadoId = $pdo->query("SELECT id_estado_evento FROM EstadoEvento WHERE codigo = 'PROGRAMADO' LIMIT 1")->fetchColumn();

$stmt = $pdo->prepare('
    INSERT INTO Evento (nombre, descripcion, fecha_realizacion, fecha_publicacion, id_usuario_creador, id_proyecto, id_estado_evento)
    VALUES (?, ?, ?, NOW(), ?, ?, ?)
');
$stmt->execute([$nombre, $desc, $fecha, $me['id'], $idProy, $estadoId]);
$newId = (int)$pdo->lastInsertId();

$ev = $pdo->prepare('
    SELECT e.id_evento, e.nombre, e.descripcion, e.fecha_realizacion,
           p.id_proyecto, p.nombre AS proyecto_nombre, ee.codigo AS estado
    FROM Evento e
    JOIN Proyecto p      ON p.id_proyecto      = e.id_proyecto
    JOIN EstadoEvento ee ON ee.id_estado_evento = e.id_estado_evento
    WHERE e.id_evento = ?
');
$ev->execute([$newId]);

json_ok($ev->fetch());
