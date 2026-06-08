<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id) json_err('ID de usuario inválido');

$pdo = db();

$stmt = $pdo->prepare('
    SELECT
        u.id_usuario  AS id,
        u.nombre,
        u.foto_perfil,
        u.about,
        u.telefono,
        u.linktree,
        u.instagram,
        u.linkedin,
        r.codigo      AS rol_codigo,
        r.nombre      AS rol_nombre
    FROM Usuario u
    JOIN Rol r ON r.id_rol = u.id_rol
    WHERE u.id_usuario = ?
');
$stmt->execute([$id]);
$user = $stmt->fetch();

if (!$user) json_err('Usuario no encontrado', 404);

// Proyectos activos del usuario (como líder)
$proyectos = $pdo->prepare('
    SELECT p.id_proyecto AS id, p.nombre, p.imagen, p.ubicacion, c.nombre AS categoria_nombre, c.color AS categoria_color
    FROM Proyecto p
    LEFT JOIN Categoria c ON c.id_categoria = p.id_categoria
    JOIN EstadoProyecto ep ON ep.id_estado_proyecto = p.id_estado_proyecto
    WHERE p.id_usuario_lider = ? AND ep.codigo = \'ACTIVO\'
    ORDER BY p.fecha_creacion DESC
');
$proyectos->execute([$id]);
$user['proyectos'] = $proyectos->fetchAll();

json_ok($user);
