<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();
$b  = body();

$id        = (int)($b['id']       ?? 0);
$contenido = trim($b['contenido'] ?? '');

if (!$id)        json_err('ID de publicación inválido');
if (!$contenido) json_err('El contenido no puede estar vacío');

$pdo  = db();
$stmt = $pdo->prepare('
    SELECT pub.id_publicacion, p.id_usuario_lider
    FROM Publicacion pub
    JOIN Proyecto p ON p.id_proyecto = pub.id_proyecto
    WHERE pub.id_publicacion = ?
');
$stmt->execute([$id]);
$row = $stmt->fetch();

if (!$row) json_err('Publicación no encontrada', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$me['id'] !== (int)$row['id_usuario_lider'])
    json_err('Sin autorización', 403);

$pdo->prepare('UPDATE Publicacion SET contenido = ? WHERE id_publicacion = ?')
    ->execute([$contenido, $id]);
json_ok(['id' => $id, 'contenido' => $contenido]);
