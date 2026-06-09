<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('GET');
$current = require_auth();

$pdo = db();
$id   = (int) ($current['id'] ?? 0);

// Fallback: look up by email if id is missing from the session
if (!$id && !empty($current['email'])) {
    $s = $pdo->prepare('SELECT id_usuario FROM Usuario WHERE email = ?');
    $s->execute([$current['email']]);
    $row = $s->fetch();
    if ($row) {
        $id = (int) $row['id_usuario'];
        $_SESSION['user']['id'] = $id;
    }
}

if (!$id) json_err('No se pudo identificar al usuario');

$stmt = $pdo->prepare('
    SELECT
        u.id_usuario      AS id,
        u.nombre,
        u.email,
        u.fecha_registro,
        u.foto_perfil,
        u.about,
        u.telefono,
        u.linktree,
        u.instagram,
        u.linkedin,
        r.codigo          AS rol_codigo,
        r.nombre          AS rol_nombre
    FROM Usuario u
    JOIN Rol r ON r.id_rol = u.id_rol
    WHERE u.id_usuario = ?
');
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) json_err('Usuario no encontrado', 404);

$proyectos = $pdo->prepare('
    SELECT p.id_proyecto AS id, p.nombre, p.imagen, p.ubicacion,
           c.nombre AS categoria_nombre, c.color AS categoria_color
    FROM Proyecto p
    LEFT JOIN Categoria c ON c.id_categoria = p.id_categoria
    JOIN EstadoProyecto ep ON ep.id_estado_proyecto = p.id_estado_proyecto
    WHERE p.id_usuario_lider = ? AND ep.codigo = \'ACTIVO\'
    ORDER BY p.fecha_creacion DESC
');
$proyectos->execute([$id]);
$user['proyectos'] = $proyectos->fetchAll();

json_ok($user);
