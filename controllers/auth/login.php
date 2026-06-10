<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
boot_session();

$b = body();
$email      = trim($b['email']      ?? '');
$contrasena = trim($b['contrasena'] ?? '');

if (!$email || !$contrasena) json_err('Correo y contraseña son requeridos');

$pdo = db();

$stmt = $pdo->prepare('
    SELECT
        u.id_usuario,
        u.nombre,
        u.email,
        u.contrasena,
        u.foto_perfil,
        r.codigo  AS rol_codigo,
        r.nombre  AS rol_nombre,
        ev.codigo AS estado_validacion,
        ec.codigo AS estado_cuenta
    FROM Usuario u
    JOIN Rol r                        ON r.id_rol = u.id_rol
    JOIN EstadoValidacionUsuario ev   ON ev.id_estado_validacion_usuario = u.id_estado_validacion_usuario
    JOIN EstadoCuentaUsuario ec       ON ec.id_estado_cuenta_usuario     = u.id_estado_cuenta_usuario
    WHERE u.email = ?
');
$stmt->execute([$email]);
$row = $stmt->fetch();

if (!$row || !password_verify($contrasena, $row['contrasena'])) {
    json_err('Correo o contraseña incorrectos', 401);
}
if ($row['estado_cuenta'] !== 'ACTIVA') {
    json_err('Esta cuenta ha sido desactivada', 403);
}
if ($row['estado_validacion'] === 'PENDIENTE') {
    json_err('Tu cuenta está pendiente de validación por un administrador. Recibirás acceso una vez que sea aprobada.', 403);
}
if ($row['estado_validacion'] === 'RECHAZADO') {
    json_err('Tu solicitud de cuenta fue rechazada. Contacta al administrador para más información.', 403);
}

$user = [
    'id'                => (int) $row['id_usuario'],
    'nombre'            => $row['nombre'],
    'email'             => $row['email'],
    'foto_perfil'       => $row['foto_perfil'],
    'rol_codigo'        => $row['rol_codigo'],
    'rol_nombre'        => $row['rol_nombre'],
    'estado_validacion' => $row['estado_validacion'],
    'loggedIn'          => true,
];

$_SESSION['user'] = $user;

json_ok($user);
