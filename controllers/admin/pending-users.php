<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('GET');
require_role('ADMIN');

$estado = strtoupper(trim($_GET['estado'] ?? ''));
$allowed = ['PENDIENTE', 'VALIDADO', 'RECHAZADO'];

$pdo = db();

if ($estado && in_array($estado, $allowed, true)) {
    $rows = $pdo->prepare('
        SELECT u.id_usuario AS id, u.nombre, u.email, u.fecha_registro,
               r.codigo  AS rol_codigo, r.nombre AS rol_nombre,
               ev.codigo AS estado_validacion,
               ec.codigo AS estado_cuenta
        FROM Usuario u
        JOIN Rol r                       ON r.id_rol = u.id_rol
        JOIN EstadoValidacionUsuario ev  ON ev.id_estado_validacion_usuario = u.id_estado_validacion_usuario
        JOIN EstadoCuentaUsuario ec      ON ec.id_estado_cuenta_usuario     = u.id_estado_cuenta_usuario
        WHERE ev.codigo = ?
        ORDER BY u.fecha_registro DESC
    ');
    $rows->execute([$estado]);
} else {
    $rows = $pdo->query('
        SELECT u.id_usuario AS id, u.nombre, u.email, u.fecha_registro,
               r.codigo  AS rol_codigo, r.nombre AS rol_nombre,
               ev.codigo AS estado_validacion,
               ec.codigo AS estado_cuenta
        FROM Usuario u
        JOIN Rol r                       ON r.id_rol = u.id_rol
        JOIN EstadoValidacionUsuario ev  ON ev.id_estado_validacion_usuario = u.id_estado_validacion_usuario
        JOIN EstadoCuentaUsuario ec      ON ec.id_estado_cuenta_usuario     = u.id_estado_cuenta_usuario
        ORDER BY u.fecha_registro DESC
    ');
}

json_ok($rows->fetchAll());
