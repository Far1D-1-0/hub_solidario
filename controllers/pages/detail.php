<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('GET');

$id_pagina = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id_pagina) json_err('ID de página inválido');

$user = session_user();
$isLeader = false;

$pdo = db();

// Fetch the page with its project/section context
$stmt = $pdo->prepare('
    SELECT
        p.id_pagina,
        p.titulo,
        p.slug,
        p.orden,
        p.fecha_creacion,
        tp.codigo  AS tipo_codigo,
        tp.nombre  AS tipo_nombre,
        ep.codigo  AS estado_codigo,
        ep.nombre  AS estado_nombre,
        s.id_seccion,
        s.nombre   AS nombre_seccion,
        pr.id_proyecto,
        pr.nombre  AS nombre_proyecto,
        pr.imagen  AS imagen_proyecto,
        pr.id_usuario_lider AS id_lider
    FROM Pagina p
    JOIN Seccion s    ON s.id_seccion     = p.id_seccion
    JOIN Proyecto pr  ON pr.id_proyecto   = s.id_proyecto
    JOIN TipoPagina tp ON tp.id_tipo_pagina = p.id_tipo_pagina
    JOIN EstadoPagina ep ON ep.id_estado_pagina = p.id_estado_pagina
    WHERE p.id_pagina = ?
');
$stmt->execute([$id_pagina]);
$page = $stmt->fetch();

if (!$page) json_err('Página no encontrada', 404);

// Determine access
if ($user) {
    $isLeader = ($user['rol_codigo'] === 'ADMIN' || $user['id'] === (int)$page['id_lider']);
}

// Non-leaders can only see published pages
if (!$isLeader && $page['estado_codigo'] !== 'PUBLICADA') {
    json_err('Esta página no está disponible', 403);
}

// Fetch blocks ordered by orden
$stmtB = $pdo->prepare('
    SELECT
        b.id_bloque,
        b.orden,
        b.configuracion,
        b.contenido_texto,
        b.fecha_creacion,
        pl.renderer_key,
        pl.nombre AS plantilla_nombre,
        pl.id_plantilla_bloque
    FROM BloqueContenido b
    JOIN PlantillaBloque pl ON pl.id_plantilla_bloque = b.id_plantilla_bloque
    WHERE b.id_pagina = ?
    ORDER BY b.orden ASC
');
$stmtB->execute([$id_pagina]);
$bloques = $stmtB->fetchAll();

// Parse configuracion JSON for each block
foreach ($bloques as &$b) {
    $b['configuracion'] = $b['configuracion'] ? json_decode($b['configuracion'], true) : null;
}
unset($b);

$page['bloques']   = $bloques;
$page['is_leader'] = $isLeader;

json_ok($page);
