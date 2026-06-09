<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$id = filter_input(INPUT_GET, 'proyecto', FILTER_VALIDATE_INT);
if (!$id) json_err('ID de proyecto inválido');

$pdo = db();

$stmt = $pdo->prepare('
    SELECT
        pub.id_publicacion  AS id,
        pub.contenido,
        pub.fecha_publicacion,
        u.nombre            AS autor_nombre
    FROM Publicacion pub
    JOIN Usuario u              ON u.id_usuario              = pub.id_usuario
    JOIN EstadoPublicacion ep   ON ep.id_estado_publicacion  = pub.id_estado_publicacion
    WHERE pub.id_proyecto = ?
      AND ep.codigo = \'PUBLICADA\'
    ORDER BY pub.fecha_publicacion DESC
');
$stmt->execute([$id]);

json_ok($stmt->fetchAll());
