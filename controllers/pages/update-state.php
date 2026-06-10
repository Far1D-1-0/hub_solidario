<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$user = require_role('LIDER', 'ADMIN');

$b          = body();
$id_pagina  = isset($b['id_pagina']) ? (int)$b['id_pagina'] : 0;
$estado_cod = trim($b['estado'] ?? '');

if (!$id_pagina)    json_err('ID de página inválido');
if (!$estado_cod)   json_err('Estado requerido');

$allowed = ['BORRADOR', 'PUBLICADA', 'ARCHIVADA'];
if (!in_array($estado_cod, $allowed, true)) json_err('Estado inválido');

$pdo = db();

// Verify that the user is the leader of the project that owns this page
$stmt = $pdo->prepare('
    SELECT pr.id_usuario_lider AS id_lider
    FROM Pagina p
    JOIN Seccion s   ON s.id_seccion   = p.id_seccion
    JOIN Proyecto pr ON pr.id_proyecto = s.id_proyecto
    WHERE p.id_pagina = ?
');
$stmt->execute([$id_pagina]);
$row = $stmt->fetch();

if (!$row) json_err('Página no encontrada', 404);
if ($user['rol_codigo'] !== 'ADMIN' && (int)$row['id_lider'] !== $user['id']) {
    json_err('No tienes permiso para modificar esta página', 403);
}

// Resolve estado code to id
$stmtE = $pdo->prepare('SELECT id_estado_pagina FROM EstadoPagina WHERE codigo = ?');
$stmtE->execute([$estado_cod]);
$estadoRow = $stmtE->fetch();
if (!$estadoRow) json_err('Estado desconocido');

$stmtU = $pdo->prepare('UPDATE Pagina SET id_estado_pagina = ? WHERE id_pagina = ?');
$stmtU->execute([$estadoRow['id_estado_pagina'], $id_pagina]);

json_ok(['id_pagina' => $id_pagina, 'estado' => $estado_cod]);
