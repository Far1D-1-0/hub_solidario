<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');

$me = require_auth();
$b  = body();

$id     = (int)($b['id']     ?? 0);
$imagen = trim((string)($b['imagen'] ?? ''));

if (!$id)     json_err('ID de proyecto inválido');
if (!$imagen) json_err('URL de imagen requerida');

$pdo  = db();
$proj = $pdo->prepare('SELECT id_usuario_lider FROM Proyecto WHERE id_proyecto = ?');
$proj->execute([$id]);
$row = $proj->fetch();

if (!$row) json_err('Proyecto no encontrado', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$me['id'] !== (int)$row['id_usuario_lider']) {
    json_err('Sin autorización', 403);
}

$pdo->prepare('UPDATE Proyecto SET imagen = ? WHERE id_proyecto = ?')
    ->execute([$imagen, $id]);

json_ok(['imagen' => $imagen]);
