-- ╔══════════════════════════════════════════════════════════════════════════════╗
-- ║  Hub Solidario — base de datos inicial (solo catálogos + admin)            ║
-- ║  Ejecutar desde cero: mysql -u root -p < models/hub_solidario_init.sql     ║
-- ╚══════════════════════════════════════════════════════════════════════════════╝

CREATE DATABASE IF NOT EXISTS `hub_solidario`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `hub_solidario`;

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLAS DE CATÁLOGO
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE `Rol` (
  `id_rol`      INT          NOT NULL AUTO_INCREMENT,
  `codigo`      VARCHAR(100) NOT NULL,
  `nombre`      VARCHAR(100) NOT NULL,
  `descripcion` TEXT,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `uq_rol_codigo` (`codigo`),
  UNIQUE KEY `uq_rol_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoValidacionUsuario` (
  `id_estado_validacion_usuario` INT          NOT NULL AUTO_INCREMENT,
  `codigo`                       VARCHAR(100) NOT NULL,
  `nombre`                       VARCHAR(100) NOT NULL,
  `descripcion`                  TEXT,
  PRIMARY KEY (`id_estado_validacion_usuario`),
  UNIQUE KEY `uq_estado_validacion_usuario_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_validacion_usuario_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoCuentaUsuario` (
  `id_estado_cuenta_usuario` INT          NOT NULL AUTO_INCREMENT,
  `codigo`                   VARCHAR(100) NOT NULL,
  `nombre`                   VARCHAR(100) NOT NULL,
  `descripcion`              TEXT,
  PRIMARY KEY (`id_estado_cuenta_usuario`),
  UNIQUE KEY `uq_estado_cuenta_usuario_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_cuenta_usuario_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoProyecto` (
  `id_estado_proyecto` INT          NOT NULL AUTO_INCREMENT,
  `codigo`             VARCHAR(100) NOT NULL,
  `nombre`             VARCHAR(100) NOT NULL,
  `descripcion`        TEXT,
  PRIMARY KEY (`id_estado_proyecto`),
  UNIQUE KEY `uq_estado_proyecto_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_proyecto_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoPagina` (
  `id_estado_pagina` INT          NOT NULL AUTO_INCREMENT,
  `codigo`           VARCHAR(100) NOT NULL,
  `nombre`           VARCHAR(100) NOT NULL,
  `descripcion`      TEXT,
  PRIMARY KEY (`id_estado_pagina`),
  UNIQUE KEY `uq_estado_pagina_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_pagina_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoKPI` (
  `id_estado_kpi` INT          NOT NULL AUTO_INCREMENT,
  `codigo`        VARCHAR(100) NOT NULL,
  `nombre`        VARCHAR(100) NOT NULL,
  `descripcion`   TEXT,
  PRIMARY KEY (`id_estado_kpi`),
  UNIQUE KEY `uq_estado_kpi_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_kpi_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoPublicacion` (
  `id_estado_publicacion` INT          NOT NULL AUTO_INCREMENT,
  `codigo`                VARCHAR(100) NOT NULL,
  `nombre`                VARCHAR(100) NOT NULL,
  `descripcion`           TEXT,
  PRIMARY KEY (`id_estado_publicacion`),
  UNIQUE KEY `uq_estado_publicacion_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_publicacion_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoEvento` (
  `id_estado_evento` INT          NOT NULL AUTO_INCREMENT,
  `codigo`           VARCHAR(100) NOT NULL,
  `nombre`           VARCHAR(100) NOT NULL,
  `descripcion`      TEXT,
  PRIMARY KEY (`id_estado_evento`),
  UNIQUE KEY `uq_estado_evento_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_evento_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `EstadoTestimonio` (
  `id_estado_testimonio` INT          NOT NULL AUTO_INCREMENT,
  `codigo`               VARCHAR(100) NOT NULL,
  `nombre`               VARCHAR(100) NOT NULL,
  `descripcion`          TEXT,
  PRIMARY KEY (`id_estado_testimonio`),
  UNIQUE KEY `uq_estado_testimonio_codigo` (`codigo`),
  UNIQUE KEY `uq_estado_testimonio_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TipoBloque` (
  `id_tipo_bloque` INT          NOT NULL AUTO_INCREMENT,
  `codigo`         VARCHAR(100) NOT NULL,
  `nombre`         VARCHAR(100) NOT NULL,
  `descripcion`    TEXT,
  PRIMARY KEY (`id_tipo_bloque`),
  UNIQUE KEY `uq_tipo_bloque_codigo` (`codigo`),
  UNIQUE KEY `uq_tipo_bloque_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TipoArchivo` (
  `id_tipo_archivo` INT          NOT NULL AUTO_INCREMENT,
  `codigo`          VARCHAR(100) NOT NULL,
  `nombre`          VARCHAR(100) NOT NULL,
  `descripcion`     TEXT,
  PRIMARY KEY (`id_tipo_archivo`),
  UNIQUE KEY `uq_tipo_archivo_codigo` (`codigo`),
  UNIQUE KEY `uq_tipo_archivo_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TipoPagina` (
  `id_tipo_pagina` INT          NOT NULL AUTO_INCREMENT,
  `codigo`         VARCHAR(100) NOT NULL,
  `nombre`         VARCHAR(100) NOT NULL,
  `descripcion`    TEXT,
  PRIMARY KEY (`id_tipo_pagina`),
  UNIQUE KEY `uq_tipo_pagina_codigo` (`codigo`),
  UNIQUE KEY `uq_tipo_pagina_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `TipoAccionHistorial` (
  `id_tipo_accion_historial` INT          NOT NULL AUTO_INCREMENT,
  `codigo`                   VARCHAR(100) NOT NULL,
  `nombre`                   VARCHAR(100) NOT NULL,
  `descripcion`              TEXT,
  PRIMARY KEY (`id_tipo_accion_historial`),
  UNIQUE KEY `uq_tipo_accion_historial_codigo` (`codigo`),
  UNIQUE KEY `uq_tipo_accion_historial_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `UnidadMedida` (
  `id_unidad_medida` INT          NOT NULL AUTO_INCREMENT,
  `codigo`           VARCHAR(100) NOT NULL,
  `nombre`           VARCHAR(100) NOT NULL,
  `simbolo`          VARCHAR(20),
  `descripcion`      TEXT,
  PRIMARY KEY (`id_unidad_medida`),
  UNIQUE KEY `uq_unidad_medida_codigo` (`codigo`),
  UNIQUE KEY `uq_unidad_medida_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Categoria` (
  `id_categoria` INT          NOT NULL AUTO_INCREMENT,
  `codigo`       VARCHAR(100) NOT NULL,
  `nombre`       VARCHAR(255) NOT NULL,
  `color`        VARCHAR(7)   NOT NULL DEFAULT '#6B7280',
  PRIMARY KEY (`id_categoria`),
  UNIQUE KEY `uq_categoria_codigo` (`codigo`),
  UNIQUE KEY `uq_categoria_nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ══════════════════════════════════════════════════════════════════════════════
-- TABLAS PRINCIPALES
-- ══════════════════════════════════════════════════════════════════════════════

CREATE TABLE `Usuario` (
  `id_usuario`                   INT          NOT NULL AUTO_INCREMENT,
  `nombre`                       VARCHAR(255) NOT NULL,
  `email`                        VARCHAR(255) NOT NULL,
  `fecha_registro`               DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contrasena`                   VARCHAR(255) NOT NULL,
  `foto_perfil`                  VARCHAR(255),
  `about`                        TEXT,
  `telefono`                     VARCHAR(30),
  `linktree`                     VARCHAR(255),
  `instagram`                    VARCHAR(100),
  `linkedin`                     VARCHAR(100),
  `id_rol`                       INT          NOT NULL,
  `id_estado_validacion_usuario` INT          NOT NULL,
  `id_estado_cuenta_usuario`     INT          NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uq_usuario_email` (`email`),
  KEY `idx_usuario_rol`               (`id_rol`),
  KEY `idx_usuario_estado_validacion` (`id_estado_validacion_usuario`),
  KEY `idx_usuario_estado_cuenta`     (`id_estado_cuenta_usuario`),
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
  `id_proyecto`             INT          NOT NULL AUTO_INCREMENT,
  `nombre`                  VARCHAR(255) NOT NULL,
  `descripcion`             TEXT,
  `fecha_creacion`          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `imagen`                  VARCHAR(255),
  `ubicacion`               VARCHAR(255),
  `about`                   TEXT,
  `objetivos`               JSON,
  `comunidad`               TEXT,
  `operacion`               JSON,
  `porcentaje_completacion` DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  `datos_importados`        JSON,
  `configuracion`           JSON,
  `id_estado_proyecto`      INT          NOT NULL,
  `id_pagina_home`          INT,
  `id_categoria`            INT,
  `id_usuario_lider`        INT,
  PRIMARY KEY (`id_proyecto`),
  KEY `idx_proyecto_estado`        (`id_estado_proyecto`),
  KEY `idx_proyecto_pagina_home`   (`id_pagina_home`),
  KEY `idx_proyecto_categoria`     (`id_categoria`),
  KEY `idx_proyecto_usuario_lider` (`id_usuario_lider`),
  CONSTRAINT `chk_proyecto_porcentaje_completacion`
    CHECK (`porcentaje_completacion` >= 0 AND `porcentaje_completacion` <= 100),
  CONSTRAINT `fk_proyecto_estado`
    FOREIGN KEY (`id_estado_proyecto`)
    REFERENCES `EstadoProyecto` (`id_estado_proyecto`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_proyecto_categoria`
    FOREIGN KEY (`id_categoria`) REFERENCES `Categoria` (`id_categoria`)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_proyecto_usuario_lider`
    FOREIGN KEY (`id_usuario_lider`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `ProyectoUsuario` (
  `id_proyecto_usuario`  INT      NOT NULL AUTO_INCREMENT,
  `id_proyecto`          INT      NOT NULL,
  `id_usuario`           INT      NOT NULL,
  `fecha_vinculacion`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `id_archivo_usuario` INT          NOT NULL AUTO_INCREMENT,
  `ruta_archivo`       VARCHAR(255) NOT NULL,
  `fecha_carga`        DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario`         INT          NOT NULL,
  `id_tipo_archivo`    INT          NOT NULL,
  `tipo_grafica`       ENUM('histograma','puntos','pie') NULL,
  PRIMARY KEY (`id_archivo_usuario`),
  UNIQUE KEY `uq_archivo_usuario_ruta` (`ruta_archivo`),
  KEY `idx_archivo_usuario_usuario` (`id_usuario`),
  KEY `idx_archivo_usuario_tipo`    (`id_tipo_archivo`),
  CONSTRAINT `fk_archivo_usuario_usuario`
    FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_archivo_usuario_tipo`
    FOREIGN KEY (`id_tipo_archivo`) REFERENCES `TipoArchivo` (`id_tipo_archivo`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Seccion` (
  `id_seccion`         INT          NOT NULL AUTO_INCREMENT,
  `nombre`             VARCHAR(255) NOT NULL,
  `slug`               VARCHAR(255) NOT NULL,
  `orden`              INT          NOT NULL,
  `fecha_creacion`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_proyecto`        INT,
  `id_seccion_padre`   INT,
  `id_usuario_creador` INT          NOT NULL,
  PRIMARY KEY (`id_seccion`),
  UNIQUE KEY `uq_seccion_slug_hermano`
    (`id_proyecto`, `id_seccion_padre`, `slug`),
  UNIQUE KEY `uq_seccion_orden_hermano`
    (`id_proyecto`, `id_seccion_padre`, `orden`),
  KEY `idx_seccion_proyecto`        (`id_proyecto`),
  KEY `idx_seccion_padre`           (`id_seccion_padre`),
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
  `id_pagina`          INT          NOT NULL AUTO_INCREMENT,
  `titulo`             VARCHAR(255) NOT NULL,
  `slug`               VARCHAR(255) NOT NULL,
  `orden`              INT          NOT NULL,
  `fecha_creacion`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_tipo_pagina`     INT          NOT NULL,
  `id_seccion`         INT          NOT NULL,
  `id_usuario_creador` INT          NOT NULL,
  `id_estado_pagina`   INT          NOT NULL,
  PRIMARY KEY (`id_pagina`),
  UNIQUE KEY `uq_pagina_slug_seccion`  (`id_seccion`, `slug`),
  UNIQUE KEY `uq_pagina_orden_seccion` (`id_seccion`, `orden`),
  KEY `idx_pagina_tipo`            (`id_tipo_pagina`),
  KEY `idx_pagina_usuario_creador` (`id_usuario_creador`),
  KEY `idx_pagina_estado`          (`id_estado_pagina`),
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
  `id_plantilla_bloque`  INT          NOT NULL AUTO_INCREMENT,
  `nombre`               VARCHAR(255) NOT NULL,
  `descripcion`          TEXT,
  `renderer_key`         VARCHAR(100) NOT NULL,
  `version`              INT          NOT NULL DEFAULT 1,
  `configuracion_base`   JSON,
  `schema_configuracion` JSON,
  `id_tipo_bloque`       INT          NOT NULL,
  PRIMARY KEY (`id_plantilla_bloque`),
  UNIQUE KEY `uq_plantilla_bloque_renderer_version` (`renderer_key`, `version`),
  KEY `idx_plantilla_bloque_tipo` (`id_tipo_bloque`),
  CONSTRAINT `chk_plantilla_bloque_version` CHECK (`version` > 0),
  CONSTRAINT `fk_plantilla_bloque_tipo`
    FOREIGN KEY (`id_tipo_bloque`) REFERENCES `TipoBloque` (`id_tipo_bloque`)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `BloqueContenido` (
  `id_bloque`           INT      NOT NULL AUTO_INCREMENT,
  `orden`               INT      NOT NULL,
  `configuracion`       JSON,
  `contenido_texto`     LONGTEXT,
  `fecha_creacion`      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_pagina`           INT      NOT NULL,
  `id_plantilla_bloque` INT      NOT NULL,
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
  `id_historial_pagina`      INT      NOT NULL AUTO_INCREMENT,
  `mensaje`                  TEXT     NOT NULL,
  `fecha_cambio`             DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_tipo_accion_historial` INT      NOT NULL,
  `id_pagina`                INT      NOT NULL,
  `id_usuario`               INT      NOT NULL,
  PRIMARY KEY (`id_historial_pagina`),
  KEY `idx_historial_pagina_pagina_fecha` (`id_pagina`, `fecha_cambio`),
  KEY `idx_historial_pagina_usuario`      (`id_usuario`),
  KEY `idx_historial_pagina_tipo`         (`id_tipo_accion_historial`),
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
  `id_kpi`           INT           NOT NULL AUTO_INCREMENT,
  `nombre`           VARCHAR(255)  NOT NULL,
  `descripcion`      TEXT,
  `formula`          TEXT,
  `valor_meta`       DECIMAL(18,4) NOT NULL,
  `id_proyecto`      INT           NOT NULL,
  `id_estado_kpi`    INT           NOT NULL,
  `id_unidad_medida` INT,
  PRIMARY KEY (`id_kpi`),
  KEY `idx_kpi_proyecto`      (`id_proyecto`),
  KEY `idx_kpi_estado`        (`id_estado_kpi`),
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
  `id_resultado_kpi`    INT           NOT NULL AUTO_INCREMENT,
  `valor`               DECIMAL(18,4) NOT NULL,
  `fecha_resultado`     DATETIME      NOT NULL,
  `fecha_carga`         DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `metadatos`           JSON,
  `id_kpi`              INT           NOT NULL,
  `id_archivo_usuario`  INT           NOT NULL,
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
  `id_publicacion`        INT      NOT NULL AUTO_INCREMENT,
  `contenido`             TEXT     NOT NULL,
  `fecha_publicacion`     DATETIME,
  `id_usuario`            INT      NOT NULL,
  `id_proyecto`           INT      NOT NULL,
  `id_estado_publicacion` INT      NOT NULL,
  PRIMARY KEY (`id_publicacion`),
  KEY `idx_publicacion_usuario`        (`id_usuario`),
  KEY `idx_publicacion_proyecto_fecha` (`id_proyecto`, `fecha_publicacion`),
  KEY `idx_publicacion_estado`         (`id_estado_publicacion`),
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
  `id_publicacion`     INT NOT NULL,
  `id_archivo_usuario` INT NOT NULL,
  `orden`              INT NOT NULL,
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
  `id_evento`          INT          NOT NULL AUTO_INCREMENT,
  `nombre`             VARCHAR(255) NOT NULL,
  `descripcion`        TEXT,
  `fecha_realizacion`  DATETIME     NOT NULL,
  `fecha_publicacion`  DATETIME,
  `id_usuario_creador` INT          NOT NULL,
  `id_proyecto`        INT          NOT NULL,
  `id_estado_evento`   INT          NOT NULL,
  PRIMARY KEY (`id_evento`),
  KEY `idx_evento_usuario_creador` (`id_usuario_creador`),
  KEY `idx_evento_proyecto_fecha`  (`id_proyecto`, `fecha_realizacion`),
  KEY `idx_evento_estado`          (`id_estado_evento`),
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
  `id_testimonio`        INT          NOT NULL AUTO_INCREMENT,
  `fecha`                DATETIME     NOT NULL,
  `contenido`            TEXT         NOT NULL,
  `tipo_participante`    VARCHAR(50),
  `nombre_publico`       VARCHAR(255),
  `fecha_revision`       DATETIME,
  `id_usuario`           INT,
  `id_usuario_revisor`   INT,
  `id_proyecto`          INT          NOT NULL,
  `id_estado_testimonio` INT          NOT NULL,
  PRIMARY KEY (`id_testimonio`),
  KEY `idx_testimonio_usuario`         (`id_usuario`),
  KEY `idx_testimonio_usuario_revisor` (`id_usuario_revisor`),
  KEY `idx_testimonio_proyecto_fecha`  (`id_proyecto`, `fecha`),
  KEY `idx_testimonio_estado`          (`id_estado_testimonio`),
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
  `id_evento`  INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_evento`),
  KEY `idx_usuario_evento_evento` (`id_evento`),
  CONSTRAINT `fk_usuario_evento_usuario`
    FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario_evento_evento`
    FOREIGN KEY (`id_evento`) REFERENCES `Evento` (`id_evento`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── FK diferida: Proyecto.id_pagina_home → Pagina (ref. circular) ────────────
ALTER TABLE `Proyecto`
  ADD CONSTRAINT `fk_proyecto_pagina_home`
    FOREIGN KEY (`id_pagina_home`) REFERENCES `Pagina` (`id_pagina`)
    ON DELETE SET NULL ON UPDATE CASCADE;

-- ══════════════════════════════════════════════════════════════════════════════
-- SEED: CATÁLOGOS
-- ══════════════════════════════════════════════════════════════════════════════

INSERT INTO `Rol` (codigo, nombre, descripcion) VALUES
  ('ADMIN',  'Administrador',     'Usuario con todos los privilegios, tiene acceso a todas las vistas y puede modificar cualquier parte del sistema.'),
  ('LIDER',  'Líder de proyecto', 'Usuario con privilegios, puede administrar proyectos y añadir/modificar/eliminar secciones y páginas de su proyecto.'),
  ('USUARIO', 'Usuario',          'Usuario sin privilegios que hace uso de la página y puede ver los contenidos publicados en toda la página.');

INSERT INTO `EstadoValidacionUsuario` (codigo, nombre, descripcion) VALUES
  ('PENDIENTE', 'Pendiente', 'El usuario se registró, pero aún no ha sido validado por un administrador.'),
  ('VALIDADO',  'Validado',  'El usuario fue revisado y aprobado para participar en la plataforma, o el rol seleccionado no requiere validación.'),
  ('RECHAZADO', 'Rechazado', 'La solicitud de validación del usuario fue revisada y no fue aprobada.');

INSERT INTO `EstadoCuentaUsuario` (codigo, nombre, descripcion) VALUES
  ('ACTIVA',     'Cuenta activa',     'Cuenta con actividad.'),
  ('INACTIVA',   'Cuenta inactiva',   'Cuenta sin actividad, se requiere autenticación para reactivar.'),
  ('SUSPENDIDA', 'Cuenta suspendida', 'Usuario suspendido por un administrador. Ya no puede acceder al sistema.');

INSERT INTO `EstadoProyecto` (codigo, nombre, descripcion) VALUES
  ('ACTIVO',   'Proyecto activo',   'Proyecto creado y publicado.'),
  ('INACTIVO', 'Proyecto inactivo', 'Proyecto terminó su periodo de actividad o tiene baja temporal.');

INSERT INTO `EstadoPagina` (codigo, nombre, descripcion) VALUES
  ('BORRADOR',  'Borrador',  'Página en edición que aún no es visible para el público.'),
  ('PUBLICADA', 'Publicada', 'Página visible para los usuarios de la plataforma.'),
  ('ARCHIVADA', 'Archivada', 'Página retirada de la navegación principal, conservada como histórico.');

INSERT INTO `EstadoKPI` (codigo, nombre, descripcion) VALUES
  ('ACTIVO',    'Activo',    'KPI vigente y disponible para registro y seguimiento de resultados.'),
  ('INACTIVO',  'Inactivo',  'KPI que ya no se utiliza para seguimiento, pero se conserva como histórico.'),
  ('ARCHIVADO', 'Archivado', 'KPI retirado de la vista principal.');

INSERT INTO `EstadoPublicacion` (codigo, nombre, descripcion) VALUES
  ('PUBLICADA',  'Publicada',  'Publicación visible para los usuarios de la plataforma.'),
  ('PROGRAMADA', 'Programada', 'Publicación configurada para mostrarse en una fecha posterior.'),
  ('PASADA',     'Pasada',     'Publicación cuya fecha de vigencia o publicación ya concluyó.');

INSERT INTO `EstadoEvento` (codigo, nombre, descripcion) VALUES
  ('ACTIVO',     'Activo',     'Evento vigente y disponible para consulta o participación.'),
  ('PROGRAMADO', 'Programado', 'Evento configurado para realizarse en una fecha posterior.'),
  ('PUBLICADO',  'Publicado',  'Evento visible para los usuarios de la plataforma.'),
  ('PASADO',     'Pasado',     'Evento cuya fecha de realización ya concluyó.'),
  ('CANCELADO',  'Cancelado',  'Evento que fue cancelado y ya no se realizará.');

INSERT INTO `EstadoTestimonio` (codigo, nombre, descripcion) VALUES
  ('PENDIENTE', 'Pendiente', 'Testimonio enviado y pendiente de revisión.'),
  ('APROBADO',  'Aprobado',  'Testimonio revisado y aprobado para mostrarse en la plataforma.'),
  ('RECHAZADO', 'Rechazado', 'Testimonio revisado y no aprobado para mostrarse en la plataforma.');

INSERT INTO `TipoBloque` (codigo, nombre, descripcion) VALUES
  ('TEXTO',       'Texto',               'Bloques para contenido textual, títulos, párrafos y texto enriquecido.'),
  ('IMAGEN',      'Imagen',              'Bloques para mostrar imágenes individuales con configuración visual.'),
  ('GALERIA',     'Galería',             'Bloques para mostrar múltiples imágenes o archivos visuales.'),
  ('VIDEO',       'Video',               'Bloques para insertar o mostrar contenido de video.'),
  ('KPI',         'KPI',                 'Bloques para mostrar indicadores, métricas o resultados de impacto.'),
  ('GRAFICA',     'Gráfica',             'Bloques para visualizar datos mediante gráficas.'),
  ('TESTIMONIO',  'Testimonio',          'Bloques para mostrar testimonios aprobados.'),
  ('EVENTO',      'Evento',              'Bloques para mostrar eventos relacionados con un proyecto.'),
  ('PUBLICACION', 'Publicación',         'Bloques para mostrar publicaciones o noticias.'),
  ('CTA',         'Llamado a la acción', 'Bloques para invitar al usuario a realizar una acción específica.'),
  ('ARCHIVO',     'Archivo',             'Bloques para mostrar o descargar documentos y recursos.');

INSERT INTO `TipoArchivo` (codigo, nombre, descripcion) VALUES
  ('IMAGEN',    'Imagen',    'Archivo visual como fotografía, ilustración o gráfico.'),
  ('DOCUMENTO', 'Documento', 'Archivo documental como PDF, Word o presentación.'),
  ('VIDEO',     'Video',     'Archivo o recurso audiovisual en formato de video.'),
  ('AUDIO',     'Audio',     'Archivo sonoro como grabación, entrevista o narración.'),
  ('DATASET',   'Dataset',   'Archivo de datos usado para análisis, reportes o visualizaciones.');

INSERT INTO `TipoPagina` (codigo, nombre, descripcion) VALUES
  ('HOME',      'Home',      'Página principal de un proyecto.'),
  ('CONTENIDO', 'Contenido', 'Página general para presentar información editable mediante bloques.'),
  ('LISTADO',   'Listado',   'Página para mostrar colecciones de elementos como publicaciones, eventos o testimonios.'),
  ('DETALLE',   'Detalle',   'Página para mostrar información detallada de un elemento específico.'),
  ('ARTICULO',  'Artículo',  'Página de contenido editorial o narrativo, como noticias, historias o reportajes.');

INSERT INTO `TipoAccionHistorial` (codigo, nombre, descripcion) VALUES
  ('CREACION',    'Creación',    'Registro inicial de una página o contenido.'),
  ('EDICION',     'Edición',     'Modificación de contenido, configuración o estructura de una página.'),
  ('PUBLICACION', 'Publicación', 'Cambio que hace visible una página o contenido para los usuarios.'),
  ('ARCHIVADO',   'Archivado',   'Retiro de una página o contenido de la vista principal.');

INSERT INTO `UnidadMedida` (codigo, nombre, simbolo, descripcion) VALUES
  ('PERSONA',    'Persona',       'personas',   'Conteo de personas beneficiadas, participantes o atendidas.'),
  ('HORA',       'Hora',          'h',           'Tiempo medido en horas.'),
  ('PORCENTAJE', 'Porcentaje',    '%',           'Proporción expresada como porcentaje.'),
  ('PESO_MXN',   'Peso mexicano', 'MXN',         'Monto monetario expresado en pesos mexicanos.'),
  ('EVENTO',     'Evento',        'eventos',    'Conteo de eventos realizados.'),
  ('TALLER',     'Taller',        'talleres',   'Conteo de talleres impartidos.'),
  ('DOCUMENTO',  'Documento',     'documentos', 'Conteo de documentos, reportes o materiales generados.'),
  ('KILOGRAMO',  'Kilogramo',     'kg',          'Peso o cantidad física medida en kilogramos.');

INSERT INTO `Categoria` (codigo, nombre, color) VALUES
  ('ALIMENTACION',   'Alimentación y Nutrición',      '#16A34A'),
  ('EDUCACION',      'Educación y Tutorías',           '#0EA5E9'),
  ('MEDIO_AMBIENTE', 'Medio Ambiente',                 '#059669'),
  ('SALUD',          'Salud y Bienestar',              '#E11D48'),
  ('CONSTRUCCION',   'Construcción y Vivienda',        '#F05A28'),
  ('TECNOLOGIA',     'Tecnología e Inclusión Digital', '#7C3AED'),
  ('ARTE',           'Arte y Cultura',                 '#DB2777');

INSERT INTO `PlantillaBloque`
  (nombre, descripcion, renderer_key, version, configuracion_base, schema_configuracion, id_tipo_bloque)
VALUES
(
  'Título',
  'Encabezado principal H1 con alineación configurable',
  'titulo_v1', 1,
  '{"nivel":1,"alineacion":"left"}',
  '{"type":"object","properties":{"nivel":{"type":"integer","minimum":1,"maximum":3},"alineacion":{"type":"string","enum":["left","center","right"]}}}',
  (SELECT id_tipo_bloque FROM TipoBloque WHERE codigo = 'TEXTO')
),
(
  'Subtítulo',
  'Encabezado secundario H2 con alineación configurable',
  'subtitulo_v1', 1,
  '{"nivel":2,"alineacion":"left"}',
  '{"type":"object","properties":{"nivel":{"type":"integer","minimum":1,"maximum":3},"alineacion":{"type":"string","enum":["left","center","right"]}}}',
  (SELECT id_tipo_bloque FROM TipoBloque WHERE codigo = 'TEXTO')
),
(
  'Texto',
  'Párrafo o bloque de texto libre',
  'texto_v1', 1,
  '{"alineacion":"left"}',
  '{"type":"object","properties":{"alineacion":{"type":"string","enum":["left","center","right","justify"]}}}',
  (SELECT id_tipo_bloque FROM TipoBloque WHERE codigo = 'TEXTO')
),
(
  'Imagen',
  'Imagen con texto alternativo y pie de foto opcional',
  'imagen_v1', 1,
  '{"ancho":"full","redondeado":false}',
  '{"type":"object","properties":{"src":{"type":"string"},"alt":{"type":"string"},"pie_foto":{"type":"string"},"id_archivo":{"type":["integer","null"]},"ancho":{"type":"string","enum":["full","lg","md","sm"]}}}',
  (SELECT id_tipo_bloque FROM TipoBloque WHERE codigo = 'IMAGEN')
),
(
  'Video',
  'Video embebido (YouTube/Vimeo) o archivo subido al servidor',
  'video_v1', 1,
  '{"tipo":"url"}',
  '{"type":"object","properties":{"src":{"type":"string"},"tipo":{"type":"string","enum":["url","archivo"]},"id_archivo":{"type":["integer","null"]},"titulo":{"type":"string"}}}',
  (SELECT id_tipo_bloque FROM TipoBloque WHERE codigo = 'VIDEO')
),
(
  'Carrusel de imágenes',
  'Galería deslizable de imágenes',
  'galeria_v1', 1,
  '{"autoplay":false,"mostrar_flechas":true}',
  '{"type":"object","properties":{"imagenes":{"type":"array","items":{"type":"object","properties":{"src":{"type":"string"},"alt":{"type":"string"},"id_archivo":{"type":["integer","null"]}}}},"autoplay":{"type":"boolean"},"mostrar_flechas":{"type":"boolean"}}}',
  (SELECT id_tipo_bloque FROM TipoBloque WHERE codigo = 'GALERIA')
),
(
  'Texto e imagen',
  'Bloque mixto con texto e imagen en columnas, layout configurable',
  'texto_imagen_v1', 1,
  '{"layout":"derecha"}',
  '{"type":"object","properties":{"layout":{"type":"string","enum":["izquierda","derecha"]},"src":{"type":"string"},"alt":{"type":"string"},"id_archivo":{"type":["integer","null"]}}}',
  (SELECT id_tipo_bloque FROM TipoBloque WHERE codigo = 'IMAGEN')
);

-- ══════════════════════════════════════════════════════════════════════════════
-- SEED: USUARIO ADMINISTRADOR
-- ══════════════════════════════════════════════════════════════════════════════

-- Contraseña por defecto: "solidario123" (hash bcrypt)
INSERT INTO `Usuario` (nombre, email, contrasena, id_rol, id_estado_validacion_usuario, id_estado_cuenta_usuario)
VALUES (
  'Administrador',
  'admin@hub.mx',
  '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  (SELECT id_rol                       FROM Rol                     WHERE codigo = 'ADMIN'),
  (SELECT id_estado_validacion_usuario FROM EstadoValidacionUsuario WHERE codigo = 'VALIDADO'),
  (SELECT id_estado_cuenta_usuario     FROM EstadoCuentaUsuario     WHERE codigo = 'ACTIVA')
);
