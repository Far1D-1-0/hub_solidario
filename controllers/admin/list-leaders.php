<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('GET');
require_role('ADMIN');

$pdo = db();

$rows = $pdo->query('
    SELECT u.id_usuario AS id, u.nombre, u.email, u.fecha_registro,
           r.codigo  AS rol_codigo, r.nombre AS rol_nombre,
           ev.codigo AS estado_validacion,
           ec.codigo AS estado_cuenta
    FROM Usuario u
    JOIN Rol r                       ON r.id_rol = u.id_rol
    JOIN EstadoValidacionUsuario ev  ON ev.id_estado_validacion_usuario = u.id_estado_validacion_usuario
    JOIN EstadoCuentaUsuario ec      ON ec.id_estado_cuenta_usuario     = u.id_estado_cuenta_usuario
    WHERE r.codigo = \'LIDER\'
      AND ev.codigo = \'VALIDADO\'
      AND ec.codigo = \'ACTIVA\'
    ORDER BY u.nombre ASC
');

json_ok($rows->fetchAll());
