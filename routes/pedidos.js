// routes/pedidos.js - Router que separa las rutas API y Vistas para Pedidos
// Aplica el principio de Separación de Intereses (SoC) manteniendo rutas organizadas

const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/PedidoController');
const { authenticateToken, requireUserOrAdmin, requireAdmin, requireWebAuth, requireWebRole } = require('../middleware/auth');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/pedidos

// GET /api/pedidos/ultimos - Muestra los últimos 5 pedidos ordenados por fecha (público)
router.get('/api/pedidos/ultimos', pedidoController.apiUltimos);

// GET /api/pedidos - Lista todos los pedidos (requiere user o admin)
router.get('/api/pedidos', authenticateToken, requireUserOrAdmin, pedidoController.apiListar);

// GET /api/pedidos/:id - Muestra el detalle de un pedido por ID (requiere user o admin)
router.get('/api/pedidos/:id', authenticateToken, requireUserOrAdmin, pedidoController.apiObtener);

// POST /api/pedidos - Crea un nuevo pedido (requiere user o admin)
router.post('/api/pedidos', authenticateToken, requireUserOrAdmin, pedidoController.apiCrear);

// PUT /api/pedidos/:id - Actualiza un pedido (requiere user o admin)
router.put('/api/pedidos/:id', authenticateToken, requireUserOrAdmin, pedidoController.apiActualizar);

// DELETE /api/pedidos/:pedidoId/producto/:productoId - Elimina la relación específica entre un pedido y un producto (solo admin)
router.delete('/api/pedidos/:pedidoId/producto/:productoId', authenticateToken, requireAdmin, pedidoController.apiEliminarRelacion);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /pedidos

// GET /pedidos - Lista de pedidos (requiere user o admin)
router.get('/pedidos', requireWebAuth, requireWebRole('user'), pedidoController.listar);

// GET /pedidos/crear - Formulario de Creación de pedido (requiere user o admin)
router.get('/pedidos/crear', requireWebAuth, requireWebRole('user'), pedidoController.crearForm);

// POST /pedidos - Procesa creación de pedido desde formulario (requiere user o admin)
router.post('/pedidos', requireWebAuth, requireWebRole('user'), pedidoController.crear);

module.exports = router;