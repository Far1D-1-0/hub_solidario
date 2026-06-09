<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();
$b  = body();

$id_proyecto = (int)($b['id_proyecto'] ?? 0);
$contenido   = trim($b['contenido']   ?? '');

if (!$id_proyecto) json_err('ID de proyecto inválido');
if (!$contenido)   json_err('El contenido no puede estar vacío');

$pdo  = db();
$proj = $pdo->prepare('SELECT id_usuario_lider FROM Proyecto WHERE id_proyecto = ?');
$proj->execute([$id_proyecto]);
$row = $proj->fetch();

if (!$row) json_err('Proyecto no encontrado', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$me['id'] !== (int)$row['id_usuario_lider'])
    json_err('Sin autorización', 403);

$estadoId = $pdo->query("SELECT id_estado_publicacion FROM EstadoPublicacion WHERE codigo = 'PUBLICADA'")->fetchColumn();

$pdo->prepare('INSERT INTO Publicacion (contenido, fecha_publicacion, id_usuario, id_proyecto, id_estado_publicacion) VALUES (?, NOW(), ?, ?, ?)')
    ->execute([$contenido, $me['id'], $id_proyecto, $estadoId]);
$newId = (int)$pdo->lastInsertId();

$stmt = $pdo->prepare('
    SELECT pub.id_publicacion AS id, pub.contenido, pub.fecha_publicacion, u.nombre AS autor_nombre
    FROM Publicacion pub
    JOIN Usuario u ON u.id_usuario = pub.id_usuario
    WHERE pub.id_publicacion = ?
');
$stmt->execute([$newId]);
json_ok($stmt->fetch());
