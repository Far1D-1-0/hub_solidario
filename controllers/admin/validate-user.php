<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
require_role('ADMIN');

$b      = body();
$id     = isset($b['id'])     ? (int) $b['id']     : 0;
$accion = strtoupper(trim($b['accion'] ?? ''));

if (!$id) json_err('ID de usuario inválido');
if (!in_array($accion, ['VALIDADO','RECHAZADO'], true)) json_err('Acción inválida');

$pdo = db();

$ev = $pdo->prepare('SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo = ?');
$ev->execute([$accion]);
$id_estado = $ev->fetchColumn();
if (!$id_estado) json_err('Estado no encontrado', 500);

$stmt = $pdo->prepare('UPDATE Usuario SET id_estado_validacion_usuario = ? WHERE id_usuario = ?');
$stmt->execute([$id_estado, $id]);

if ($stmt->rowCount() === 0) json_err('Usuario no encontrado', 404);

json_ok(['id' => $id, 'estado_validacion' => $accion]);
