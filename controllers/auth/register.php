<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
boot_session();

$b = body();
$nombre    = trim($b['nombre']    ?? '');
$email     = trim($b['email']     ?? '');
$contrasena= trim($b['contrasena']?? '');
$rol_codigo= strtoupper(trim($b['rol_codigo'] ?? ''));

if (!$nombre)                              json_err('El nombre es requerido');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) json_err('Correo electrónico inválido');
if (strlen($contrasena) < 6)              json_err('La contraseña debe tener al menos 6 caracteres');
if (!in_array($rol_codigo, ['ADMIN','LIDER','USUARIO'], true)) json_err('Rol inválido');

$pdo = db();

// Verificar email único
$stmt = $pdo->prepare('SELECT id_usuario FROM Usuario WHERE email = ?');
$stmt->execute([$email]);
if ($stmt->fetch()) json_err('Este correo ya está registrado', 409);

// IDs de catálogo
$rol = $pdo->prepare('SELECT id_rol FROM Rol WHERE codigo = ?');
$rol->execute([$rol_codigo]);
$id_rol = $rol->fetchColumn();
if (!$id_rol) json_err('Rol no encontrado', 404);

// Validación: usuarios normales se aprueban automáticamente; líderes y admins quedan PENDIENTE
$val_codigo = ($rol_codigo === 'USUARIO') ? 'VALIDADO' : 'PENDIENTE';
$ev = $pdo->prepare('SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo = ?');
$ev->execute([$val_codigo]);
$id_val = $ev->fetchColumn();

$ec = $pdo->prepare('SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo = ?');
$ec->execute(['ACTIVA']);
$id_cuenta = $ec->fetchColumn();

$hash = password_hash($contrasena, PASSWORD_BCRYPT);

$ins = $pdo->prepare('
    INSERT INTO Usuario (nombre, email, contrasena, id_rol, id_estado_validacion_usuario, id_estado_cuenta_usuario)
    VALUES (?, ?, ?, ?, ?, ?)
');
$ins->execute([$nombre, $email, $hash, $id_rol, $id_val, $id_cuenta]);
$id_usuario = (int) $pdo->lastInsertId();

$user = [
    'id'                => $id_usuario,
    'nombre'            => $nombre,
    'email'             => $email,
    'rol_codigo'        => $rol_codigo,
    'rol_nombre'        => $b['rol_nombre'] ?? $rol_codigo,
    'estado_validacion' => $val_codigo,
    'loggedIn'          => false,
];

// Solo iniciar sesión si la cuenta queda validada
if ($val_codigo === 'VALIDADO') {
    $user['loggedIn'] = true;
    $_SESSION['user'] = $user;
}

json_ok($user, 201);
