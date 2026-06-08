<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');

$me = require_role('ADMIN', 'LIDER');

$b = body();
$nombre      = trim($b['nombre']      ?? '');
$descripcion = trim($b['descripcion'] ?? '');
$ubicacion   = trim($b['ubicacion']   ?? '');
$about       = trim($b['about']       ?? '');
$comunidad   = trim($b['comunidad']   ?? '');
$objetivos   = $b['objetivos']  ?? [];
$operacion   = $b['operacion']  ?? [];
$id_categoria= isset($b['id_categoria']) ? (int) $b['id_categoria'] : null;

if (!$nombre) json_err('El nombre del proyecto es requerido');

$pdo = db();

$ep = $pdo->query("SELECT id_estado_proyecto FROM EstadoProyecto WHERE codigo = 'ACTIVO'")->fetchColumn();
if (!$ep) json_err('Estado de proyecto no encontrado', 500);

// El líder del proyecto es quien lo crea (a menos que sea admin y especifique otro)
$id_lider = $me['id'];
if ($me['rol_codigo'] === 'ADMIN' && isset($b['id_usuario_lider'])) {
    $id_lider = (int) $b['id_usuario_lider'];
}

$ins = $pdo->prepare('
    INSERT INTO Proyecto
        (nombre, descripcion, ubicacion, about, objetivos, comunidad, operacion,
         id_estado_proyecto, id_categoria, id_usuario_lider)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
');
$ins->execute([
    $nombre,
    $descripcion ?: null,
    $ubicacion   ?: null,
    $about       ?: null,
    $objetivos   ? json_encode($objetivos, JSON_UNESCAPED_UNICODE) : null,
    $comunidad   ?: null,
    $operacion   ? json_encode($operacion, JSON_UNESCAPED_UNICODE) : null,
    $ep,
    $id_categoria ?: null,
    $id_lider,
]);
$id_proyecto = (int) $pdo->lastInsertId();

// Vincular al líder en ProyectoUsuario
$pdo->prepare('INSERT INTO ProyectoUsuario (id_proyecto, id_usuario) VALUES (?, ?)')
    ->execute([$id_proyecto, $id_lider]);

json_ok(['id' => $id_proyecto], 201);
