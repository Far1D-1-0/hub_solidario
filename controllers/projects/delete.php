<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');

$me = require_role('ADMIN');

$b = body();
$id = isset($b['id']) ? (int) $b['id'] : 0;
if (!$id) json_err('ID de proyecto inválido');

$pdo = db();

$ep = $pdo->query("SELECT id_estado_proyecto FROM EstadoProyecto WHERE codigo = 'INACTIVO'")->fetchColumn();
if (!$ep) json_err('Estado no encontrado', 500);

$stmt = $pdo->prepare('UPDATE Proyecto SET id_estado_proyecto = ? WHERE id_proyecto = ?');
$stmt->execute([$ep, $id]);

if ($stmt->rowCount() === 0) json_err('Proyecto no encontrado', 404);

json_ok(['id' => $id]);
