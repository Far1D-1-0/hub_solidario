-- Migración: tipo de gráfica en archivos + columnas faltantes en Proyecto
-- Ejecutar una sola vez en la base de datos existente
USE `hub_solidario`;

ALTER TABLE `ArchivoUsuario`
  ADD COLUMN IF NOT EXISTS `tipo_grafica` ENUM('histograma','puntos','pie') NULL
  AFTER `id_tipo_archivo`;

ALTER TABLE `Proyecto`
  ADD COLUMN IF NOT EXISTS `datos_importados` JSON AFTER `porcentaje_completacion`,
  ADD COLUMN IF NOT EXISTS `configuracion`    JSON AFTER `datos_importados`;
