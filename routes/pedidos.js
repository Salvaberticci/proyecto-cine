// routes/pedidos.js - Router que separa las rutas API y Vistas para Pedidos
// Aplica el principio de Separación de Intereses (SoC) manteniendo rutas organizadas

const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/PedidoController');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/pedidos

// GET /api/pedidos/ultimos - Muestra los últimos 5 pedidos ordenados por fecha
router.get('/api/pedidos/ultimos', pedidoController.apiUltimos);

// GET /api/pedidos - Lista todos los pedidos (adicional para completitud)
router.get('/api/pedidos', pedidoController.apiListar);

// GET /api/pedidos/:id - Muestra el detalle de un pedido por ID (adicional para completitud)
router.get('/api/pedidos/:id', pedidoController.apiObtener);

// POST /api/pedidos - Crea un nuevo pedido
router.post('/api/pedidos', pedidoController.apiCrear);

// PUT /api/pedidos/:id - Actualiza un pedido (adicional para completitud)
router.put('/api/pedidos/:id', pedidoController.apiActualizar);

// DELETE /api/pedidos/:pedidoId/producto/:productoId - Elimina la relación específica entre un pedido y un producto
router.delete('/api/pedidos/:pedidoId/producto/:productoId', pedidoController.apiEliminarRelacion);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /pedidos

// GET /pedidos - Lista de pedidos
router.get('/pedidos', pedidoController.listar);

// GET /pedidos/crear - Formulario de Creación de pedido
router.get('/pedidos/crear', pedidoController.crearForm);

// POST /pedidos - Procesa creación de pedido desde formulario
router.post('/pedidos', pedidoController.crear);

module.exports = router;