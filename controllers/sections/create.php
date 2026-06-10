<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_role('ADMIN', 'LIDER');

$b = body();
$id_proyecto      = isset($b['id_proyecto'])      ? (int)$b['id_proyecto']      : 0;
$nombre           = trim($b['nombre']             ?? '');
$id_seccion_padre = isset($b['id_seccion_padre']) ? (int)$b['id_seccion_padre'] : null;

if (!$id_proyecto) json_err('id_proyecto es requerido');
if (!$nombre)      json_err('El nombre de la sección es requerido');

$pdo = db();

$proj = $pdo->prepare('SELECT id_usuario_lider FROM Proyecto WHERE id_proyecto = ?');
$proj->execute([$id_proyecto]);
$proyecto = $proj->fetch(PDO::FETCH_ASSOC);
if (!$proyecto)                                                                           json_err('Proyecto no encontrado', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$proyecto['id_usuario_lider'] !== (int)$me['id']) json_err('Sin autorización', 403);

if ($id_seccion_padre !== null) {
    $padreStmt = $pdo->prepare('SELECT 1 FROM Seccion WHERE id_seccion = ? AND id_proyecto = ?');
    $padreStmt->execute([$id_seccion_padre, $id_proyecto]);
    if (!$padreStmt->fetchColumn()) json_err('Sección padre no encontrada', 404);
}

function slugify(string $text): string {
    static $map = [
        'á'=>'a','à'=>'a','ä'=>'a','â'=>'a','ã'=>'a',
        'é'=>'e','è'=>'e','ë'=>'e','ê'=>'e',
        'í'=>'i','ì'=>'i','ï'=>'i','î'=>'i',
        'ó'=>'o','ò'=>'o','ö'=>'o','ô'=>'o','õ'=>'o',
        'ú'=>'u','ù'=>'u','ü'=>'u','û'=>'u','ñ'=>'n',
    ];
    $text = mb_strtolower(strtr($text, $map), 'UTF-8');
    $text = preg_replace('/[^a-z0-9\s-]/u', '', $text);
    $text = preg_replace('/[\s-]+/', '-', trim($text));
    return $text ?: 'seccion';
}

$base = slugify($nombre);
$slug = $base;
$n    = 1;
while (true) {
    $chk = $pdo->prepare('SELECT 1 FROM Seccion WHERE id_proyecto = ? AND id_seccion_padre <=> ? AND slug = ?');
    $chk->execute([$id_proyecto, $id_seccion_padre, $slug]);
    if (!$chk->fetchColumn()) break;
    $slug = $base . '-' . (++$n);
}

$maxQ = $pdo->prepare('SELECT COALESCE(MAX(orden), -1) + 1 FROM Seccion WHERE id_proyecto = ? AND id_seccion_padre <=> ?');
$maxQ->execute([$id_proyecto, $id_seccion_padre]);
$orden = (int)$maxQ->fetchColumn();

$ins = $pdo->prepare('
    INSERT INTO Seccion (nombre, slug, orden, id_proyecto, id_seccion_padre, id_usuario_creador)
    VALUES (?, ?, ?, ?, ?, ?)
');
$ins->execute([$nombre, $slug, $orden, $id_proyecto, $id_seccion_padre, $me['id']]);

json_ok([
    'id_seccion'       => (int)$pdo->lastInsertId(),
    'nombre'           => $nombre,
    'slug'             => $slug,
    'orden'            => $orden,
    'id_seccion_padre' => $id_seccion_padre,
], 201);
