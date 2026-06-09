CREATE DATABASE IF NOT EXISTS `hub_solidario`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `hub_solidario`;

CREATE TABLE `Rol` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `uq_rol_codigo` (`codigo`),
  UNIQUE KEY `uq_rol_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoValidacionUsuario` (
  `id_estado_validacion_usuario` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_estado_validacion_usuario`),
  UNIQUE KEY `uq_estado_validacion_usuario_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_validacion_usuario_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoCuentaUsuario` (
  `id_estado_cuenta_usuario` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_estado_cuenta_usuario`),
  UNIQUE KEY `uq_estado_cuenta_usuario_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_cuenta_usuario_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoProyecto` (
  `id_estado_proyecto` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_estado_proyecto`),
  UNIQUE KEY `uq_estado_proyecto_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_proyecto_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoPagina` (
  `id_estado_pagina` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_estado_pagina`),
  UNIQUE KEY `uq_estado_pagina_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_pagina_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoKPI` (
  `id_estado_kpi` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_estado_kpi`),
  UNIQUE KEY `uq_estado_kpi_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_kpi_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoPublicacion` (
  `id_estado_publicacion` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_estado_publicacion`),
  UNIQUE KEY `uq_estado_publicacion_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_publicacion_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoEvento` (
  `id_estado_evento` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_estado_evento`),
  UNIQUE KEY `uq_estado_evento_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_evento_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoTestimonio` (
  `id_estado_testimonio` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_estado_testimonio`),
  UNIQUE KEY `uq_estado_testimonio_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_testimonio_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TipoBloque` (
  `id_tipo_bloque` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_tipo_bloque`),
  UNIQUE KEY `uq_tipo_bloque_codigo` (`codigo`),
  UNIQUE KEY `uq_tipo_bloque_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TipoArchivo` (
  `id_tipo_archivo` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_tipo_archivo`),
  UNIQUE KEY `uq_tipo_archivo_codigo` (`codigo`),
  UNIQUE KEY `uq_tipo_archivo_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TipoPagina` (
  `id_tipo_pagina` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_tipo_pagina`),
  UNIQUE KEY `uq_tipo_pagina_codigo` (`codigo`),
  UNIQUE KEY `uq_tipo_pagina_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TipoAccionHistorial` (
  `id_tipo_accion_historial` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_tipo_accion_historial`),
  UNIQUE KEY `uq_tipo_accion_historial_codigo` (`codigo`),
  UNIQUE KEY `uq_tipo_accion_historial_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `UnidadMedida` (
  `id_unidad_medida` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `simbolo` VARCHAR(20),
  `descripcion` TEXT,
  PRIMARY KEY (`id_unidad_medida`),
  UNIQUE KEY `uq_unidad_medida_codigo` (`codigo`),
  UNIQUE KEY `uq_unidad_medida_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `fecha_registro` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contrasena` VARCHAR(255) NOT NULL,
  `id_rol` INT NOT NULL,
  `id_estado_validacion_usuario` INT NOT NULL,
  `id_estado_cuenta_usuario` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uq_usuario_email` (`email`),
  KEY `idx_usuario_rol` (`id_rol`),
  KEY `idx_usuario_estado_validacion` (`id_estado_validacion_usuario`),
  KEY `idx_usuario_estado_cuenta` (`id_estado_cuenta_usuario`),
  CONSTRAINT `fk_usuario_rol`
    FOREIGN KEY (`id_rol`) REFERENCES `Rol` (`id_rol`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_estado_validacion`
    FOREIGN KEY (`id_estado_validacion_usuario`)
    REFERENCES `EstadoValidacionUsuario` (`id_estado_validacion_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_estado_cuenta`
    FOREIGN KEY (`id_estado_cuenta_usuario`)
    REFERENCES `EstadoCuentaUsuario` (`id_estado_cuenta_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Proyecto` (
  `id_proyecto` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `imagen` VARCHAR(255),
  `porcentaje_completacion` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `id_estado_proyecto` INT NOT NULL,
  `id_pagina_home` INT,
  PRIMARY KEY (`id_proyecto`),
  KEY `idx_proyecto_estado` (`id_estado_proyecto`),
  KEY `idx_proyecto_pagina_home` (`id_pagina_home`),
  CONSTRAINT `chk_proyecto_porcentaje_completacion`
    CHECK (`porcentaje_completacion` >= 0 AND `porcentaje_completacion` <= 100),
  CONSTRAINT `fk_proyecto_estado`
    FOREIGN KEY (`id_estado_proyecto`)
    REFERENCES `EstadoProyecto` (`id_estado_proyecto`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ProyectoUsuario` (
  `id_proyecto_usuario` INT NOT NULL AUTO_INCREMENT,
  `id_proyecto` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `fecha_vinculacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_desvinculacion` DATETIME,
  PRIMARY KEY (`id_proyecto_usuario`),
  UNIQUE KEY `uq_proyecto_usuario_periodo`
    (`id_proyecto`, `id_usuario`, `fecha_vinculacion`),
  KEY `idx_proyecto_usuario_usuario` (`id_usuario`),
  CONSTRAINT `chk_proyecto_usuario_periodo`
    CHECK (`fecha_desvinculacion` IS NULL OR `fecha_desvinculacion` >= `fecha_vinculacion`),
  CONSTRAINT `fk_proyecto_usuario_proyecto`
    FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_proyecto_usuario_usuario`
    FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ArchivoUsuario` (
  `id_archivo_usuario` INT NOT NULL AUTO_INCREMENT,
  `ruta_archivo` VARCHAR(255) NOT NULL,
  `fecha_carga` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` INT NOT NULL,
  `id_tipo_archivo` INT NOT NULL,
  PRIMARY KEY (`id_archivo_usuario`),
  UNIQUE KEY `uq_archivo_usuario_ruta` (`ruta_archivo`),
  KEY `idx_archivo_usuario_usuario` (`id_usuario`),
  KEY `idx_archivo_usuario_tipo` (`id_tipo_archivo`),
  CONSTRAINT `fk_archivo_usuario_usuario`
    FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_archivo_usuario_tipo`
    FOREIGN KEY (`id_tipo_archivo`) REFERENCES `TipoArchivo` (`id_tipo_archivo`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Seccion` (
  `id_seccion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `orden` INT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_proyecto` INT,
  `id_seccion_padre` INT,
  `id_usuario_creador` INT NOT NULL,
  PRIMARY KEY (`id_seccion`),
  UNIQUE KEY `uq_seccion_slug_hermano`
    (`id_proyecto`, `id_seccion_padre`, `slug`),
  UNIQUE KEY `uq_seccion_orden_hermano`
    (`id_proyecto`, `id_seccion_padre`, `orden`),
  KEY `idx_seccion_proyecto` (`id_proyecto`),
  KEY `idx_seccion_padre` (`id_seccion_padre`),
  KEY `idx_seccion_usuario_creador` (`id_usuario_creador`),
  CONSTRAINT `chk_seccion_orden` CHECK (`orden` >= 0),
  CONSTRAINT `fk_seccion_proyecto`
    FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_seccion_padre`
    FOREIGN KEY (`id_seccion_padre`) REFERENCES `Seccion` (`id_seccion`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_seccion_usuario_creador`
    FOREIGN KEY (`id_usuario_creador`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Pagina` (
  `id_pagina` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `orden` INT NOT NULL,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_tipo_pagina` INT NOT NULL,
  `id_seccion` INT NOT NULL,
  `id_usuario_creador` INT NOT NULL,
  `id_estado_pagina` INT NOT NULL,
  PRIMARY KEY (`id_pagina`),
  UNIQUE KEY `uq_pagina_slug_seccion` (`id_seccion`, `slug`),
  UNIQUE KEY `uq_pagina_orden_seccion` (`id_seccion`, `orden`),
  KEY `idx_pagina_tipo` (`id_tipo_pagina`),
  KEY `idx_pagina_usuario_creador` (`id_usuario_creador`),
  KEY `idx_pagina_estado` (`id_estado_pagina`),
  CONSTRAINT `chk_pagina_orden` CHECK (`orden` >= 0),
  CONSTRAINT `fk_pagina_seccion`
    FOREIGN KEY (`id_seccion`) REFERENCES `Seccion` (`id_seccion`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pagina_tipo`
    FOREIGN KEY (`id_tipo_pagina`) REFERENCES `TipoPagina` (`id_tipo_pagina`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pagina_usuario_creador`
    FOREIGN KEY (`id_usuario_creador`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_pagina_estado`
    FOREIGN KEY (`id_estado_pagina`) REFERENCES `EstadoPagina` (`id_estado_pagina`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `PlantillaBloque` (
  `id_plantilla_bloque` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT,
  `renderer_key` VARCHAR(100) NOT NULL,
  `version` INT NOT NULL DEFAULT 1,
  `configuracion_base` JSON,
  `schema_configuracion` JSON,
  `id_tipo_bloque` INT NOT NULL,
  PRIMARY KEY (`id_plantilla_bloque`),
  UNIQUE KEY `uq_plantilla_bloque_renderer_version` (`renderer_key`, `version`),
  KEY `idx_plantilla_bloque_tipo` (`id_tipo_bloque`),
  CONSTRAINT `chk_plantilla_bloque_version` CHECK (`version` > 0),
  CONSTRAINT `fk_plantilla_bloque_tipo`
    FOREIGN KEY (`id_tipo_bloque`) REFERENCES `TipoBloque` (`id_tipo_bloque`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `BloqueContenido` (
  `id_bloque` INT NOT NULL AUTO_INCREMENT,
  `orden` INT NOT NULL,
  `configuracion` JSON,
  `contenido_texto` LONGTEXT,
  `fecha_creacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_pagina` INT NOT NULL,
  `id_plantilla_bloque` INT NOT NULL,
  PRIMARY KEY (`id_bloque`),
  UNIQUE KEY `uq_bloque_contenido_orden_pagina` (`id_pagina`, `orden`),
  KEY `idx_bloque_contenido_plantilla` (`id_plantilla_bloque`),
  CONSTRAINT `chk_bloque_contenido_orden` CHECK (`orden` >= 0),
  CONSTRAINT `fk_bloque_contenido_pagina`
    FOREIGN KEY (`id_pagina`) REFERENCES `Pagina` (`id_pagina`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bloque_contenido_plantilla`
    FOREIGN KEY (`id_plantilla_bloque`)
    REFERENCES `PlantillaBloque` (`id_plantilla_bloque`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `HistorialPagina` (
  `id_historial_pagina` INT NOT NULL AUTO_INCREMENT,
  `mensaje` TEXT NOT NULL,
  `fecha_cambio` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_tipo_accion_historial` INT NOT NULL,
  `id_pagina` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_historial_pagina`),
  KEY `idx_historial_pagina_pagina_fecha` (`id_pagina`, `fecha_cambio`),
  KEY `idx_historial_pagina_usuario` (`id_usuario`),
  KEY `idx_historial_pagina_tipo` (`id_tipo_accion_historial`),
  CONSTRAINT `fk_historial_pagina_tipo`
    FOREIGN KEY (`id_tipo_accion_historial`)
    REFERENCES `TipoAccionHistorial` (`id_tipo_accion_historial`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_historial_pagina_pagina`
    FOREIGN KEY (`id_pagina`) REFERENCES `Pagina` (`id_pagina`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_historial_pagina_usuario`
    FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `KPI` (
  `id_kpi` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT,
  `formula` TEXT,
  `valor_meta` DECIMAL(18,4) NOT NULL,
  `id_proyecto` INT NOT NULL,
  `id_estado_kpi` INT NOT NULL,
  `id_unidad_medida` INT,
  PRIMARY KEY (`id_kpi`),
  KEY `idx_kpi_proyecto` (`id_proyecto`),
  KEY `idx_kpi_estado` (`id_estado_kpi`),
  KEY `idx_kpi_unidad_medida` (`id_unidad_medida`),
  CONSTRAINT `chk_kpi_valor_meta` CHECK (`valor_meta` > 0),
  CONSTRAINT `fk_kpi_proyecto`
    FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_kpi_estado`
    FOREIGN KEY (`id_estado_kpi`) REFERENCES `EstadoKPI` (`id_estado_kpi`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_kpi_unidad_medida`
    FOREIGN KEY (`id_unidad_medida`) REFERENCES `UnidadMedida` (`id_unidad_medida`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ResultadoKPI` (
  `id_resultado_kpi` INT NOT NULL AUTO_INCREMENT,
  `valor` DECIMAL(18,4) NOT NULL,
  `fecha_resultado` DATETIME NOT NULL,
  `fecha_carga` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `metadatos` JSON,
  `id_kpi` INT NOT NULL,
  `id_archivo_usuario` INT NOT NULL,
  `id_usuario_registro` INT,
  PRIMARY KEY (`id_resultado_kpi`),
  UNIQUE KEY `uq_resultado_kpi_fecha` (`id_kpi`, `fecha_resultado`),
  KEY `idx_resultado_kpi_archivo` (`id_archivo_usuario`),
  KEY `idx_resultado_kpi_usuario` (`id_usuario_registro`),
  CONSTRAINT `fk_resultado_kpi_kpi`
    FOREIGN KEY (`id_kpi`) REFERENCES `KPI` (`id_kpi`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_resultado_kpi_archivo`
    FOREIGN KEY (`id_archivo_usuario`) REFERENCES `ArchivoUsuario` (`id_archivo_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_resultado_kpi_usuario`
    FOREIGN KEY (`id_usuario_registro`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Publicacion` (
  `id_publicacion` INT NOT NULL AUTO_INCREMENT,
  `contenido` TEXT NOT NULL,
  `fecha_publicacion` DATETIME,
  `id_usuario` INT NOT NULL,
  `id_proyecto` INT NOT NULL,
  `id_estado_publicacion` INT NOT NULL,
  PRIMARY KEY (`id_publicacion`),
  KEY `idx_publicacion_usuario` (`id_usuario`),
  KEY `idx_publicacion_proyecto_fecha` (`id_proyecto`, `fecha_publicacion`),
  KEY `idx_publicacion_estado` (`id_estado_publicacion`),
  CONSTRAINT `fk_publicacion_usuario`
    FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_publicacion_proyecto`
    FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_publicacion_estado`
    FOREIGN KEY (`id_estado_publicacion`)
    REFERENCES `EstadoPublicacion` (`id_estado_publicacion`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `PublicacionArchivo` (
  `id_publicacion` INT NOT NULL,
  `id_archivo_usuario` INT NOT NULL,
  `orden` INT NOT NULL,
  PRIMARY KEY (`id_publicacion`, `id_archivo_usuario`),
  UNIQUE KEY `uq_publicacion_archivo_orden` (`id_publicacion`, `orden`),
  KEY `idx_publicacion_archivo_archivo` (`id_archivo_usuario`),
  CONSTRAINT `chk_publicacion_archivo_orden` CHECK (`orden` >= 0),
  CONSTRAINT `fk_publicacion_archivo_publicacion`
    FOREIGN KEY (`id_publicacion`) REFERENCES `Publicacion` (`id_publicacion`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_publicacion_archivo_archivo`
    FOREIGN KEY (`id_archivo_usuario`) REFERENCES `ArchivoUsuario` (`id_archivo_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Evento` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `descripcion` TEXT,
  `fecha_realizacion` DATETIME NOT NULL,
  `fecha_publicacion` DATETIME,
  `id_usuario_creador` INT NOT NULL,
  `id_proyecto` INT NOT NULL,
  `id_estado_evento` INT NOT NULL,
  PRIMARY KEY (`id_evento`),
  KEY `idx_evento_usuario_creador` (`id_usuario_creador`),
  KEY `idx_evento_proyecto_fecha` (`id_proyecto`, `fecha_realizacion`),
  KEY `idx_evento_estado` (`id_estado_evento`),
  CONSTRAINT `fk_evento_usuario_creador`
    FOREIGN KEY (`id_usuario_creador`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_evento_proyecto`
    FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_evento_estado`
    FOREIGN KEY (`id_estado_evento`) REFERENCES `EstadoEvento` (`id_estado_evento`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Testimonio` (
  `id_testimonio` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `contenido` TEXT NOT NULL,
  `fecha_revision` DATETIME,
  `id_usuario` INT NOT NULL,
  `id_usuario_revisor` INT,
  `id_proyecto` INT NOT NULL,
  `id_estado_testimonio` INT NOT NULL,
  PRIMARY KEY (`id_testimonio`),
  KEY `idx_testimonio_usuario` (`id_usuario`),
  KEY `idx_testimonio_usuario_revisor` (`id_usuario_revisor`),
  KEY `idx_testimonio_proyecto_fecha` (`id_proyecto`, `fecha`),
  KEY `idx_testimonio_estado` (`id_estado_testimonio`),
  CONSTRAINT `chk_testimonio_fecha_revision`
    CHECK (`fecha_revision` IS NULL OR `fecha_revision` >= `fecha`),
  CONSTRAINT `fk_testimonio_usuario`
    FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_testimonio_usuario_revisor`
    FOREIGN KEY (`id_usuario_revisor`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_testimonio_proyecto`
    FOREIGN KEY (`id_proyecto`) REFERENCES `Proyecto` (`id_proyecto`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_testimonio_estado`
    FOREIGN KEY (`id_estado_testimonio`)
    REFERENCES `EstadoTestimonio` (`id_estado_testimonio`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `UsuarioEvento` (
  `id_usuario` INT NOT NULL,
  `id_evento` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_evento`),
  KEY `idx_usuario_evento_evento` (`id_evento`),
  CONSTRAINT `fk_usuario_evento_usuario`
    FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_evento_evento`
    FOREIGN KEY (`id_evento`) REFERENCES `Evento` (`id_evento`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE `Proyecto`
  ADD CONSTRAINT `fk_proyecto_pagina_home`
    FOREIGN KEY (`id_pagina_home`) REFERENCES `Pagina` (`id_pagina`)
    ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO Rol (codigo, nombre, descripcion) VALUES
  ('ADMIN', 'Administrador', 'Usuario con todos los privilegios, 
  tiene acceso a todas las vistas y puede modificar cualquier parte del sistema.'),
  ('LIDER', 'Líder de proyecto', 'Usuario con privilegios, puede administrar 
  proyectos y añadir/modificar/eliminar secciones y páginas de su proyecto.'),
  ('USUARIO', 'Usuario', 'Usuario sin privilegios que hace uso de la página y puede
  ver los contenidos publicados en toda la página.');

INSERT INTO EstadoValidacionUsuario (codigo, nombre, descripcion) VALUES
  ('PENDIENTE', 'Pendiente', 'El usuario se registró, pero aún no ha sido validado por un administrador.'),
  ('VALIDADO', 'Validado', 'El usuario fue revisado y aprobado para participar en la plataforma, o el 
  rol seleccionado por el usuario no requiere validación.'),
  ('RECHAZADO', 'Rechazado', 'La solicitud de validación del usuario fue revisada y no fue aprobada.');

INSERT INTO EstadoCuentaUsuario (codigo, nombre, descripcion) VALUES
  ('ACTIVA', 'Cuenta activa', 'Cuenta con actividad.'),
  ('INACTIVA', 'Cuenta inactiva', 'Cuenta sin actividad, 
  se requiere autenticación de cuenta para reactivar.'),
  ('SUSPENDIDA', 'Cuenta suspendida', 'Usuario que fue 
  suspendido por un administrador. Ya no puede acceder de nuevo al sistema.');

INSERT INTO EstadoProyecto (codigo, nombre, descripcion) VALUES
  ('ACTIVO', 'Proyecto activo', 'Proyecto creado y publicado.'),
  ('INACTIVO', 'Proyecto inactivo', 'Proyecto terminó su periodo 
  de actividad o tiene baja temporal.');

INSERT INTO EstadoPagina (codigo, nombre, descripcion) VALUES
  ('BORRADOR', 'Borrador', 'Página en edición que aún no es visible para el público.'),
  ('PUBLICADA', 'Publicada', 'Página visible para los usuarios de la plataforma.'),
  ('ARCHIVADA', 'Archivada', 'Página retirada de la navegación principal, conservada como histórico.');

INSERT INTO EstadoKPI (codigo, nombre, descripcion) VALUES
  ('ACTIVO', 'Activo', 'KPI vigente y disponible para registro y seguimiento de resultados.'),
  ('INACTIVO', 'Inactivo', 'KPI que ya no se utiliza para seguimiento, pero se conserva como histórico.'),
  ('ARCHIVADO', 'Archivado', 'KPI retirado de la vista principal.');

INSERT INTO EstadoPublicacion (codigo, nombre, descripcion) VALUES
  ('PUBLICADA', 'Publicada', 'Publicación visible para los usuarios de la plataforma.'),
  ('PROGRAMADA', 'Programada', 'Publicación configurada para mostrarse en una fecha posterior.'),
  ('PASADA', 'Pasada', 'Publicación cuya fecha de vigencia o publicación ya concluyó.');

INSERT INTO EstadoEvento (codigo, nombre, descripcion) VALUES
  ('ACTIVO', 'Activo', 'Evento vigente y disponible para consulta o participación.'),
  ('PROGRAMADO', 'Programado', 'Evento configurado para realizarse en una fecha posterior.'),
  ('PUBLICADO', 'Publicado', 'Evento visible para los usuarios de la plataforma.'),
  ('PASADO', 'Pasado', 'Evento cuya fecha de realización ya concluyó.'),
  ('CANCELADO', 'Cancelado', 'Evento que fue cancelado y ya no se realizará.');

INSERT INTO EstadoTestimonio (codigo, nombre, descripcion) VALUES
  ('PENDIENTE', 'Pendiente', 'Testimonio enviado y pendiente de revisión.'),
  ('APROBADO', 'Aprobado', 'Testimonio revisado y aprobado para mostrarse en la plataforma.'),
  ('RECHAZADO', 'Rechazado', 'Testimonio revisado y no aprobado para mostrarse en la plataforma.');

INSERT INTO TipoBloque (codigo, nombre, descripcion) VALUES
  ('TEXTO', 'Texto', 'Bloques para contenido textual, títulos, párrafos y texto enriquecido.'),
  ('IMAGEN', 'Imagen', 'Bloques para mostrar imágenes individuales con configuración visual.'),
  ('GALERIA', 'Galería', 'Bloques para mostrar múltiples imágenes o archivos visuales.'),
  ('VIDEO', 'Video', 'Bloques para insertar o mostrar contenido de video.'),
  ('KPI', 'KPI', 'Bloques para mostrar indicadores, métricas o resultados de impacto.'),
  ('GRAFICA', 'Gráfica', 'Bloques para visualizar datos mediante gráficas.'),
  ('TESTIMONIO', 'Testimonio', 'Bloques para mostrar testimonios aprobados.'),
  ('EVENTO', 'Evento', 'Bloques para mostrar eventos relacionados con un proyecto.'),
  ('PUBLICACION', 'Publicación', 'Bloques para mostrar publicaciones o noticias.'),
  ('CTA', 'Llamado a la acción', 'Bloques para invitar al usuario a realizar una acción específica.'),
  ('ARCHIVO', 'Archivo', 'Bloques para mostrar o descargar documentos y recursos.');

INSERT INTO TipoArchivo (codigo, nombre, descripcion) VALUES
  ('IMAGEN', 'Imagen', 'Archivo visual como fotografía, ilustración o gráfico.'),
  ('DOCUMENTO', 'Documento', 'Archivo documental como PDF, Word o presentación.'),
  ('VIDEO', 'Video', 'Archivo o recurso audiovisual en formato de video.'),
  ('AUDIO', 'Audio', 'Archivo sonoro como grabación, entrevista o narración.'),
  ('DATASET', 'Dataset', 'Archivo de datos usado para análisis, reportes o visualizaciones.');

INSERT INTO TipoPagina (codigo, nombre, descripcion) VALUES
  ('HOME', 'Home', 'Página principal de un proyecto.'),
  ('CONTENIDO', 'Contenido', 'Página general para presentar información editable mediante bloques.'),
  ('LISTADO', 'Listado', 'Página para mostrar colecciones de elementos como publicaciones, eventos o testimonios.'),
  ('DETALLE', 'Detalle', 'Página para mostrar información detallada de un elemento específico.'),
  ('ARTICULO', 'Artículo', 'Página de contenido editorial o narrativo, como noticias, historias o reportajes.');

INSERT INTO TipoAccionHistorial (codigo, nombre, descripcion) VALUES
  ('CREACION', 'Creación', 'Registro inicial de una página o contenido.'),
  ('EDICION', 'Edición', 'Modificación de contenido, configuración o estructura de una página.'),
  ('PUBLICACION', 'Publicación', 'Cambio que hace visible una página o contenido para los usuarios.'),
  ('ARCHIVADO', 'Archivado', 'Retiro de una página o contenido de la vista principal.');

INSERT INTO UnidadMedida (codigo, nombre, simbolo, descripcion) VALUES
  ('PERSONA', 'Persona', 'personas', 'Conteo de personas beneficiadas, participantes o atendidas.'),
  ('HORA', 'Hora', 'h', 'Tiempo medido en horas.'),
  ('PORCENTAJE', 'Porcentaje', '%', 'Proporción expresada como porcentaje.'),
  ('PESO_MXN', 'Peso mexicano', 'MXN', 'Monto monetario expresado en pesos mexicanos.'),
  ('EVENTO', 'Evento', 'eventos', 'Conteo de eventos realizados.'),
  ('TALLER', 'Taller', 'talleres', 'Conteo de talleres impartidos.'),
  ('DOCUMENTO', 'Documento', 'documentos', 'Conteo de documentos, reportes o materiales generados.'),
  ('KILOGRAMO', 'Kilogramo', 'kg', 'Peso o cantidad física medida en kilogramos.');

  
USE `hub_solidario`;

-- ─── Categoría ────────────────────────────────────────────────────────────────

CREATE TABLE `Categoria` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `codigo`       VARCHAR(100) NOT NULL,
  `nombre`       VARCHAR(255) NOT NULL,
  `color`        VARCHAR(7)   NOT NULL DEFAULT '#6B7280',
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `uq_categoria_codigo` (`codigo`),
  UNIQUE KEY `uq_categoria_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Categoria` (codigo, nombre, color) VALUES
  ('ALIMENTACION',  'Alimentación y Nutrición',       '#16A34A'),
  ('EDUCACION',     'Educación y Tutorías',            '#0EA5E9'),
  ('MEDIO_AMBIENTE','Medio Ambiente',                  '#059669'),
  ('SALUD',         'Salud y Bienestar',               '#E11D48'),
  ('CONSTRUCCION',  'Construcción y Vivienda',         '#F05A28'),
  ('TECNOLOGIA',    'Tecnología e Inclusión Digital',  '#7C3AED'),
  ('ARTE',          'Arte y Cultura',                  '#DB2777');

-- ─── Campos adicionales en Proyecto ───────────────────────────────────────────

ALTER TABLE `Proyecto`
  ADD COLUMN `ubicacion`    VARCHAR(255) AFTER `imagen`,
  ADD COLUMN `about`        TEXT         AFTER `ubicacion`,
  ADD COLUMN `objetivos`    JSON         AFTER `about`,
  ADD COLUMN `comunidad`    TEXT         AFTER `objetivos`,
  ADD COLUMN `operacion`    JSON         AFTER `comunidad`,
  ADD COLUMN `id_categoria`    INT       AFTER `operacion`,
  ADD COLUMN `id_usuario_lider` INT      AFTER `id_categoria`,
  ADD CONSTRAINT `fk_proyecto_categoria`
    FOREIGN KEY (`id_categoria`) REFERENCES `Categoria` (`id_categoria`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_proyecto_usuario_lider`
    FOREIGN KEY (`id_usuario_lider`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE SET NULL ON UPDATE CASCADE;

-- ─── Campos adicionales en Testimonio ─────────────────────────────────────────
-- Permite indicar el tipo de participante (Voluntario, Beneficiario, etc.)
-- y hace el usuario opcional para testimonios anónimos

ALTER TABLE `Testimonio`
  ADD COLUMN `tipo_participante` VARCHAR(50) AFTER `contenido`,
  ADD COLUMN `nombre_publico`    VARCHAR(255) AFTER `tipo_participante`,
  MODIFY COLUMN `id_usuario` INT NULL;

-- ─── Campos adicionales en Usuario ────────────────────────────────────────────

ALTER TABLE `Usuario`
  ADD COLUMN `foto_perfil` VARCHAR(255) AFTER `contrasena`,
  ADD COLUMN `about`     TEXT         AFTER `foto_perfil`,
  ADD COLUMN `telefono`  VARCHAR(30)  AFTER `about`,
  ADD COLUMN `linktree`  VARCHAR(255) AFTER `telefono`,
  ADD COLUMN `instagram` VARCHAR(100) AFTER `linktree`,
  ADD COLUMN `linkedin`  VARCHAR(100) AFTER `instagram`;
USE `hub_solidario`;

-- ─── Usuarios líderes de los 15 proyectos de ejemplo ─────────────────────────
-- Contraseña por defecto: "solidario123" (hash bcrypt)

SET @hash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

INSERT INTO `Usuario` (nombre, email, contrasena, id_rol, id_estado_validacion_usuario, id_estado_cuenta_usuario) VALUES
  ('María González',        'maria.gonzalez@hub.mx',     @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Carlos Ramírez',        'carlos.ramirez@hub.mx',     @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Ana Martínez',          'ana.martinez@hub.mx',       @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Dr. Luis Torres',       'luis.torres@hub.mx',        @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Roberto Sánchez',       'roberto.sanchez@hub.mx',    @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Ing. Fernanda López',   'fernanda.lopez@hub.mx',     @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Diana Herrera',         'diana.herrera@hub.mx',      @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Psic. Claudia Vega',    'claudia.vega@hub.mx',       @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Prof. Miguel Ángel Ruiz','miguel.ruiz@hub.mx',       @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Sofía Ramos',           'sofia.ramos@hub.mx',        @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Tomás Guerrero',        'tomas.guerrero@hub.mx',     @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Patricia Morales',      'patricia.morales@hub.mx',   @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Rosa Elena Fuentes',    'rosa.fuentes@hub.mx',       @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Biol. Jorge Espinoza',  'jorge.espinoza@hub.mx',     @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA')),
  ('Dra. Valeria Soto',     'valeria.soto@hub.mx',       @hash, (SELECT id_rol FROM Rol WHERE codigo='LIDER'), (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'), (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA'));

-- ─── Usuario administrador ────────────────────────────────────────────────────
INSERT INTO `Usuario` (nombre, email, contrasena, id_rol, id_estado_validacion_usuario, id_estado_cuenta_usuario) VALUES
  ('Administrador', 'admin@hub.mx', @hash,
   (SELECT id_rol FROM Rol WHERE codigo='ADMIN'),
   (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo='VALIDADO'),
   (SELECT id_estado_cuenta_usuario FROM EstadoCuentaUsuario WHERE codigo='ACTIVA'));

-- ─── Estado activo para proyectos ────────────────────────────────────────────
SET @activo = (SELECT id_estado_proyecto FROM EstadoProyecto WHERE codigo = 'ACTIVO');

-- ─── 15 Proyectos de ejemplo ──────────────────────────────────────────────────

INSERT INTO `Proyecto` (nombre, descripcion, imagen, ubicacion, about, objetivos, comunidad, operacion, id_estado_proyecto, id_categoria, id_usuario_lider) VALUES
(
  'Banco de Alimentos Universitario',
  'Recolección y distribución de alimentos para familias de la comunidad universitaria en situación vulnerable. Cada semana repartimos más de 200 despensas a quienes más lo necesitan.',
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80',
  'Campus Norte',
  'El Banco de Alimentos Universitario nació en 2019 como respuesta a la inseguridad alimentaria dentro y alrededor del campus. Trabajamos junto a estudiantes, docentes y empresas locales para recuperar alimentos en buen estado y distribuirlos a familias que lo necesitan.',
  '["Recolectar y distribuir más de 200 despensas semanales a familias vulnerables","Reducir el desperdicio de alimentos en el campus universitario","Crear una red de donantes locales y empresas comprometidas con la comunidad","Fomentar la conciencia sobre la seguridad alimentaria entre estudiantes"]',
  'Atendemos principalmente a familias de colonias populares aledañas al campus, incluyendo trabajadores informales, adultos mayores en situación de abandono y madres solteras con hijos menores. Contamos con un padrón activo de 520 beneficiarios directos.',
  '{"schedule":"Lunes a Viernes\\n8:00 - 18:00 hrs","locations":"2 centros de acopio\\nCampus Norte","participation":"Voluntariado abierto\\nDonaciones en especie"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='ALIMENTACION'),
  (SELECT id_usuario FROM Usuario WHERE email='maria.gonzalez@hub.mx')
),
(
  'Tutorías Académicas Gratuitas',
  'Apoyo educativo personalizado para niños y jóvenes de comunidades con bajos recursos. Ofrecemos clases de matemáticas, español, inglés y ciencias con voluntarios universitarios.',
  'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&q=80',
  'Comunidad San Pedro',
  'Tutorías Académicas Gratuitas surgió en 2020 para cerrar la brecha educativa en comunidades marginadas. Nuestros voluntarios universitarios dedican tiempo cada semana para reforzar conocimientos y acompañar a los estudiantes en su trayectoria escolar.',
  '["Brindar apoyo educativo gratuito a 300 niños y jóvenes por ciclo escolar","Mejorar el promedio académico de los estudiantes participantes en al menos 1.5 puntos","Prevenir la deserción escolar en zonas de alta vulnerabilidad","Capacitar a voluntarios universitarios en técnicas de enseñanza efectiva"]',
  'Servimos a niños y jóvenes de primaria y secundaria de la Comunidad San Pedro, una zona periurbana con acceso limitado a escuelas de calidad.',
  '{"schedule":"Lunes a Sábado\\n14:00 - 18:00 hrs","locations":"3 salones habilitados\\nComunidad San Pedro","participation":"Voluntariado universitario\\nInscripción gratuita"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='EDUCACION'),
  (SELECT id_usuario FROM Usuario WHERE email='carlos.ramirez@hub.mx')
),
(
  'Limpieza de Espacios Naturales',
  'Jornadas de limpieza y reforestación en parques, playas y áreas verdes urbanas. Hemos recuperado más de 15 espacios públicos y plantado 800 árboles nativos.',
  'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900&q=80',
  'Playa del Carmen',
  'Limpieza de Espacios Naturales es una iniciativa ciudadana que moviliza a voluntarios para recuperar parques, playas y áreas verdes degradadas. Combinamos la acción directa con talleres de educación ambiental para generar conciencia duradera.',
  '["Recuperar y mantener limpios 20 espacios naturales en la región","Plantar 1,000 árboles nativos en zonas degradadas","Sensibilizar a la comunidad sobre el cuidado del medio ambiente","Reducir la basura en espacios públicos en un 40%"]',
  'Trabajamos con comunidades costeras, familias de colonias aledañas a parques urbanos y escuelas primarias que participan como co-gestores de los espacios recuperados.',
  '{"schedule":"Sábados y Domingos\\n7:00 - 13:00 hrs","locations":"15+ espacios recuperados\\nPlaya del Carmen","participation":"Voluntariado abierto\\nActividades familiares"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='MEDIO_AMBIENTE'),
  (SELECT id_usuario FROM Usuario WHERE email='ana.martinez@hub.mx')
),
(
  'Brigadas de Salud Comunitaria',
  'Servicios médicos básicos, vacunación y campañas de prevención en comunidades rurales sin acceso a atención médica formal. Atendemos más de 300 pacientes por mes.',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80',
  'Comunidad Rural',
  'Las Brigadas de Salud Comunitaria llevan atención médica de calidad a comunidades rurales aisladas que carecen de acceso a servicios de salud formales. Con médicos, enfermeros y promotores de salud voluntarios, organizamos jornadas médicas integrales.',
  '["Atender a 400 pacientes mensuales en comunidades sin acceso a salud","Vacunar al 80% de la población infantil en zonas de cobertura","Capacitar a 50 promotores de salud comunitaria","Reducir la tasa de enfermedades prevenibles en zonas atendidas"]',
  'Servimos a comunidades rurales de difícil acceso, principalmente adultos mayores, niños y mujeres embarazadas que no tienen opciones de atención médica a menos de 2 horas de distancia.',
  '{"schedule":"Jueves y Viernes\\n8:00 - 17:00 hrs","locations":"5 comunidades rurales\\nZona serrana","participation":"Voluntariado médico\\nDonación de medicamentos"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='SALUD'),
  (SELECT id_usuario FROM Usuario WHERE email='luis.torres@hub.mx')
),
(
  'Construcción de Viviendas Dignas',
  'Proyecto de construcción y mejoramiento de viviendas para familias en situación de vulnerabilidad extrema. En el último año hemos edificado 18 hogares con materiales de calidad.',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
  'Colonia Esperanza',
  'Construcción de Viviendas Dignas trabaja para garantizar que todas las familias tengan un techo seguro. Junto a voluntarios con y sin experiencia en construcción, edificamos y mejoramos viviendas para familias en situación de pobreza extrema.',
  '["Construir 25 viviendas nuevas para familias sin hogar digno en el año","Mejorar 40 viviendas existentes con reparaciones estructurales urgentes","Garantizar acceso a agua potable y saneamiento en cada hogar intervenido","Capacitar a beneficiarios en mantenimiento básico del hogar"]',
  'Trabajamos en la Colonia Esperanza, una zona periurbana con alta concentración de familias en pobreza extrema. Priorizamos familias con menores de edad y adultos mayores.',
  '{"schedule":"Sábados y Domingos\\n7:00 - 16:00 hrs","locations":"Colonia Esperanza\\nZona periurbana","participation":"Voluntariado abierto\\nDonación de materiales"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='CONSTRUCCION'),
  (SELECT id_usuario FROM Usuario WHERE email='roberto.sanchez@hub.mx')
),
(
  'Alfabetización Digital para Adultos',
  'Capacitación en tecnología, internet y herramientas digitales para adultos mayores y personas sin acceso previo. Más de 120 participantes certificados hasta la fecha.',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80',
  'Centro Comunitario',
  'Alfabetización Digital para Adultos cierra la brecha tecnológica para personas mayores y adultos sin educación digital. Enseñamos desde el uso del smartphone hasta videollamadas, trámites en línea y prevención de fraudes digitales.',
  '["Certificar a 200 adultos mayores en competencias digitales básicas","Enseñar el uso seguro de internet, redes sociales y trámites en línea","Reducir el aislamiento social a través de la comunicación digital","Capacitar a instructores voluntarios en andragogía y alfabetización digital"]',
  'Servimos a adultos mayores de 60 años y más, así como a adultos de cualquier edad sin acceso previo a tecnología, provenientes de colonias populares del municipio.',
  '{"schedule":"Martes y Jueves\\n10:00 - 13:00 hrs","locations":"2 centros comunitarios\\nMunicipio centro","participation":"Clases gratuitas\\nPréstamo de equipos"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='TECNOLOGIA'),
  (SELECT id_usuario FROM Usuario WHERE email='fernanda.lopez@hub.mx')
),
(
  'Huertos Urbanos Comunitarios',
  'Diseño, instalación y mantenimiento de huertos orgánicos en azoteas y espacios urbanos. Promovemos la soberanía alimentaria, el compostaje y la agricultura sostenible.',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80',
  'Parque Central',
  'Huertos Urbanos Comunitarios lleva la producción de alimentos frescos y saludables al corazón de la ciudad. Instalamos huertos en azoteas, patios y espacios comunitarios, enseñando a las familias a cultivar sus propios alimentos de forma orgánica y sostenible.',
  '["Instalar 30 huertos urbanos en hogares y espacios comunitarios","Capacitar a 150 familias en técnicas de agricultura urbana orgánica","Producir 2 toneladas de alimentos frescos por ciclo","Implementar sistemas de compostaje en cada huerto"]',
  'Trabajamos con familias de colonias densamente urbanizadas sin acceso a espacios verdes ni alimentos frescos asequibles. Especial enfoque en madres de familia y adultos mayores.',
  '{"schedule":"Miércoles y Sábados\\n8:00 - 12:00 hrs","locations":"22 huertos activos\\nZona urbana","participation":"Talleres gratuitos\\nSemillas donadas"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='MEDIO_AMBIENTE'),
  (SELECT id_usuario FROM Usuario WHERE email='diana.herrera@hub.mx')
),
(
  'Centro de Apoyo Psicológico',
  'Atención psicológica gratuita e individual para personas en situación de vulnerabilidad. Contamos con profesionales certificados, grupos de apoyo y talleres de bienestar mental.',
  'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&q=80',
  'Clínica Comunitaria',
  'El Centro de Apoyo Psicológico ofrece atención de salud mental gratuita y de calidad a personas que no pueden costear servicios privados. Con un equipo de psicólogos clínicos voluntarios, brindamos consultas individuales, terapia de grupo y talleres de mindfulness.',
  '["Brindar 500 consultas psicológicas gratuitas por trimestre","Operar 4 grupos de apoyo semanales para distintas problemáticas","Capacitar a la comunidad en primeros auxilios psicológicos","Reducir el estigma sobre la salud mental en las comunidades atendidas"]',
  'Atendemos a personas adultas en situación de vulnerabilidad: víctimas de violencia, personas con depresión y ansiedad sin recursos, jóvenes en riesgo y adultos mayores en aislamiento.',
  '{"schedule":"Lunes a Viernes\\n9:00 - 18:00 hrs","locations":"1 clínica comunitaria\\nZona centro","participation":"Citas gratuitas\\nGrupos abiertos"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='SALUD'),
  (SELECT id_usuario FROM Usuario WHERE email='claudia.vega@hub.mx')
),
(
  'Biblioteca Comunitaria Móvil',
  'Llevamos libros, cuentos y material didáctico a comunidades sin acceso a bibliotecas. Organizamos clubes de lectura infantil y talleres de escritura creativa para todas las edades.',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80',
  'Barrio Sur',
  'La Biblioteca Comunitaria Móvil lleva el amor por la lectura a donde más se necesita. Con una unidad equipada con más de 2,000 títulos, recorremos colonias y comunidades rurales llevando libros prestados gratuitamente.',
  '["Prestar más de 500 libros mensuales en comunidades sin biblioteca","Mantener 6 clubes de lectura infantil activos de forma simultánea","Promover la escritura creativa en jóvenes de comunidades marginadas","Crear 3 bibliotecas fijas en escuelas de la zona"]',
  'Servimos a niños y jóvenes del Barrio Sur y colonias aledañas, así como a comunidades rurales en días de visita especial.',
  '{"schedule":"Martes a Sábado\\n10:00 - 17:00 hrs","locations":"8 puntos de visita\\nBarrio Sur y periurbano","participation":"Préstamo gratuito\\nClubs abiertos"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='EDUCACION'),
  (SELECT id_usuario FROM Usuario WHERE email='miguel.ruiz@hub.mx')
),
(
  'Taller de Arte y Expresión Joven',
  'Talleres semanales de pintura, teatro, música y fotografía para jóvenes en zonas de riesgo. El arte como herramienta de transformación social, prevención y desarrollo personal.',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80',
  'Centro Cultural',
  'El Taller de Arte y Expresión Joven usa el arte como herramienta poderosa de transformación social. Ofrecemos talleres gratuitos de pintura, teatro, música y fotografía para jóvenes de 12 a 22 años en zonas con alta incidencia de violencia y deserción escolar.',
  '["Mantener 200 jóvenes activos en talleres artísticos de forma continua","Realizar 4 exposiciones y presentaciones públicas por año","Usar el arte como prevención de violencia y adicciones","Vincular a jóvenes talentosos con oportunidades de becas y empleos culturales"]',
  'Trabajamos con jóvenes de 12 a 22 años en zonas de alta marginación con escasa oferta cultural. El 40% de nuestros participantes son jóvenes que abandonaron la escuela.',
  '{"schedule":"Lunes a Sábado\\n14:00 - 19:00 hrs","locations":"Centro Cultural\\nZona norte","participation":"Talleres gratuitos\\nMateriales incluidos"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='ARTE'),
  (SELECT id_usuario FROM Usuario WHERE email='sofia.ramos@hub.mx')
),
(
  'Red de Reciclaje Escolar',
  'Programa integral de separación, recolección y reciclaje de residuos en escuelas primarias y secundarias. Hemos evitado el envío de más de 5 toneladas de basura al vertedero este ciclo.',
  'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80',
  'Escuelas Municipales',
  'La Red de Reciclaje Escolar transforma a las escuelas en agentes de cambio ambiental. Implementamos programas completos de separación de residuos, educación ambiental y recolección periódica en escuelas primarias y secundarias.',
  '["Implementar el programa en 25 escuelas del municipio","Capacitar a 2,000 estudiantes como promotores ambientales","Evitar el envío de 10 toneladas de residuos al vertedero en el ciclo","Instalar estaciones de reciclaje en cada escuela participante"]',
  'Trabajamos con la comunidad educativa: estudiantes, docentes y padres de familia de escuelas públicas del municipio.',
  '{"schedule":"Visitas semanales\\nDías hábiles escolares","locations":"18 escuelas activas\\nMunicipio completo","participation":"Brigadas escolares\\nPadres de familia"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='MEDIO_AMBIENTE'),
  (SELECT id_usuario FROM Usuario WHERE email='tomas.guerrero@hub.mx')
),
(
  'Emprendimiento Social Femenino',
  'Capacitación en habilidades empresariales, finanzas y mercadeo para mujeres en situación de vulnerabilidad. Hemos apoyado el lanzamiento de 35 microempresas en la región.',
  'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=900&q=80',
  'Cooperativa Local',
  'Emprendimiento Social Femenino empodera a mujeres en situación de vulnerabilidad para que desarrollen sus propios negocios sostenibles. Ofrecemos capacitaciones en administración, finanzas personales, marketing digital y acceso a crédito.',
  '["Lanzar 50 microempresas lideradas por mujeres en la región","Capacitar a 200 mujeres en habilidades empresariales básicas","Conectar a emprendedoras con redes de financiamiento y mercados","Lograr que el 60% de las microempresas sean autosustentables al año"]',
  'Servimos a mujeres de 20 a 55 años en situación de vulnerabilidad económica, muchas de ellas jefas de hogar sin ingresos formales.',
  '{"schedule":"Martes y Jueves\\n10:00 - 14:00 hrs","locations":"Cooperativa Local\\nZona sur","participation":"Talleres gratuitos\\nMentoría personalizada"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='EDUCACION'),
  (SELECT id_usuario FROM Usuario WHERE email='patricia.morales@hub.mx')
),
(
  'Cocinas Comunitarias Solidarias',
  'Red de cocinas barriales que preparan comidas nutritivas para adultos mayores y familias en situación de pobreza alimentaria. Servimos más de 500 porciones diarias.',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
  'Barrio Tepito',
  'Cocinas Comunitarias Solidarias nació en 2020 como respuesta a la crisis alimentaria agravada por la pandemia. Operamos tres cocinas comunitarias en el Barrio Tepito que sirven más de 500 comidas diarias, preparadas con ingredientes frescos y nutritivos.',
  '["Proporcionar al menos una comida nutritiva diaria a 500 familias en situación vulnerable","Crear espacios de encuentro comunitario que fortalezcan el tejido social","Educar sobre nutrición y hábitos alimenticios saludables","Generar oportunidades de voluntariado y participación ciudadana"]',
  'El proyecto atiende principalmente a familias de colonias populares en la zona oriente, incluyendo adultos mayores en condición de abandono, madres solteras con hijos pequeños y trabajadores informales.',
  '{"schedule":"Lunes a Domingo\\n12:00 - 15:00 hrs","locations":"3 comedores activos\\nZona oriente","participation":"Voluntariado abierto\\nDonaciones en especie"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='ALIMENTACION'),
  (SELECT id_usuario FROM Usuario WHERE email='rosa.fuentes@hub.mx')
),
(
  'Programa de Reforestación Costera',
  'Siembra de manglares y vegetación nativa en zonas costeras degradadas. Hemos restaurado 4 km de litoral, protegiendo la biodiversidad marina y reduciendo la erosión costera.',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
  'Costa Verde',
  'El Programa de Reforestación Costera restaura ecosistemas marinos y costeros degradados a través de la siembra de manglares y vegetación nativa. Trabajamos con comunidades pesqueras, biólogos voluntarios y turistas comprometidos.',
  '["Restaurar 8 km de litoral con manglar y vegetación nativa","Sembrar 10,000 plántulas de especies nativas costeras","Involucrar a comunidades pesqueras como guardianes del ecosistema","Monitorear la recuperación de fauna marina en zonas restauradas"]',
  'Colaboramos con comunidades pesqueras locales cuyos medios de vida dependen de la salud del ecosistema costero. También participan estudiantes de biología y turistas responsables.',
  '{"schedule":"Fines de semana\\n6:00 - 13:00 hrs","locations":"4 km restaurados\\nCosta Verde","participation":"Jornadas abiertas\\nAdoción de zonas"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='MEDIO_AMBIENTE'),
  (SELECT id_usuario FROM Usuario WHERE email='jorge.espinoza@hub.mx')
),
(
  'Clínica Dental Comunitaria',
  'Atención odontológica preventiva y curativa para niños y adultos sin acceso a servicios dentales privados. Incluye extracciones, limpiezas y talleres de higiene bucal.',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=80',
  'Sector Popular',
  'La Clínica Dental Comunitaria lleva atención odontológica de calidad a comunidades sin acceso a servicios privados. Con dentistas voluntarios y equipamiento donado, ofrecemos consultas preventivas, limpiezas, extracciones y tratamientos básicos de forma completamente gratuita.',
  '["Atender a 600 pacientes anuales con servicios dentales gratuitos","Priorizar la atención infantil y preventiva para evitar problemas futuros","Capacitar a la comunidad en higiene bucal básica","Gestionar donación de equipamiento y materiales dentales de calidad"]',
  'Atendemos a niños, adultos y adultos mayores del Sector Popular sin acceso a servicios dentales privados. Muchos de nuestros pacientes nunca habían visitado al dentista antes.',
  '{"schedule":"Martes, Miércoles y Viernes\\n8:00 - 15:00 hrs","locations":"1 clínica equipada\\nSector Popular","participation":"Atención gratuita\\nCitas con registro previo"}',
  @activo,
  (SELECT id_categoria FROM Categoria WHERE codigo='SALUD'),
  (SELECT id_usuario FROM Usuario WHERE email='valeria.soto@hub.mx')
);

-- ─── Vincular líderes en ProyectoUsuario ──────────────────────────────────────

INSERT INTO `ProyectoUsuario` (id_proyecto, id_usuario)
SELECT p.id_proyecto, p.id_usuario_lider
FROM Proyecto p
WHERE p.id_usuario_lider IS NOT NULL;

-- ─── KPIs de ejemplo para el primer proyecto ─────────────────────────────────

SET @p1 = (SELECT id_proyecto FROM Proyecto WHERE nombre = 'Banco de Alimentos Universitario');
SET @activo_kpi = (SELECT id_estado_kpi FROM EstadoKPI WHERE codigo = 'ACTIVO');
SET @u_persona = (SELECT id_unidad_medida FROM UnidadMedida WHERE codigo = 'PERSONA');
SET @u_evento  = (SELECT id_unidad_medida FROM UnidadMedida WHERE codigo = 'EVENTO');

INSERT INTO `KPI` (nombre, descripcion, valor_meta, id_proyecto, id_estado_kpi, id_unidad_medida) VALUES
  ('Beneficiarios directos', 'Familias con padrón activo que reciben despensas', 600,  @p1, @activo_kpi, @u_persona),
  ('Voluntarios activos',    'Voluntarios registrados y activos en el proyecto',   50,  @p1, @activo_kpi, @u_persona),
  ('Actividades realizadas', 'Jornadas de distribución en el semestre',            70,  @p1, @activo_kpi, @u_evento),
  ('Despensas repartidas',   'Total de despensas entregadas en el proyecto',    12000,  @p1, @activo_kpi, @u_evento);

-- ─── Proyecto showcase (Centro Comunitario Integral) ─────────────────────────

UPDATE `Usuario` SET
  about     = 'Trabajadora social con 12 años de experiencia en desarrollo comunitario. Especialista en gestión de proyectos sociales y formación de voluntariado. Fundadora del Centro Comunitario Integral y apasionada por construir comunidades más justas y solidarias desde la base.',
  telefono  = '+52 55 1234 5678',
  linktree  = 'https://linktr.ee/maria.gonzalez',
  instagram = 'maria.gonzalez.social',
  linkedin  = 'maria-gonzalez-social'
WHERE email = 'maria.gonzalez@hub.mx';

INSERT INTO `Proyecto` (
  nombre, descripcion, imagen, ubicacion, about,
  objetivos, comunidad, operacion,
  porcentaje_completacion, id_estado_proyecto, id_categoria, id_usuario_lider
) VALUES (
  'Centro Comunitario Integral',
  'Espacio de transformación social que combina educación, salud, arte y tecnología para empoderar a más de 1,200 familias de la Colonia Solidaria. Un modelo replicable de desarrollo comunitario integral.',
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900&q=80',
  'Colonia Solidaria, CDMX',
  'El Centro Comunitario Integral nació en 2021 como respuesta a la necesidad de un espacio multidisciplinario que atienda de forma holística las necesidades de la comunidad. Integramos programas de educación, salud preventiva, arte y acceso a tecnología bajo un mismo techo, con el objetivo de generar un impacto duradero y sostenible en las familias de la Colonia Solidaria. En tres años de operación hemos atendido a más de 4,000 personas y formado a 120 facilitadores comunitarios.',
  '["Beneficiar a más de 1,500 personas directamente en el año en curso","Operar 8 programas comunitarios simultáneos de forma continua","Generar alianzas con al menos 10 organizaciones locales y empresas comprometidas","Lograr la autosuficiencia financiera en un 60% mediante actividades productivas propias","Capacitar y certificar a 50 voluntarios como facilitadores comunitarios certificados"]',
  'Atendemos a familias de la Colonia Solidaria y colonias aledañas, con especial énfasis en niños y jóvenes de 6 a 22 años, adultos mayores en situación de aislamiento, mujeres jefas de hogar, personas con discapacidad y trabajadores informales. Contamos con un padrón activo de más de 800 beneficiarios directos registrados y listas de espera en 4 de nuestros 8 programas.',
  '{"schedule":"Lunes a Sábado\\n7:00 - 21:00 hrs","locations":"Centro Principal\\nColonia Solidaria\\n2 módulos satélite","participation":"Voluntariado abierto\\nInscripción gratuita\\nDonaciones en especie y monetarias"}',
  72.50,
  (SELECT id_estado_proyecto FROM EstadoProyecto WHERE codigo = 'ACTIVO'),
  (SELECT id_categoria FROM Categoria WHERE codigo = 'EDUCACION'),
  (SELECT id_usuario FROM Usuario WHERE email = 'maria.gonzalez@hub.mx')
);

SET @pid    = LAST_INSERT_ID();
SET @lider  = (SELECT id_usuario FROM Usuario WHERE email = 'maria.gonzalez@hub.mx');
SET @carlos = (SELECT id_usuario FROM Usuario WHERE email = 'carlos.ramirez@hub.mx');
SET @ana    = (SELECT id_usuario FROM Usuario WHERE email = 'ana.martinez@hub.mx');
SET @sofia  = (SELECT id_usuario FROM Usuario WHERE email = 'sofia.ramos@hub.mx');
SET @diana  = (SELECT id_usuario FROM Usuario WHERE email = 'diana.herrera@hub.mx');

INSERT INTO `ProyectoUsuario` (id_proyecto, id_usuario) VALUES
  (@pid, @lider),
  (@pid, @carlos),
  (@pid, @ana),
  (@pid, @sofia),
  (@pid, @diana);

SET @activo_kpi = (SELECT id_estado_kpi    FROM EstadoKPI     WHERE codigo = 'ACTIVO');
SET @u_persona  = (SELECT id_unidad_medida FROM UnidadMedida  WHERE codigo = 'PERSONA');
SET @u_hora     = (SELECT id_unidad_medida FROM UnidadMedida  WHERE codigo = 'HORA');
SET @u_taller   = (SELECT id_unidad_medida FROM UnidadMedida  WHERE codigo = 'TALLER');

INSERT INTO `KPI` (nombre, descripcion, valor_meta, id_proyecto, id_estado_kpi, id_unidad_medida) VALUES
  ('Beneficiarios directos',   'Personas atendidas activamente en los programas del centro',     1500, @pid, @activo_kpi, @u_persona),
  ('Voluntarios certificados', 'Voluntarios formados como facilitadores comunitarios',              50, @pid, @activo_kpi, @u_persona),
  ('Talleres impartidos',      'Talleres y actividades educativas realizadas en el semestre',     120, @pid, @activo_kpi, @u_taller),
  ('Horas de servicio',        'Horas totales de servicio voluntario acumuladas en el semestre', 3000, @pid, @activo_kpi, @u_hora);

INSERT INTO `ArchivoUsuario` (ruta_archivo, id_usuario, id_tipo_archivo)
  SELECT 'uploads/showcase_indicadores_jun2024.csv', @lider,
         (SELECT id_tipo_archivo FROM TipoArchivo WHERE codigo = 'DATASET')
  WHERE NOT EXISTS (
    SELECT 1 FROM ArchivoUsuario WHERE ruta_archivo = 'uploads/showcase_indicadores_jun2024.csv'
  );

SET @archivo = (SELECT id_archivo_usuario FROM ArchivoUsuario
                WHERE ruta_archivo = 'uploads/showcase_indicadores_jun2024.csv' LIMIT 1);

SET @k1 = (SELECT id_kpi FROM KPI WHERE nombre = 'Beneficiarios directos'   AND id_proyecto = @pid);
SET @k2 = (SELECT id_kpi FROM KPI WHERE nombre = 'Voluntarios certificados' AND id_proyecto = @pid);
SET @k3 = (SELECT id_kpi FROM KPI WHERE nombre = 'Talleres impartidos'      AND id_proyecto = @pid);
SET @k4 = (SELECT id_kpi FROM KPI WHERE nombre = 'Horas de servicio'        AND id_proyecto = @pid);

-- Valores actuales (Jun 2024)
INSERT INTO `ResultadoKPI` (valor, fecha_resultado, id_kpi, id_archivo_usuario, id_usuario_registro) VALUES
  (1247, '2024-06-01 00:00:00', @k1, @archivo, @lider),
  (38,   '2024-06-01 00:00:00', @k2, @archivo, @lider),
  (89,   '2024-06-01 00:00:00', @k3, @archivo, @lider),
  (2340, '2024-06-01 00:00:00', @k4, @archivo, @lider);

-- Historial para gráficas (Oct 2023 – May 2024)
INSERT INTO `ResultadoKPI` (valor, fecha_resultado, id_kpi, id_archivo_usuario, id_usuario_registro) VALUES
  -- Beneficiarios directos (acumulado mensual)
  ( 445, '2023-10-01 00:00:00', @k1, @archivo, @lider),
  ( 510, '2023-11-01 00:00:00', @k1, @archivo, @lider),
  ( 620, '2023-12-01 00:00:00', @k1, @archivo, @lider),
  ( 710, '2024-01-01 00:00:00', @k1, @archivo, @lider),
  ( 850, '2024-02-01 00:00:00', @k1, @archivo, @lider),
  ( 960, '2024-03-01 00:00:00', @k1, @archivo, @lider),
  (1080, '2024-04-01 00:00:00', @k1, @archivo, @lider),
  (1160, '2024-05-01 00:00:00', @k1, @archivo, @lider),
  -- Talleres impartidos (acumulado mensual)
  (  8, '2023-10-01 00:00:00', @k3, @archivo, @lider),
  ( 17, '2023-11-01 00:00:00', @k3, @archivo, @lider),
  ( 29, '2023-12-01 00:00:00', @k3, @archivo, @lider),
  ( 40, '2024-01-01 00:00:00', @k3, @archivo, @lider),
  ( 54, '2024-02-01 00:00:00', @k3, @archivo, @lider),
  ( 63, '2024-03-01 00:00:00', @k3, @archivo, @lider),
  ( 74, '2024-04-01 00:00:00', @k3, @archivo, @lider),
  ( 86, '2024-05-01 00:00:00', @k3, @archivo, @lider);

SET @pub_pub = (SELECT id_estado_publicacion FROM EstadoPublicacion WHERE codigo = 'PUBLICADA');

INSERT INTO `Publicacion` (contenido, fecha_publicacion, id_usuario, id_proyecto, id_estado_publicacion) VALUES
  ('Este mes celebramos la graduación de nuestra primera generación de facilitadores comunitarios. 38 voluntarios completaron el programa intensivo de 3 meses y ya están listos para liderar talleres en sus propias colonias. Un logro enorme que marca un antes y un después en la historia del centro.', '2024-06-15 10:00:00', @lider, @pid, @pub_pub),
  ('Inauguramos nuestro nuevo laboratorio de tecnología con 20 computadoras donadas por empresas locales. Ahora podemos atender a 40 estudiantes simultáneamente en cursos de programación, diseño digital y ofimática. Las inscripciones para el próximo ciclo ya están abiertas para toda la comunidad.', '2024-05-28 14:30:00', @lider, @pid, @pub_pub),
  ('Jornada de salud preventiva: en colaboración con las Brigadas de Salud Comunitaria, realizamos 120 consultas médicas gratuitas, 85 vacunaciones y 40 pruebas de glucosa y presión arterial. Gracias a todos los voluntarios médicos que hicieron posible este día de servicio.', '2024-05-10 09:00:00', @lider, @pid, @pub_pub),
  ('Exposición de arte comunitario "Raíces": 60 jóvenes del taller de artes visuales presentaron sus obras en la plaza principal. La muestra estuvo abierta dos semanas y recibió más de 500 visitantes. El arte como herramienta de identidad y orgullo comunitario.', '2024-04-22 16:00:00', @lider, @pid, @pub_pub),
  ('Lanzamos el programa de microfinanzas comunitarias en alianza con la Cooperativa Local. Las primeras 15 mujeres emprendedoras recibieron sus créditos y están iniciando sus proyectos productivos. Seguimos construyendo economía solidaria desde la base de la comunidad.', '2024-04-05 11:00:00', @lider, @pid, @pub_pub);

SET @t_aprobado  = (SELECT id_estado_testimonio FROM EstadoTestimonio WHERE codigo = 'APROBADO');
SET @t_pendiente = (SELECT id_estado_testimonio FROM EstadoTestimonio WHERE codigo = 'PENDIENTE');
SET @t_rechazado = (SELECT id_estado_testimonio FROM EstadoTestimonio WHERE codigo = 'RECHAZADO');

INSERT INTO `Testimonio` (fecha, contenido, tipo_participante, nombre_publico, id_usuario, id_proyecto, id_estado_testimonio) VALUES
  ('2024-06-10 09:00:00', 'Gracias al centro aprendí a usar la computadora y ahora puedo hablar por videollamada con mis hijos que viven en otra ciudad. Tengo 68 años y pensé que la tecnología no era para mí, pero aquí me demostraron lo contrario. Los instructores tienen una paciencia y calidez increíbles.', 'Beneficiario', 'Doña Carmen R., 68 años', NULL, @pid, @t_aprobado),
  ('2024-06-08 11:00:00', 'Llevo 6 meses como voluntaria en el área de talleres de arte y ha sido una de las experiencias más enriquecedoras de mi vida. Ver cómo los jóvenes se transforman a través de la expresión artística es algo que no tiene precio. El equipo es extraordinario.', 'Voluntario', 'Sofía M., voluntaria de arte', NULL, @pid, @t_aprobado),
  ('2024-05-20 14:00:00', 'Mi hijo participó en el programa de tutorías y su promedio subió de 6.5 a 8.8 en un semestre. Además encontró amigos y un espacio seguro. Como mamá soltera que trabaja todo el día, saber que está aquí me da una tranquilidad enorme.', 'Beneficiario', 'Lucía F., madre de familia', NULL, @pid, @t_aprobado),
  ('2024-05-15 16:00:00', 'Soy médico retirado y encontré aquí la oportunidad de seguir siendo útil. Las jornadas de salud que organizamos mensualmente atienden a personas que de otra forma no tendrían acceso a atención médica básica. Es el voluntariado más significativo que he hecho.', 'Voluntario', 'Dr. Arturo V., médico voluntario', NULL, @pid, @t_aprobado),
  ('2024-06-18 10:00:00', 'Acabo de inscribirme al curso de emprendimiento y estoy muy emocionada. Las instalaciones son increíbles y el personal muy amable. Espero que este programa me ayude a lanzar mi negocio de repostería.', 'Beneficiario', 'Mariana G.', NULL, @pid, @t_pendiente),
  ('2024-06-17 15:00:00', 'Vine a conocer el centro y me interesa mucho el programa de microfinanzas. El proceso de registro fue un poco largo pero el equipo fue muy atento en todo momento.', 'Beneficiario', 'Roberto S.', NULL, @pid, @t_pendiente),
  ('2024-04-10 09:00:00', 'El horario de algunos talleres no es muy conveniente y a veces hay cancelaciones de último minuto sin aviso previo. Espero que mejoren la comunicación con los participantes.', 'Beneficiario', 'Anónimo', NULL, @pid, @t_rechazado);

-- ── Eventos ─────────────────────────────────────────────────────────────
SET @ev_publicado  = (SELECT id_estado_evento FROM EstadoEvento WHERE codigo = 'PUBLICADO');
SET @ev_programado = (SELECT id_estado_evento FROM EstadoEvento WHERE codigo = 'PROGRAMADO');
SET @ev_pasado     = (SELECT id_estado_evento FROM EstadoEvento WHERE codigo = 'PASADO');
SET @admin_u       = (SELECT id_usuario FROM Usuario WHERE email = 'admin@hub.mx');
SET @huertos_p     = (SELECT id_proyecto FROM Proyecto WHERE nombre = 'Huertos Urbanos Comunitarios');
SET @brigadas_p    = (SELECT id_proyecto FROM Proyecto WHERE nombre = 'Brigadas de Salud Comunitaria');
SET @tutorias_p    = (SELECT id_proyecto FROM Proyecto WHERE nombre = 'Tutorías Académicas Gratuitas');

INSERT INTO `Evento` (nombre, descripcion, fecha_realizacion, fecha_publicacion, id_usuario_creador, id_proyecto, id_estado_evento) VALUES

-- Centro Comunitario Integral
('Reunión de Voluntarios — Junio 2026',
 'Sesión mensual de coordinación con todos los voluntarios activos. Se revisarán los avances del mes y se planificarán las actividades del siguiente periodo.',
 '2026-06-05 17:00:00', '2026-05-28 00:00:00', @lider, @pid, @ev_pasado),

('Taller de Habilidades Digitales',
 'Capacitación en herramientas digitales básicas: correo electrónico, búsqueda segura en internet y uso de hojas de cálculo. Dirigido a adultos mayores de la comunidad. Cupo limitado a 20 personas.',
 '2026-06-15 10:00:00', '2026-06-01 00:00:00', @lider, @pid, @ev_publicado),

('Jornada Comunitaria de Limpieza',
 'Actividad de embellecimiento del parque principal de la Colonia Solidaria. Se dotará de materiales a todos los participantes. Punto de encuentro: entrada principal del parque a las 8:00 hrs.',
 '2026-06-22 08:00:00', '2026-06-08 00:00:00', @lider, @pid, @ev_programado),

('Noche de Cine Comunitario',
 'Proyección de película bajo las estrellas en el patio del centro. Entrada libre para toda la familia. Se proyectará "Coco" con temática de identidad y comunidad.',
 '2026-06-28 19:30:00', '2026-06-10 00:00:00', @lider, @pid, @ev_programado),

('Feria de Emprendimiento Social',
 'Exposición de proyectos comunitarios, stands de emprendedores locales y talleres rápidos de finanzas personales e innovación social. Evento abierto al público sin costo de entrada.',
 '2026-07-12 09:00:00', '2026-06-20 00:00:00', @lider, @pid, @ev_programado),

('Taller de Finanzas para el Hogar',
 'Aprende a elaborar un presupuesto familiar, reducir deudas y ahorrar de forma efectiva. Impartido por voluntarios del área financiera. Sesión de 3 horas con materiales incluidos.',
 '2026-07-19 11:00:00', '2026-06-25 00:00:00', @lider, @pid, @ev_programado),

('Ceremonia de Graduación — Beneficiarios 2026',
 'Reconocimiento a los beneficiarios que completaron los programas de capacitación del año. Contará con la presencia de autoridades locales, familias y medios de comunicación.',
 '2026-08-15 18:00:00', '2026-07-01 00:00:00', @lider, @pid, @ev_programado),

-- Huertos Urbanos Comunitarios
('Siembra Colectiva de Temporada',
 'Jornada de siembra de hortalizas de temporada en los huertos comunitarios. Aprende técnicas de cultivo orgánico y llévate plántulas para tu hogar. No se requiere experiencia previa.',
 '2026-06-21 08:00:00', '2026-06-07 00:00:00', @admin_u, @huertos_p, @ev_programado),

('Cosecha y Trueque de Productos',
 'Primera cosecha de la temporada y mercado de trueque entre vecinos. Trae tus excedentes de jardín y llévate algo nuevo. Evento familiar con música en vivo.',
 '2026-08-08 09:00:00', '2026-07-15 00:00:00', @admin_u, @huertos_p, @ev_programado),

-- Brigadas de Salud Comunitaria
('Jornada Médica Gratuita',
 'Consultas médicas generales, toma de presión arterial, glucosa y orientación nutricional sin costo. Atención por orden de llegada. Cupos disponibles: 80 personas.',
 '2026-07-05 09:00:00', '2026-06-15 00:00:00', @admin_u, @brigadas_p, @ev_programado),

-- Tutorías Académicas Gratuitas
('Entrega de Reconocimientos Académicos',
 'Ceremonia de premiación a los estudiantes destacados del ciclo escolar que participaron en el programa de tutorías. Asistencia abierta a padres de familia.',
 '2026-07-26 16:00:00', '2026-07-01 00:00:00', @admin_u, @tutorias_p, @ev_programado);
