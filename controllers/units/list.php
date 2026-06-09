<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');
$pdo  = db();
$stmt = $pdo->query('SELECT id_unidad_medida AS id, codigo, nombre, simbolo FROM UnidadMedida ORDER BY nombre');
json_ok($stmt->fetchAll());
