-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2025 a las 14:50:33
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cine`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`) VALUES
(1, 'Acción'),
(2, 'Ciencia Ficción'),
(3, 'Drama'),
(4, 'Comedia'),
(5, 'Aventura');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funciones`
--

CREATE TABLE `funciones` (
  `id_funcion` int(11) NOT NULL,
  `id_pelicula` int(11) DEFAULT NULL,
  `id_sala` int(11) DEFAULT NULL,
  `fecha_hora` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `funciones`
--

INSERT INTO `funciones` (`id_funcion`, `id_pelicula`, `id_sala`, `fecha_hora`) VALUES
(1, 1, 1, '2023-10-01 18:00:00'),
(2, 1, 2, '2023-10-02 20:00:00'),
(3, 2, 3, '2023-10-03 19:30:00'),
(4, 3, 4, '2023-10-04 17:00:00'),
(5, 4, 1, '2023-10-05 21:00:00'),
(6, 5, 2, '2023-10-06 15:00:00'),
(7, 6, 3, '2023-10-07 19:00:00'),
(8, 7, 4, '2023-10-08 18:30:00'),
(9, 8, 1, '2023-10-09 20:00:00'),
(10, 1, 3, '2023-10-10 19:00:00'),
(11, 2, 4, '2023-10-11 17:30:00'),
(12, 1, 2, '2025-08-14 19:52:00'),
(13, 1, 1, '2025-08-04 17:27:00'),
(14, 2, 2, '2025-08-15 17:29:00'),
(15, 2, 2, '2025-08-17 18:37:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodos_pago`
--

CREATE TABLE `metodos_pago` (
  `id_metodo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `metodos_pago`
--

INSERT INTO `metodos_pago` (`id_metodo`, `nombre`) VALUES
(1, 'Transferencia Bancaria'),
(2, 'Tarjeta de Crédito'),
(3, 'Efectivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `fecha_pedido` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `producto_id`, `cantidad`, `fecha_pedido`) VALUES
(1, 1, 2, '2025-10-22'),
(2, 2, 1, '2025-10-22'),
(3, 3, 3, '2025-10-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id_pelicula` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `anio` int(11) DEFAULT NULL,
  `duracion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id_pelicula`, `titulo`, `anio`, `duracion`) VALUES
(1, 'Avengers: Endgame', 2019, 181),
(2, 'Interstellar', 2014, 169),
(3, 'The Shawshank Redemption', 1994, 142),
(4, 'Deadpool', 2016, 108),
(5, 'Jurassic Park', 1993, 127),
(6, 'Inception', 2010, 148),
(7, 'The Matrix', 1999, 136),
(8, 'Forrest Gump', 1994, 142),
(12, 'Batman', 2012, 185);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas_categorias`
--

CREATE TABLE `peliculas_categorias` (
  `id_pelicula` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peliculas_categorias`
--

INSERT INTO `peliculas_categorias` (`id_pelicula`, `id_categoria`) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3),
(4, 1),
(4, 4),
(5, 2),
(5, 5),
(6, 1),
(6, 2),
(7, 1),
(7, 2),
(8, 3),
(8, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `fecha_creacion` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `stock`, `fecha_creacion`) VALUES
(1, 'Palomitas Grandes', 'Palomitas de maÝz saladas tama±o grande', 5.50, 100, '2025-10-22'),
(2, 'Refresco Mediano', 'Bebida gaseosa mediana', 3.00, 150, '2025-10-22'),
(3, 'Nachos', 'Nachos con queso y jalape±os', 7.00, 80, '2025-10-22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id_sala` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `capacidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id_sala`, `nombre`, `capacidad`) VALUES
(1, 'Sala IMAX', 200),
(2, 'Sala VIP', 100),
(3, 'Sala 3D', 150),
(4, 'Sala Estándar', 120),
(5, 'Sala 2 ', 10),
(6, 'Sala 2 ', 10),
(7, 'Sala 4', 122),
(8, 'Sala 5', 121);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id_ticket` int(11) NOT NULL,
  `id_venta` int(11) DEFAULT NULL,
  `id_funcion` int(11) DEFAULT NULL,
  `asiento` varchar(10) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id_ticket`, `id_venta`, `id_funcion`, `asiento`, `precio`) VALUES
