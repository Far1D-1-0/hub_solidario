<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();

$b           = body();
$id_proyecto = (int)($b['id_proyecto'] ?? 0);
$id_kpi      = (int)($b['id_kpi']      ?? 0);

if (!$id_proyecto) json_err('id_proyecto es requerido');
if (!$id_kpi)      json_err('id_kpi es requerido');

$pdo  = db();
$proj = $pdo->prepare('SELECT id_usuario_lider, configuracion FROM Proyecto WHERE id_proyecto = ?');
$proj->execute([$id_proyecto]);
$row  = $proj->fetch();

if (!$row) json_err('Proyecto no encontrado', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$row['id_usuario_lider'] !== (int)$me['id']) {
    json_err('Sin autorización', 403);
}

$config  = json_decode($row['configuracion'] ?? 'null', true) ?? [];
$charts  = $config['charts'] ?? [];
$updated = array_values(array_filter($charts, fn($c) => (int)$c['id_kpi'] !== $id_kpi));

$config['charts'] = $updated;
$pdo->prepare('UPDATE Proyecto SET configuracion = ? WHERE id_proyecto = ?')
    ->execute([json_encode($config), $id_proyecto]);

json_ok(['charts' => $updated]);
