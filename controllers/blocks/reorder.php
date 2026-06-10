<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$user = require_role('LIDER', 'ADMIN');

$b         = body();
$id_pagina = isset($b['id_pagina']) ? (int)$b['id_pagina'] : 0;
$order     = $b['order'] ?? [];   // array of id_bloque integers in desired order

if (!$id_pagina)       json_err('ID de página inválido');
if (!is_array($order)) json_err('order debe ser un array');

$pdo = db();

// Verify leadership
$stmtCheck = $pdo->prepare('
    SELECT pr.id_usuario_lider AS id_lider
    FROM Pagina p
    JOIN Seccion s   ON s.id_seccion   = p.id_seccion
    JOIN Proyecto pr ON pr.id_proyecto = s.id_proyecto
    WHERE p.id_pagina = ?
');
$stmtCheck->execute([$id_pagina]);
$row = $stmtCheck->fetch();
if (!$row) json_err('Página no encontrada', 404);
if ($user['rol_codigo'] !== 'ADMIN' && (int)$row['id_lider'] !== $user['id']) {
    json_err('Sin permiso', 403);
}

// Use a two-pass approach to avoid unique key conflicts on (id_pagina, orden)
// First set all affected rows to large temporary values, then assign real values
$pdo->beginTransaction();
try {
    // Pass 1: set to negative offsets (safe because CHECK constraint is >= 0, but we use large positives)
    // We use id_bloque + 10000 as temporary orden to avoid conflicts
    $stmtTmp = $pdo->prepare('
        UPDATE BloqueContenido SET orden = id_bloque + 100000 WHERE id_pagina = ?
    ');
    $stmtTmp->execute([$id_pagina]);

    // Pass 2: assign correct orden values
    $stmtUpd = $pdo->prepare('
        UPDATE BloqueContenido SET orden = ? WHERE id_bloque = ? AND id_pagina = ?
    ');
    foreach ($order as $i => $idBloque) {
        $stmtUpd->execute([$i, (int)$idBloque, $id_pagina]);
    }

    $pdo->commit();
} catch (Throwable $e) {
    $pdo->rollBack();
    json_err('Error al reordenar: ' . $e->getMessage());
}

json_ok(['id_pagina' => $id_pagina, 'count' => count($order)]);
