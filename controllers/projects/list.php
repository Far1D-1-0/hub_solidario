<?php
declare(strict_types=1);
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/response.php';

only_method('GET');

$pdo = db();

$rows = $pdo->query('
    SELECT
        p.id_proyecto                              AS id,
        p.nombre,
        p.descripcion,
        p.imagen,
        p.ubicacion,
        p.porcentaje_completacion                  AS completacion,
        c.nombre                                   AS categoria_nombre,
        c.color                                    AS categoria_color,
        u.id_usuario                               AS lider_id,
        u.nombre                                   AS lider_nombre,
        u.foto_perfil                              AS lider_foto,
        ep.codigo                                  AS estado,
        (
            SELECT COUNT(*)
            FROM ProyectoUsuario pu
            WHERE pu.id_proyecto = p.id_proyecto
              AND pu.fecha_desvinculacion IS NULL
        )                                          AS num_voluntarios
    FROM Proyecto p
    LEFT JOIN Categoria c    ON c.id_categoria  = p.id_categoria
    LEFT JOIN Usuario u      ON u.id_usuario    = p.id_usuario_lider
    JOIN  EstadoProyecto ep  ON ep.id_estado_proyecto = p.id_estado_proyecto
    WHERE ep.codigo = \'ACTIVO\'
    ORDER BY p.fecha_creacion DESC, p.id_proyecto DESC
')->fetchAll();

json_ok($rows);
