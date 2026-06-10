<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
require_role('ADMIN');

$b  = body();
$id = isset($b['id']) ? (int) $b['id'] : 0;

if (!$id) json_err('ID de usuario inválido');

$pdo = db();

$rolStmt = $pdo->prepare('SELECT id_rol FROM Rol WHERE codigo = ?');
$rolStmt->execute(['USUARIO']);
$id_rol_usuario = $rolStmt->fetchColumn();
if (!$id_rol_usuario) json_err('Rol USUARIO no encontrado', 500);

$check = $pdo->prepare('SELECT r.codigo FROM Usuario u JOIN Rol r ON r.id_rol = u.id_rol WHERE u.id_usuario = ?');
$check->execute([$id]);
$rol_actual = $check->fetchColumn();
if ($rol_actual === false) json_err('Usuario no encontrado', 404);
if ($rol_actual !== 'LIDER') json_err('El usuario no tiene el rol de Líder Social');

$stmt = $pdo->prepare('UPDATE Usuario SET id_rol = ? WHERE id_usuario = ?');
$stmt->execute([$id_rol_usuario, $id]);

json_ok(['id' => $id, 'nuevo_rol' => 'USUARIO']);
