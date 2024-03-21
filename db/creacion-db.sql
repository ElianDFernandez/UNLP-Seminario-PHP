CREATE DATABASE IF NOT EXISTS `inmobiliaria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `inmobiliaria`;

CREATE TABLE IF NOT EXISTS `localidades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tipo_propiedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `inquilinos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apellido` varchar(15) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `documento` varchar(25) NOT NULL,
  `email` varchar(20) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documento` (`documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `propiedades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `domicilio` varchar(255) NOT NULL,
  `localidad_id` int NOT NULL,
  `cantidad_habitaciones` int DEFAULT NULL,
  `cantidad_banios` int DEFAULT NULL,
  `cochera` tinyint(1) DEFAULT NULL,
  `cantidad_huespedes` int NOT NULL,
  `fecha_inicio_disponibilidad` date NOT NULL,
  `cantidad_dias` int NOT NULL,
  `disponible` tinyint(1) NOT NULL,
  `valor_noche` int NOT NULL,
  `tipo_propiedad_id` int NOT NULL,
  `imagen` text,
  `tipo_imagen` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tipo_propiedad` (`tipo_propiedad_id`),
  KEY `fk_localidades` (`localidad_id`),
  CONSTRAINT `fk_localidad` FOREIGN KEY (`localidad_id`) REFERENCES `localidades` (`id`),
  CONSTRAINT `fk_tipo_propiedad` FOREIGN KEY (`tipo_propiedad_id`) REFERENCES `tipo_propiedades` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `propiedad_id` int NOT NULL,
  `inquilino_id` int NOT NULL,
  `fecha_desde` date NOT NULL,
  `cantidad_noches` int NOT NULL,
  `valor_total` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `propiedad_id` (`propiedad_id`),
  KEY `inquilino_id` (`inquilino_id`),
  CONSTRAINT `fk2_propiedad` FOREIGN KEY (`propiedad_id`) REFERENCES `propiedades` (`id`),
  CONSTRAINT `fk_inquilino` FOREIGN KEY (`inquilino_id`) REFERENCES `inquilinos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;