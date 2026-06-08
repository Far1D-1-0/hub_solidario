<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');

$b = body();
$contenido        = trim($b['contenido']        ?? '');
$tipo_participante= trim($b['tipo_participante']?? '');
$nombre_publico   = trim($b['nombre_publico']   ?? '');
$id_proyecto      = isset($b['id_proyecto']) ? (int) $b['id_proyecto'] : 0;

if (!$contenido)  json_err('El contenido del testimonio es requerido');
if (!$id_proyecto) json_err('El proyecto es requerido');

$pdo = db();

// Verificar que el proyecto existe y está activo
$check = $pdo->prepare('
    SELECT p.id_proyecto FROM Proyecto p
    JOIN EstadoProyecto ep ON ep.id_estado_proyecto = p.id_estado_proyecto
    WHERE p.id_proyecto = ? AND ep.codigo = \'ACTIVO\'
');
$check->execute([$id_proyecto]);
if (!$check->fetch()) json_err('Proyecto no encontrado o inactivo', 404);

$ep = $pdo->query("SELECT id_estado_testimonio FROM EstadoTestimonio WHERE codigo = 'PENDIENTE'")->fetchColumn();

$me = session_user();

$ins = $pdo->prepare('
    INSERT INTO Testimonio
        (fecha, contenido, tipo_participante, nombre_publico, id_usuario, id_proyecto, id_estado_testimonio)
    VALUES (NOW(), ?, ?, ?, ?, ?, ?)
');
$ins->execute([
    $contenido,
    $tipo_participante ?: null,
    $nombre_publico    ?: null,
    $me ? $me['id'] : null,
    $id_proyecto,
    $ep,
]);

json_ok(['id' => (int) $pdo->lastInsertId()], 201);
