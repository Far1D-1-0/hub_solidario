<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_auth();

/* ── Validate uploaded file ─────────────────────────────────── */
if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $code = $_FILES['file']['error'] ?? -1;
    $msgs = [
        UPLOAD_ERR_INI_SIZE   => 'El archivo supera el límite del servidor (upload_max_filesize).',
        UPLOAD_ERR_FORM_SIZE  => 'El archivo supera el límite del formulario.',
        UPLOAD_ERR_PARTIAL    => 'El archivo se subió de forma incompleta.',
        UPLOAD_ERR_NO_FILE    => 'No se recibió ningún archivo.',
        UPLOAD_ERR_NO_TMP_DIR => 'Falta el directorio temporal del servidor.',
        UPLOAD_ERR_CANT_WRITE => 'No se pudo escribir el archivo en el servidor.',
    ];
    json_err($msgs[$code] ?? 'Error desconocido al subir el archivo.', 400);
}

$tipo_codigo = strtoupper(trim($_POST['tipo_archivo'] ?? 'DOCUMENTO'));
$allowed     = ['IMAGEN', 'DOCUMENTO', 'VIDEO', 'AUDIO', 'DATASET'];
if (!in_array($tipo_codigo, $allowed, true)) json_err('Tipo de archivo no válido.');

/* ── Extension / MIME validation per type ───────────────────── */
$ext_map = [
    'IMAGEN'    => ['jpg','jpeg','png','gif','webp','svg'],
    'DOCUMENTO' => ['pdf','doc','docx','xls','xlsx','ppt','pptx','txt'],
    'VIDEO'     => ['mp4','mov','avi','webm','mkv'],
    'AUDIO'     => ['mp3','wav','ogg','m4a','aac'],
    'DATASET'   => ['csv','json','xlsx','tsv'],
];
$size_limit_mb = ['IMAGEN'=>10,'DOCUMENTO'=>50,'VIDEO'=>500,'AUDIO'=>100,'DATASET'=>20];

$original   = $_FILES['file']['name'];
$ext        = strtolower(pathinfo($original, PATHINFO_EXTENSION));
$allowed_ext = $ext_map[$tipo_codigo];

if (!in_array($ext, $allowed_ext, true)) {
    json_err("El tipo $tipo_codigo solo acepta: " . implode(', ', $allowed_ext) . ".");
}

$size_bytes = $_FILES['file']['size'];
$max_bytes  = $size_limit_mb[$tipo_codigo] * 1024 * 1024;
if ($size_bytes > $max_bytes) {
    json_err("El archivo supera el límite de {$size_limit_mb[$tipo_codigo]} MB para tipo $tipo_codigo.");
}

/* ── Target directory: archivos_usuario/{id_usuario}/ ───────── */
$base_dir   = __DIR__ . '/../../archivos_usuario/' . $me['id'];
if (!is_dir($base_dir) && !mkdir($base_dir, 0755, true)) {
    json_err('No se pudo crear el directorio de destino.', 500);
}

$safe_name  = preg_replace('/[^a-zA-Z0-9._-]/', '_', pathinfo($original, PATHINFO_FILENAME));
$filename   = time() . '_' . $safe_name . '.' . $ext;
$abs_path   = $base_dir . '/' . $filename;
$ruta       = 'archivos_usuario/' . $me['id'] . '/' . $filename;

if (!move_uploaded_file($_FILES['file']['tmp_name'], $abs_path)) {
    json_err('No se pudo guardar el archivo en el servidor.', 500);
}

/* ── Register in ArchivoUsuario ─────────────────────────────── */
$pdo       = db();
$tipo_id   = $pdo->prepare('SELECT id_tipo_archivo FROM TipoArchivo WHERE codigo = ?');
$tipo_id->execute([$tipo_codigo]);
$id_tipo   = $tipo_id->fetchColumn();
if (!$id_tipo) { unlink($abs_path); json_err('Tipo de archivo no encontrado en BD.', 500); }

$ins = $pdo->prepare('INSERT INTO ArchivoUsuario (ruta_archivo, id_usuario, id_tipo_archivo) VALUES (?, ?, ?)');
$ins->execute([$ruta, $me['id'], $id_tipo]);
$id_archivo = (int)$pdo->lastInsertId();

json_ok([
    'id_archivo_usuario' => $id_archivo,
    'ruta_archivo'       => $ruta,
    'nombre_original'    => $original,
    'tipo'               => $tipo_codigo,
    'size_bytes'         => $size_bytes,
], 201);
