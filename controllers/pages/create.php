<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_role('ADMIN', 'LIDER');

$b = body();
$id_seccion  = isset($b['id_seccion'])  ? (int)$b['id_seccion']  : 0;
$titulo      = trim($b['titulo']        ?? '');
$tipo_codigo = strtoupper(trim($b['tipo_pagina'] ?? 'CONTENIDO'));

if (!$id_seccion) json_err('id_seccion es requerido');
if (!$titulo)     json_err('El título de la página es requerido');

$pdo = db();

$secStmt = $pdo->prepare('
    SELECT s.id_proyecto, p.id_usuario_lider
    FROM Seccion s
    JOIN Proyecto p ON p.id_proyecto = s.id_proyecto
    WHERE s.id_seccion = ?
');
$secStmt->execute([$id_seccion]);
$sec = $secStmt->fetch(PDO::FETCH_ASSOC);
if (!$sec)                                                                                  json_err('Sección no encontrada', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$sec['id_usuario_lider'] !== (int)$me['id'])     json_err('Sin autorización', 403);

$tipoStmt = $pdo->prepare('SELECT id_tipo_pagina FROM TipoPagina WHERE codigo = ?');
$tipoStmt->execute([$tipo_codigo]);
$id_tipo = $tipoStmt->fetchColumn();
if (!$id_tipo) json_err('Tipo de página no válido');

$epStmt = $pdo->prepare('SELECT id_estado_pagina FROM EstadoPagina WHERE codigo = ?');
$epStmt->execute(['BORRADOR']);
$id_estado = $epStmt->fetchColumn();
if (!$id_estado) json_err('Estado de página no encontrado', 500);

function slugify(string $text): string {
    static $map = [
        'á'=>'a','à'=>'a','ä'=>'a','â'=>'a','ã'=>'a',
        'é'=>'e','è'=>'e','ë'=>'e','ê'=>'e',
        'í'=>'i','ì'=>'i','ï'=>'i','î'=>'i',
        'ó'=>'o','ò'=>'o','ö'=>'o','ô'=>'o','õ'=>'o',
        'ú'=>'u','ù'=>'u','ü'=>'u','û'=>'u','ñ'=>'n',
    ];
    $text = mb_strtolower(strtr($text, $map), 'UTF-8');
    $text = preg_replace('/[^a-z0-9\s-]/u', '', $text);
    $text = preg_replace('/[\s-]+/', '-', trim($text));
    return $text ?: 'pagina';
}

$base = slugify($titulo);
$slug = $base;
$n    = 1;
while (true) {
    $chk = $pdo->prepare('SELECT 1 FROM Pagina WHERE id_seccion = ? AND slug = ?');
    $chk->execute([$id_seccion, $slug]);
    if (!$chk->fetchColumn()) break;
    $slug = $base . '-' . (++$n);
}

$maxQ = $pdo->prepare('SELECT COALESCE(MAX(orden), -1) + 1 FROM Pagina WHERE id_seccion = ?');
$maxQ->execute([$id_seccion]);
$orden = (int)$maxQ->fetchColumn();

$ins = $pdo->prepare('
    INSERT INTO Pagina (titulo, slug, orden, id_tipo_pagina, id_seccion, id_usuario_creador, id_estado_pagina)
    VALUES (?, ?, ?, ?, ?, ?, ?)
');
$ins->execute([$titulo, $slug, $orden, $id_tipo, $id_seccion, $me['id'], $id_estado]);

json_ok([
    'id_pagina'  => (int)$pdo->lastInsertId(),
    'titulo'     => $titulo,
    'slug'       => $slug,
    'orden'      => $orden,
    'tipo'       => $tipo_codigo,
    'estado'     => 'BORRADOR',
    'id_seccion' => $id_seccion,
], 201);
