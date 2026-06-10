<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('GET');

$id_proyecto = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id_proyecto) json_err('ID de proyecto inválido');

$pdo = db();

$secStmt = $pdo->prepare('
    SELECT id_seccion, nombre, slug, orden, id_seccion_padre, fecha_creacion
    FROM Seccion
    WHERE id_proyecto = ?
    ORDER BY COALESCE(id_seccion_padre, 0), orden
');
$secStmt->execute([$id_proyecto]);
$secciones = $secStmt->fetchAll(PDO::FETCH_ASSOC);

if (!$secciones) {
    json_ok([]);
}

$ids = array_column($secciones, 'id_seccion');
$placeholders = implode(',', array_fill(0, count($ids), '?'));

$pageStmt = $pdo->prepare("
    SELECT p.id_pagina, p.titulo, p.slug, p.orden, p.id_seccion,
           tp.codigo AS tipo_codigo, tp.nombre AS tipo_nombre,
           ep.codigo AS estado_codigo, ep.nombre AS estado_nombre
    FROM Pagina p
    JOIN TipoPagina tp  ON tp.id_tipo_pagina  = p.id_tipo_pagina
    JOIN EstadoPagina ep ON ep.id_estado_pagina = p.id_estado_pagina
    WHERE p.id_seccion IN ($placeholders)
    ORDER BY p.id_seccion, p.orden
");
$pageStmt->execute($ids);
$paginas = $pageStmt->fetchAll(PDO::FETCH_ASSOC);

$pagesBySection = [];
foreach ($paginas as $p) {
    $pagesBySection[(int)$p['id_seccion']][] = $p;
}

$byId = [];
foreach ($secciones as &$s) {
    $s['id_seccion']       = (int)$s['id_seccion'];
    $s['orden']            = (int)$s['orden'];
    $s['id_seccion_padre'] = $s['id_seccion_padre'] !== null ? (int)$s['id_seccion_padre'] : null;
    $s['pages']            = $pagesBySection[$s['id_seccion']] ?? [];
    $s['children']         = [];
    $byId[$s['id_seccion']] = &$s;
}
unset($s);

$roots = [];
foreach ($secciones as &$s) {
    if ($s['id_seccion_padre'] === null) {
        $roots[] = &$s;
    } elseif (isset($byId[$s['id_seccion_padre']])) {
        $byId[$s['id_seccion_padre']]['children'][] = &$s;
    }
}
unset($s);

json_ok($roots);
