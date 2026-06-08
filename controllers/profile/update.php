<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');

$me = require_auth();

$b = body();

// Solo se pueden actualizar estos campos
$allowed = ['nombre','about','telefono','linktree','instagram','linkedin'];
$sets    = [];
$params  = [];

foreach ($allowed as $field) {
    if (array_key_exists($field, $b)) {
        $sets[]   = "`{$field}` = ?";
        $params[] = $b[$field] === '' ? null : trim((string) $b[$field]);
    }
}

if (empty($sets)) json_err('No hay campos para actualizar');

$params[] = $me['id'];

$pdo = db();
$pdo->prepare('UPDATE Usuario SET ' . implode(', ', $sets) . ' WHERE id_usuario = ?')
    ->execute($params);

// Refrescar sesión con el nombre actualizado si cambió
if (isset($b['nombre'])) {
    $_SESSION['user']['nombre'] = trim((string) $b['nombre']);
}

// Devolver perfil actualizado
$updated = $pdo->prepare('
    SELECT id_usuario AS id, nombre, foto_perfil, about, telefono, linktree, instagram, linkedin
    FROM Usuario WHERE id_usuario = ?
');
$updated->execute([$me['id']]);

json_ok($updated->fetch());
