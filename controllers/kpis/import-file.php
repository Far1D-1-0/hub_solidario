<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

only_method('POST');
$me = require_role('ADMIN', 'LIDER');

/* ── Validate file ───────────────────────────────────────────── */
if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    json_err('No se recibió ningún archivo CSV/JSON válido.');
}

$original = $_FILES['file']['name'];
$ext      = strtolower(pathinfo($original, PATHINFO_EXTENSION));
if (!in_array($ext, ['csv', 'json'], true)) {
    json_err('Solo se aceptan archivos .csv o .json para importación de KPIs.');
}
if ($_FILES['file']['size'] > 20 * 1024 * 1024) {
    json_err('El archivo supera el límite de 20 MB.');
}

$id_proyecto = isset($_POST['id_proyecto']) ? (int)$_POST['id_proyecto'] : 0;
if (!$id_proyecto) json_err('id_proyecto es requerido.');

$tipo_grafica_raw = strtolower(trim($_POST['tipo_grafica'] ?? ''));
$tipo_grafica = in_array($tipo_grafica_raw, ['histograma','puntos','pie'], true) ? $tipo_grafica_raw : null;

/* ── Auth: user must be leader of the project ────────────────── */
$pdo  = db();
$proj = $pdo->prepare('SELECT id_usuario_lider FROM Proyecto WHERE id_proyecto = ?');
$proj->execute([$id_proyecto]);
$proyecto = $proj->fetch(PDO::FETCH_ASSOC);
if (!$proyecto)                                                                                json_err('Proyecto no encontrado.', 404);
if ($me['rol_codigo'] !== 'ADMIN' && (int)$proyecto['id_usuario_lider'] !== (int)$me['id'])   json_err('Sin autorización.', 403);

/* ── Save file to archivos_usuario/{id_usuario}/ ─────────────── */
$base_dir = __DIR__ . '/../../archivos_usuario/' . $me['id'];
if (!is_dir($base_dir) && !mkdir($base_dir, 0755, true)) {
    json_err('No se pudo crear el directorio de destino.', 500);
}

$safe_name = preg_replace('/[^a-zA-Z0-9._-]/', '_', pathinfo($original, PATHINFO_FILENAME));
$filename  = time() . '_' . $safe_name . '.' . $ext;
$abs_path  = $base_dir . '/' . $filename;
$ruta      = 'archivos_usuario/' . $me['id'] . '/' . $filename;

if (!move_uploaded_file($_FILES['file']['tmp_name'], $abs_path)) {
    json_err('No se pudo guardar el archivo en el servidor.', 500);
}

/* ── Register file in ArchivoUsuario ────────────────────────── */
$tipo_dataset = $pdo->query("SELECT id_tipo_archivo FROM TipoArchivo WHERE codigo = 'DATASET'")->fetchColumn();
$insFile = $pdo->prepare('INSERT INTO ArchivoUsuario (ruta_archivo, id_usuario, id_tipo_archivo, tipo_grafica) VALUES (?, ?, ?, ?)');
$insFile->execute([$ruta, $me['id'], $tipo_dataset, $tipo_grafica]);
$id_archivo = (int)$pdo->lastInsertId();

/* ── Parse file ──────────────────────────────────────────────── */
$rows = [];

if ($ext === 'json') {
    $raw = file_get_contents($abs_path);
    $decoded = json_decode($raw, true);
    if (!is_array($decoded)) {
        json_err('El JSON debe ser un array de objetos con campos: kpi_nombre (o id_kpi), fecha, valor.');
    }
    $rows = $decoded;
} else {
    // CSV parse
    $handle = fopen($abs_path, 'r');
    $headers = array_map('strtolower', array_map('trim', fgetcsv($handle) ?: []));
    while (($line = fgetcsv($handle)) !== false) {
        if (count($line) < count($headers)) continue;
        $rows[] = array_combine($headers, array_map('trim', $line));
    }
    fclose($handle);
}

/* ── Load project KPIs for name lookup ───────────────────────── */
$kpiStmt = $pdo->prepare('SELECT id_kpi, nombre FROM KPI WHERE id_proyecto = ?');
$kpiStmt->execute([$id_proyecto]);
$kpiByName = [];
foreach ($kpiStmt->fetchAll(PDO::FETCH_ASSOC) as $k) {
    $kpiByName[mb_strtolower(trim($k['nombre']))] = (int)$k['id_kpi'];
}

/* ── Insert ResultadoKPI ─────────────────────────────────────── */
$insKpi = $pdo->prepare('
    INSERT INTO ResultadoKPI (valor, fecha_resultado, id_kpi, id_archivo_usuario, id_usuario_registro)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE valor = VALUES(valor), id_archivo_usuario = VALUES(id_archivo_usuario)
');

$importados = 0;
$omitidos   = 0;
$errores    = [];

foreach ($rows as $i => $row) {
    $linea = $i + 2; // 1-based, accounting for header

    // Resolve id_kpi
    $id_kpi = null;
    if (!empty($row['id_kpi']) && is_numeric($row['id_kpi'])) {
        $id_kpi = (int)$row['id_kpi'];
        // Verify it belongs to this project
        if (!in_array($id_kpi, $kpiByName, true)) {
            $errores[] = "Fila $linea: id_kpi=$id_kpi no pertenece a este proyecto.";
            $omitidos++;
            continue;
        }
    } elseif (!empty($row['kpi_nombre'])) {
        $nombre_lower = mb_strtolower(trim($row['kpi_nombre']));
        if (!isset($kpiByName[$nombre_lower])) {
            $errores[] = "Fila $linea: KPI \"{$row['kpi_nombre']}\" no encontrado en el proyecto.";
            $omitidos++;
            continue;
        }
        $id_kpi = $kpiByName[$nombre_lower];
    } else {
        $errores[] = "Fila $linea: falta columna 'kpi_nombre' o 'id_kpi'.";
        $omitidos++;
        continue;
    }

    // Resolve fecha
    $fecha_raw = trim($row['fecha'] ?? '');
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha_raw)) {
        $errores[] = "Fila $linea: fecha '$fecha_raw' inválida (use YYYY-MM-DD).";
        $omitidos++;
        continue;
    }

    // Resolve valor
    if (!isset($row['valor']) || !is_numeric($row['valor'])) {
        $errores[] = "Fila $linea: valor '{$row['valor']}' no es numérico.";
        $omitidos++;
        continue;
    }
    $valor = (float)$row['valor'];

    try {
        $insKpi->execute([$valor, $fecha_raw . ' 00:00:00', $id_kpi, $id_archivo, $me['id']]);
        $importados++;
    } catch (PDOException $e) {
        $errores[] = "Fila $linea: error de base de datos — " . $e->getMessage();
        $omitidos++;
    }
}

json_ok([
    'archivo'    => $ruta,
    'id_archivo' => $id_archivo,
    'importados' => $importados,
    'omitidos'   => $omitidos,
    'errores'    => $errores,
]);
