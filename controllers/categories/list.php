<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$rows = db()->query('SELECT id_categoria AS id, codigo, nombre, color FROM Categoria ORDER BY id_categoria')->fetchAll();

json_ok($rows);
