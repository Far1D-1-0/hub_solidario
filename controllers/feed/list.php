<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$limit = max(1, min(50, (int)(filter_input(INPUT_GET, 'limit', FILTER_VALIDATE_INT) ?: 20)));

$pdo = db();

$stmt = $pdo->prepare('
    SELECT
        pub.id_publicacion  AS id,
        pub.contenido,
        pub.fecha_publicacion,
        u.nombre            AS autor_nombre,
        p.id_proyecto,
        p.nombre            AS proyecto_nombre
    FROM Publicacion pub
    JOIN Usuario u              ON u.id_usuario              = pub.id_usuario
    JOIN EstadoPublicacion ep   ON ep.id_estado_publicacion  = pub.id_estado_publicacion
    JOIN Proyecto p             ON p.id_proyecto             = pub.id_proyecto
    WHERE ep.codigo = \'PUBLICADA\'
    ORDER BY pub.fecha_publicacion DESC
    LIMIT ?
');
$stmt->execute([$limit]);

json_ok($stmt->fetchAll());
