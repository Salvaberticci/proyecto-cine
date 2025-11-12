// routes/productos.js - Router que separa las rutas API y Vistas para Productos
// Aplica el principio de Separación de Intereses (SoC) manteniendo rutas organizadas

const express = require('express');
const router = express.Router();
const productoController = require('../controllers/ProductoController');
const { authenticateToken, requireUserOrAdmin, requireAdmin, requireWebAuth, requireWebRole } = require('../middleware/auth');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/productos

// GET /api/productos - Lista todos los productos (público)
router.get('/api/productos', productoController.apiListar);

// GET /api/productos/:id - Muestra el detalle de un producto por ID (público)
router.get('/api/productos/:id', productoController.apiObtener);

// POST /api/productos - Crea un nuevo producto (requiere user o admin)
router.post('/api/productos', authenticateToken, requireUserOrAdmin, productoController.apiCrear);

// PUT /api/productos/:id - Modifica todos los datos de un producto (requiere user o admin)
router.put('/api/productos/:id', authenticateToken, requireUserOrAdmin, productoController.apiActualizar);

// DELETE /api/productos/:id - Elimina un producto por ID (solo admin)
router.delete('/api/productos/:id', authenticateToken, requireAdmin, productoController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /productos

// GET /productos - Lista de productos (público)
router.get('/productos', productoController.listar);

// GET /productos/crear - Formulario de Creación de producto (requiere user o admin)
router.get('/productos/crear', requireWebAuth, requireWebRole('user'), productoController.crearForm);

// POST /productos - Procesa creación de producto desde formulario (requiere user o admin)
router.post('/productos', requireWebAuth, requireWebRole('user'), productoController.crear);

// GET /productos/:id/editar - Formulario de Edición de producto (requiere user o admin)
router.get('/productos/:id/editar', requireWebAuth, requireWebRole('user'), productoController.editarForm);

// POST /productos/:id/editar - Procesa edición de producto desde formulario (requiere user o admin)
router.post('/productos/:id/editar', requireWebAuth, requireWebRole('user'), productoController.editar);

module.exports = router;