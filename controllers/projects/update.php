<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();
$b  = body();

$id = (int)($b['id'] ?? 0);
if (!$id) json_err('ID de proyecto inválido');

$pdo  = db();
$proj = $pdo->prepare('SELECT id_usuario_lider FROM Proyecto WHERE id_proyecto = ?');
$proj->execute([$id]);
$row = $proj->fetch();

if (!$row) json_err('Proyecto no encontrado', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$me['id'] !== (int)$row['id_usuario_lider'])
    json_err('Sin autorización', 403);

$nombre       = trim($b['nombre']      ?? '');
$descripcion  = trim($b['descripcion'] ?? '');
$ubicacion    = trim($b['ubicacion']   ?? '');
$about        = trim($b['about']       ?? '');
$comunidad    = trim($b['comunidad']   ?? '');
$completacion = isset($b['porcentaje_completacion'])
    ? min(100.0, max(0.0, (float)$b['porcentaje_completacion'])) : 0.0;
$id_categoria = isset($b['id_categoria']) && $b['id_categoria'] ? (int)$b['id_categoria'] : null;

$objetivos = $b['objetivos'] ?? [];
if (!is_array($objetivos)) $objetivos = [];
$objetivos = array_values(array_filter(array_map('trim', $objetivos)));

$operacion = $b['operacion'] ?? [];
if (!is_array($operacion)) $operacion = (object)[];

if (!$nombre) json_err('El nombre del proyecto es requerido');

$pdo->prepare('
    UPDATE Proyecto
    SET nombre = ?, descripcion = ?, ubicacion = ?, about = ?,
        objetivos = ?, comunidad = ?, operacion = ?,
        porcentaje_completacion = ?, id_categoria = ?
    WHERE id_proyecto = ?
')->execute([
    $nombre,
    $descripcion  ?: null,
    $ubicacion    ?: null,
    $about        ?: null,
    json_encode($objetivos, JSON_UNESCAPED_UNICODE),
    $comunidad    ?: null,
    json_encode($operacion, JSON_UNESCAPED_UNICODE | JSON_FORCE_OBJECT),
    $completacion,
    $id_categoria,
    $id,
]);

json_ok(['id' => $id, 'nombre' => $nombre]);
