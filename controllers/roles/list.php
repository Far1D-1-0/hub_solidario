<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$rows = db()->query('SELECT id_rol AS id, codigo, nombre FROM Rol ORDER BY id_rol')->fetchAll();

json_ok($rows);
