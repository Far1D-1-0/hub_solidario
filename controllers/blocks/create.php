<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$user = require_role('LIDER', 'ADMIN');

$b             = body();
$id_pagina     = isset($b['id_pagina'])     ? (int)$b['id_pagina']     : 0;
$renderer_key  = trim($b['renderer_key']    ?? '');
$contenido     = $b['contenido_texto']      ?? null;
$configuracion = $b['configuracion']        ?? null;

if (!$id_pagina)    json_err('ID de página inválido');
if (!$renderer_key) json_err('renderer_key requerido');

$pdo = db();

// Verify project leadership
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
    json_err('No tienes permiso para editar esta página', 403);
}

// Resolve renderer_key to id_plantilla_bloque (latest version)
$stmtPl = $pdo->prepare('
    SELECT id_plantilla_bloque
    FROM PlantillaBloque
    WHERE renderer_key = ?
    ORDER BY version DESC
    LIMIT 1
');
$stmtPl->execute([$renderer_key]);
$plantilla = $stmtPl->fetch();
if (!$plantilla) json_err("Plantilla '{$renderer_key}' no encontrada");

// Calculate next orden (append at end)
$stmtOrd = $pdo->prepare('
    SELECT COALESCE(MAX(orden), -1) + 1 AS next_orden
    FROM BloqueContenido
    WHERE id_pagina = ?
');
$stmtOrd->execute([$id_pagina]);
$nextOrden = (int)$stmtOrd->fetchColumn();

$configJson = $configuracion !== null ? json_encode($configuracion, JSON_UNESCAPED_UNICODE) : null;

$stmtIns = $pdo->prepare('
    INSERT INTO BloqueContenido (orden, configuracion, contenido_texto, id_pagina, id_plantilla_bloque)
    VALUES (?, ?, ?, ?, ?)
');
$stmtIns->execute([
    $nextOrden,
    $configJson,
    is_string($contenido) ? $contenido : null,
    $id_pagina,
    $plantilla['id_plantilla_bloque'],
]);
$idBloque = (int)$pdo->lastInsertId();

json_ok([
    'id_bloque'         => $idBloque,
    'orden'             => $nextOrden,
    'renderer_key'      => $renderer_key,
    'configuracion'     => $configuracion,
    'contenido_texto'   => $contenido,
    'id_plantilla_bloque' => $plantilla['id_plantilla_bloque'],
]);
