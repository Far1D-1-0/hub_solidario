<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

$defaults = [
    'palette'       => 'default',
    'widgetOrder'   => ['description','dashboard','progress','content','publications'],
    'hiddenWidgets' => [],
    'charts'        => [],
];

$method = $_SERVER['REQUEST_METHOD'] ?? '';

if ($method === 'GET') {
    $id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    if (!$id) json_err('ID de proyecto inválido');

    $pdo  = db();
    $stmt = $pdo->prepare('SELECT configuracion FROM Proyecto WHERE id_proyecto = ?');
    $stmt->execute([$id]);
    $row = $stmt->fetch();

    if (!$row) json_err('Proyecto no encontrado', 404);

    $config = json_decode($row['configuracion'] ?? 'null', true);
    json_ok($config ? array_merge($defaults, $config) : $defaults);
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

    $config = [
        'palette'       => $b['palette']       ?? $defaults['palette'],
        'widgetOrder'   => $b['widgetOrder']    ?? $defaults['widgetOrder'],
        'hiddenWidgets' => $b['hiddenWidgets']  ?? [],
        'charts'        => $b['charts']         ?? [],
    ];

    $pdo->prepare('UPDATE Proyecto SET configuracion = ? WHERE id_proyecto = ?')
        ->execute([json_encode($config), $id]);

    json_ok($config);
}

json_err('Método no permitido', 405);
