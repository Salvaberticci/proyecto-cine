// routes/productos.js - Router que separa las rutas API y Vistas para Productos
// Aplica el principio de Separación de Intereses (SoC) manteniendo rutas organizadas

const express = require('express');
const router = express.Router();
const productoController = require('../controllers/ProductoController');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/productos

// GET /api/productos - Lista todos los productos
router.get('/api/productos', productoController.apiListar);

// GET /api/productos/:id - Muestra el detalle de un producto por ID
router.get('/api/productos/:id', productoController.apiObtener);

// POST /api/productos - Crea un nuevo producto
router.post('/api/productos', productoController.apiCrear);

// PUT /api/productos/:id - Modifica todos los datos de un producto
router.put('/api/productos/:id', productoController.apiActualizar);

// DELETE /api/productos/:id - Elimina un producto por ID
router.delete('/api/productos/:id', productoController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /productos

// GET /productos - Lista de productos
router.get('/productos', productoController.listar);

// GET /productos/crear - Formulario de Creación de producto
router.get('/productos/crear', productoController.crearForm);

// POST /productos - Procesa creación de producto desde formulario
router.post('/productos', productoController.crear);

// GET /productos/:id/editar - Formulario de Edición de producto
router.get('/productos/:id/editar', productoController.editarForm);

// POST /productos/:id/editar - Procesa edición de producto desde formulario
router.post('/productos/:id/editar', productoController.editar);

module.exports = router;