(1, 1, 1, 'A1', 12.50),
(2, 1, 1, 'A2', 12.50),
(3, 1, 1, 'A3', 12.50),
(4, 1, 1, 'A4', 12.50),
(5, 2, 2, 'B1', 12.50),
(6, 2, 2, 'B2', 12.50),
(7, 2, 2, 'B3', 12.50),
(8, 3, 3, 'C1', 12.50),
(9, 3, 3, 'C2', 12.50),
(10, 4, 4, 'D1', 12.50),
(11, 5, 5, 'E1', 12.50),
(12, 5, 5, 'E2', 12.50),
(13, 5, 5, 'E3', 12.50),
(14, 5, 5, 'E4', 12.50),
(15, 5, 5, 'E5', 12.50),
(16, 5, 5, 'E6', 12.50),
(17, 6, 6, 'F1', 12.50),
(18, 6, 6, 'F2', 12.50),
(19, 6, 6, 'F3', 12.50),
(20, 6, 6, 'F4', 12.50),
(21, 7, 7, 'G1', 12.50),
(22, 7, 7, 'G2', 12.50),
(23, 7, 7, 'G3', 12.50),
(24, 7, 7, 'G4', 12.50),
(25, 7, 7, 'G5', 12.50),
(26, 8, 8, 'H1', 12.50),
(27, 8, 8, 'H2', 12.50),
(28, 8, 8, 'H3', 12.50),
(29, 9, 9, 'I1', 12.50),
(30, 9, 9, 'I2', 12.50),
(31, 10, 10, 'J1', 12.50),
(32, 10, 10, 'J2', 12.50),
(33, 10, 10, 'J3', 12.50),
(34, 10, 10, 'J4', 12.50),
(35, 10, 10, 'J5', 12.50),
(36, 10, 10, 'J6', 12.50),
(37, 10, 10, 'J7', 12.50),
(38, 10, 10, 'J8', 12.50),
(39, 11, 11, 'K1', 12.50),
(40, 11, 11, 'K2', 12.50),
(41, 11, 11, 'K3', 12.50),
(42, 11, 11, 'K4', 12.50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin','user','guest') NOT NULL DEFAULT 'user',
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `email`, `password_hash`, `role`, `activo`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(1, 'admin', 'admin@cine.com', '$2b$10$IeyDE0DtGmqpSFl8r25.KesEvsH/C9OcxDOC90MzMfref6oykzeNq', 'admin', 1, '2025-11-12 14:08:40', '2025-11-12 14:08:40'),
(2, 'usuario1', 'usuario1@cine.com', '$2b$10$IeyDE0DtGmqpSFl8r25.KesEvsH/C9OcxDOC90MzMfref6oykzeNq', 'user', 1, '2025-11-12 14:08:40', '2025-11-12 14:08:40'),
(3, 'invitado', 'invitado@cine.com', '$2b$10$IeyDE0DtGmqpSFl8r25.KesEvsH/C9OcxDOC90MzMfref6oykzeNq', 'guest', 1, '2025-11-12 14:08:40', '2025-11-12 14:08:40'),
(4, 'testuser', 'test@example.com', '$2b$10$bYbhnqHFTw.45hgfeKj.luxa7Q/bDS2MJs9k9kUWUb7mV2qQcqBpe', 'user', 1, '2025-11-12 14:57:04', '2025-11-12 14:57:04'),
(5, 'prueba', 'prueba@gmail.com', '$2b$10$R136BsMPSb7opRZd9MzPfuZbR.5HaPpMY9ATQQP.OBjlcOi2aHAGa', 'user', 0, '2025-11-12 14:58:08', '2025-11-12 16:03:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_metodo` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `id_metodo`, `fecha`, `total`) VALUES
(1, 1, '2023-10-01 17:50:00', 50.00),
(2, 2, '2023-10-02 19:45:00', 37.50),
(3, 3, '2023-10-03 19:20:00', 25.00),
(4, 1, '2023-10-04 16:50:00', 12.50),
(5, 2, '2023-10-05 20:50:00', 75.00),
(6, 3, '2023-10-06 14:45:00', 50.00),
(7, 1, '2023-10-07 18:50:00', 62.50),
(8, 2, '2023-10-08 18:20:00', 37.50),
(9, 3, '2023-10-09 19:50:00', 25.00),
(10, 1, '2023-10-10 18:45:00', 100.00),
(11, 2, '2023-10-11 17:20:00', 50.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD PRIMARY KEY (`id_funcion`),
  ADD KEY `id_pelicula` (`id_pelicula`),
  ADD KEY `id_sala` (`id_sala`);

--
-- Indices de la tabla `metodos_pago`
--
ALTER TABLE `metodos_pago`
  ADD PRIMARY KEY (`id_metodo`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id_pelicula`);

--
-- Indices de la tabla `peliculas_categorias`
--
ALTER TABLE `peliculas_categorias`
  ADD PRIMARY KEY (`id_pelicula`,`id_categoria`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id_sala`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id_ticket`),
  ADD KEY `id_venta` (`id_venta`),
  ADD KEY `id_funcion` (`id_funcion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_metodo` (`id_metodo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `funciones`
--
ALTER TABLE `funciones`
  MODIFY `id_funcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `metodos_pago`
--
ALTER TABLE `metodos_pago`
  MODIFY `id_metodo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id_pelicula` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id_sala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id_ticket` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `funciones`
--
ALTER TABLE `funciones`
  ADD CONSTRAINT `funciones_ibfk_1` FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id_pelicula`),
  ADD CONSTRAINT `funciones_ibfk_2` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `peliculas_categorias`
--
ALTER TABLE `peliculas_categorias`
  ADD CONSTRAINT `peliculas_categorias_ibfk_1` FOREIGN KEY (`id_pelicula`) REFERENCES `peliculas` (`id_pelicula`) ON DELETE CASCADE,
  ADD CONSTRAINT `peliculas_categorias_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id_venta`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`id_funcion`) REFERENCES `funciones` (`id_funcion`);

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`id_metodo`) REFERENCES `metodos_pago` (`id_metodo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
