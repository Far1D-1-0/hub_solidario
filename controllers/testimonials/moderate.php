<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');

$me = require_role('ADMIN', 'LIDER');

$b      = body();
$id     = isset($b['id'])     ? (int) $b['id']     : 0;
$accion = strtoupper(trim($b['accion'] ?? ''));

if (!$id) json_err('ID de testimonio inválido');
if (!in_array($accion, ['APROBADO','RECHAZADO'], true)) json_err('Acción inválida');

$pdo = db();

// Líderes solo pueden moderar testimonios de sus propios proyectos
if ($me['rol_codigo'] === 'LIDER') {
    $own = $pdo->prepare('
        SELECT t.id_testimonio
        FROM Testimonio t
        JOIN Proyecto p ON p.id_proyecto = t.id_proyecto
        WHERE t.id_testimonio = ? AND p.id_usuario_lider = ?
    ');
    $own->execute([$id, $me['id']]);
    if (!$own->fetch()) json_err('No autorizado para moderar este testimonio', 403);
}

$ep = $pdo->prepare('SELECT id_estado_testimonio FROM EstadoTestimonio WHERE codigo = ?');
$ep->execute([$accion]);
$id_estado = $ep->fetchColumn();
if (!$id_estado) json_err('Estado no encontrado', 500);

$stmt = $pdo->prepare('
    UPDATE Testimonio
    SET id_estado_testimonio = ?, id_usuario_revisor = ?, fecha_revision = NOW()
    WHERE id_testimonio = ?
');
$stmt->execute([$id_estado, $me['id'], $id]);

if ($stmt->rowCount() === 0) json_err('Testimonio no encontrado', 404);

json_ok(['id' => $id, 'estado' => $accion]);
