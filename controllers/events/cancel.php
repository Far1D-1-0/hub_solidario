<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();

if ($me['rol_codigo'] !== 'ADMIN' && $me['rol_codigo'] !== 'LIDER')
    json_err('Sin autorización', 403);

$b  = body();
$id = (int)($b['id'] ?? 0);
if (!$id) json_err('ID de evento inválido');

$pdo = db();

$ev = $pdo->prepare('SELECT id_proyecto FROM Evento WHERE id_evento = ?');
$ev->execute([$id]);
$row = $ev->fetch();
if (!$row) json_err('Evento no encontrado', 404);

if ($me['rol_codigo'] === 'LIDER') {
    $check = $pdo->prepare('SELECT id_proyecto FROM Proyecto WHERE id_proyecto = ? AND id_usuario_lider = ?');
    $check->execute([$row['id_proyecto'], $me['id']]);
    if (!$check->fetch()) json_err('Sin autorización', 403);
}

$estadoId = $pdo->query("SELECT id_estado_evento FROM EstadoEvento WHERE codigo = 'CANCELADO' LIMIT 1")
    ->fetchColumn();

$pdo->prepare('UPDATE Evento SET id_estado_evento=? WHERE id_evento=?')
    ->execute([$estadoId, $id]);

json_ok(['id' => $id]);
