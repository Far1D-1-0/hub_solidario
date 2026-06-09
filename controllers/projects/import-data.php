<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

$method = $_SERVER['REQUEST_METHOD'] ?? '';

if ($method === 'GET') {
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    if (!$id) json_err('ID de proyecto inválido');

    $pdo  = db();
    $stmt = $pdo->prepare('SELECT datos_importados FROM Proyecto WHERE id_proyecto = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();

    if (!$row) json_err('Proyecto no encontrado', 404);

    $data = json_decode($row['datos_importados'] ?? 'null', true);
    json_ok($data ?? (object)[]);
}

if ($method === 'POST') {
    $me = require_auth();
    $b  = body();

    $id = (int)($b['id'] ?? 0);
    if (!$id) json_err('ID de proyecto inválido');

    $pdo  = db();
    $proj = $pdo->prepare('SELECT id_usuario_lider FROM Proyecto WHERE id_proyecto = ?');
    $proj->execute([$id]);
    $row = $proj->fetch();

    if (!$row) json_err('Proyecto no encontrado', 404);
    if ($me['rol_codigo'] !== 'ADMIN' && (int)$me['id'] !== (int)$row['id_usuario_lider']) {
        json_err('Sin autorización', 403);
    }

    // Merge incoming data with existing
    $existingStmt = $pdo->prepare('SELECT datos_importados FROM Proyecto WHERE id_proyecto = ?');
    $existingStmt->execute([$id]);
    $existingRow  = $existingStmt->fetch();
    $existing     = json_decode($existingRow['datos_importados'] ?? 'null', true) ?? [];

    $incoming = $b['datos_importados'] ?? [];
    if (!is_array($incoming)) json_err('datos_importados debe ser un objeto JSON');

    $merged = array_merge($existing, $incoming);

    $pdo->prepare('UPDATE Proyecto SET datos_importados = ? WHERE id_proyecto = ?')
        ->execute([json_encode($merged), $id]);

    json_ok($merged);
}

json_err('Método no permitido', 405);
