<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$pdo        = db();
$proyectoId = filter_input(INPUT_GET, 'proyecto', FILTER_VALIDATE_INT);

$sql = '
    SELECT
        e.id_evento,
        e.nombre,
        e.descripcion,
        e.fecha_realizacion,
        p.id_proyecto,
        p.nombre  AS proyecto_nombre,
        ee.codigo AS estado
    FROM Evento e
    JOIN Proyecto p       ON p.id_proyecto       = e.id_proyecto
    JOIN EstadoEvento ee  ON ee.id_estado_evento  = e.id_estado_evento
    WHERE ee.codigo IN (\'ACTIVO\',\'PROGRAMADO\',\'PUBLICADO\',\'PASADO\',\'CANCELADO\')
';

$params = [];
if ($proyectoId) {
    $sql    .= ' AND e.id_proyecto = ?';
    $params[] = $proyectoId;
}

$sql .= ' ORDER BY e.fecha_realizacion ASC';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);

json_ok($stmt->fetchAll());
