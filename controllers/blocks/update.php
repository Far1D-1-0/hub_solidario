<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$user = require_role('LIDER', 'ADMIN');

$b             = body();
$id_bloque     = isset($b['id_bloque'])   ? (int)$b['id_bloque'] : 0;
$contenido     = array_key_exists('contenido_texto', $b) ? $b['contenido_texto'] : null;
$configuracion = array_key_exists('configuracion',  $b) ? $b['configuracion']  : null;

if (!$id_bloque) json_err('ID de bloque inválido');

$pdo = db();

// Verify project leadership via chain: bloque→pagina→seccion→proyecto
$stmtCheck = $pdo->prepare('
    SELECT pr.id_usuario_lider AS id_lider
    FROM BloqueContenido bc
    JOIN Pagina p    ON p.id_pagina     = bc.id_pagina
    JOIN Seccion s   ON s.id_seccion    = p.id_seccion
    JOIN Proyecto pr ON pr.id_proyecto  = s.id_proyecto
    WHERE bc.id_bloque = ?
');
$stmtCheck->execute([$id_bloque]);
$row = $stmtCheck->fetch();
if (!$row) json_err('Bloque no encontrado', 404);
if ($user['rol_codigo'] !== 'ADMIN' && (int)$row['id_lider'] !== $user['id']) {
    json_err('No tienes permiso para editar este bloque', 403);
}

$sets  = [];
$vals  = [];

if (array_key_exists('contenido_texto', $b)) {
    $sets[] = 'contenido_texto = ?';
    $vals[] = is_string($contenido) ? $contenido : null;
}
if (array_key_exists('configuracion', $b)) {
    $sets[] = 'configuracion = ?';
    $vals[] = $configuracion !== null ? json_encode($configuracion, JSON_UNESCAPED_UNICODE) : null;
}

if (!$sets) json_err('Sin campos a actualizar');

$vals[] = $id_bloque;
$pdo->prepare('UPDATE BloqueContenido SET ' . implode(', ', $sets) . ' WHERE id_bloque = ?')
    ->execute($vals);

json_ok(['id_bloque' => $id_bloque]);
