<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('GET');

$user = session_user();

if (!$user) {
    json_ok(['loggedIn' => false]);
}

// Re-validate against the DB so stale or pending sessions cannot be used
$pdo  = db();
$stmt = $pdo->prepare('
    SELECT ev.codigo AS estado_validacion, ec.codigo AS estado_cuenta,
           r.codigo  AS rol_codigo,        r.nombre  AS rol_nombre
    FROM   Usuario u
    JOIN   EstadoValidacionUsuario ev ON ev.id_estado_validacion_usuario = u.id_estado_validacion_usuario
    JOIN   EstadoCuentaUsuario     ec ON ec.id_estado_cuenta_usuario     = u.id_estado_cuenta_usuario
    JOIN   Rol                     r  ON r.id_rol                        = u.id_rol
    WHERE  u.id_usuario = ?
');
$stmt->execute([$user['id']]);
$row = $stmt->fetch();

if (!$row || $row['estado_validacion'] !== 'VALIDADO' || $row['estado_cuenta'] !== 'ACTIVA') {
    session_destroy();
    json_ok(['loggedIn' => false]);
}

// Keep session in sync if role changed (e.g. admin downgraded the user)
$user['rol_codigo'] = $row['rol_codigo'];
$user['rol_nombre'] = $row['rol_nombre'];
$_SESSION['user']   = $user;

json_ok(array_merge($user, ['loggedIn' => true]));
