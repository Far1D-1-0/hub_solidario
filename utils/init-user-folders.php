<?php
/**
 * Mantenimiento: crea las carpetas archivos_usuario/{id_usuario}/
 * para todos los usuarios con rol LIDER que aún no la tienen.
 *
 * Ejecutar una sola vez desde CLI o navegador (requiere rol ADMIN en sesión web).
 * Ejemplo CLI: php utils/init-user-folders.php
 */
declare(strict_types=1);
$isCli = PHP_SAPI === 'cli';

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/response.php';
require_once __DIR__ . '/../config/auth.php';

if (!$isCli) {
    require_auth();
    $me = session_user();
    if (!$me || $me['rol_codigo'] !== 'ADMIN') {
        json_err('Solo un administrador puede ejecutar este script.', 403);
    }
}

$pdo  = db();
$stmt = $pdo->query("
    SELECT u.id_usuario, u.nombre, u.email
    FROM Usuario u
    JOIN Rol r ON r.id_rol = u.id_rol
    WHERE r.codigo = 'LIDER'
    ORDER BY u.id_usuario
");
$lideres = $stmt->fetchAll(PDO::FETCH_ASSOC);

$base   = __DIR__ . '/../archivos_usuario';
$creados = [];
$existentes = [];

foreach ($lideres as $u) {
    $dir = $base . '/' . $u['id_usuario'];
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
        $creados[] = $u;
    } else {
        $existentes[] = $u;
    }
}

if ($isCli) {
    echo "Carpetas creadas   : " . count($creados)   . "\n";
    echo "Ya existían        : " . count($existentes) . "\n";
    foreach ($creados as $u) {
        echo "  + archivos_usuario/{$u['id_usuario']}/  ({$u['nombre']})\n";
    }
} else {
    json_ok([
        'creadas'    => array_map(fn($u) => ['id' => $u['id_usuario'], 'nombre' => $u['nombre']], $creados),
        'existentes' => count($existentes),
    ]);
}
