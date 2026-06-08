<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$id_proyecto = filter_input(INPUT_GET, 'proyecto', FILTER_VALIDATE_INT);
$estado      = strtoupper(trim($_GET['estado'] ?? 'APROBADO'));

if (!in_array($estado, ['PENDIENTE','APROBADO','RECHAZADO'], true)) {
    json_err('Estado inválido');
}

$pdo = db();

$params = [$estado];
$where  = 'et.codigo = ?';

if ($id_proyecto) {
    $where   .= ' AND t.id_proyecto = ?';
    $params[] = $id_proyecto;
}

$rows = $pdo->prepare("
    SELECT
        t.id_testimonio     AS id,
        t.contenido,
        t.tipo_participante,
        t.nombre_publico,
        t.fecha,
        t.fecha_revision,
        p.id_proyecto,
        p.nombre            AS proyecto_nombre,
        et.codigo           AS estado,
        u.nombre            AS autor_nombre,
        ur.nombre           AS revisor_nombre
    FROM Testimonio t
    JOIN Proyecto p              ON p.id_proyecto          = t.id_proyecto
    JOIN EstadoTestimonio et     ON et.id_estado_testimonio = t.id_estado_testimonio
    LEFT JOIN Usuario u          ON u.id_usuario           = t.id_usuario
    LEFT JOIN Usuario ur         ON ur.id_usuario          = t.id_usuario_revisor
    WHERE {$where}
    ORDER BY t.fecha DESC
");
$rows->execute($params);

json_ok($rows->fetchAll());
