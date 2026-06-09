<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$current = require_auth();

$b           = body();
$old_pass    = trim($b['contrasena_actual'] ?? '');
$new_pass    = trim($b['contrasena_nueva']  ?? '');

if (!$old_pass || !$new_pass) json_err('Todos los campos son requeridos');
if (strlen($new_pass) < 6)    json_err('La nueva contraseña debe tener al menos 6 caracteres');

$pdo = db();
$id  = (int) ($current['id'] ?? 0);

if (!$id && !empty($current['email'])) {
    $s = $pdo->prepare('SELECT id_usuario FROM Usuario WHERE email = ?');
    $s->execute([$current['email']]);
    $row = $s->fetch();
    if ($row) $id = (int) $row['id_usuario'];
}
if (!$id) json_err('No se pudo identificar al usuario');

$stmt = $pdo->prepare('SELECT contrasena FROM Usuario WHERE id_usuario = ?');
$stmt->execute([$id]);
$row = $stmt->fetch();

if (!$row || !password_verify($old_pass, $row['contrasena'])) {
    json_err('La contraseña actual es incorrecta');
}

$hash = password_hash($new_pass, PASSWORD_DEFAULT);
$pdo->prepare('UPDATE Usuario SET contrasena = ? WHERE id_usuario = ?')
    ->execute([$hash, $id]);

json_ok(['message' => 'Contraseña actualizada']);
