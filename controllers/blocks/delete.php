<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$user = require_role('LIDER', 'ADMIN');

$b         = body();
$id_bloque = isset($b['id_bloque']) ? (int)$b['id_bloque'] : 0;
if (!$id_bloque) json_err('ID de bloque inválido');

$pdo = db();

$stmtCheck = $pdo->prepare('
    SELECT bc.id_pagina, pr.id_usuario_lider AS id_lider
    FROM BloqueContenido bc
    JOIN Pagina p    ON p.id_pagina    = bc.id_pagina
    JOIN Seccion s   ON s.id_seccion   = p.id_seccion
    JOIN Proyecto pr ON pr.id_proyecto = s.id_proyecto
    WHERE bc.id_bloque = ?
');
$stmtCheck->execute([$id_bloque]);
$row = $stmtCheck->fetch();
if (!$row) json_err('Bloque no encontrado', 404);
if ($user['rol_codigo'] !== 'ADMIN' && (int)$row['id_lider'] !== $user['id']) {
    json_err('No tienes permiso para eliminar este bloque', 403);
}

$pdo->prepare('DELETE FROM BloqueContenido WHERE id_bloque = ?')->execute([$id_bloque]);

// Compact orders to remove gaps: renumber remaining blocks in this page
$stmtList = $pdo->prepare('
    SELECT id_bloque FROM BloqueContenido WHERE id_pagina = ? ORDER BY orden ASC
');
$stmtList->execute([$row['id_pagina']]);
$remaining = $stmtList->fetchAll(PDO::FETCH_COLUMN);

$stmtUpd = $pdo->prepare('UPDATE BloqueContenido SET orden = ? WHERE id_bloque = ?');
foreach ($remaining as $i => $bid) {
    $stmtUpd->execute([$i, $bid]);
}

json_ok(['id_bloque' => $id_bloque]);
