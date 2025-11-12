const express = require('express');
const router = express.Router();
const funcionesController = require('../controllers/FuncionesController');
const { authenticateToken, requireUserOrAdmin, requireAdmin, requireWebAuth, requireWebRole } = require('../middleware/auth');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/funciones

// GET /api/funciones - Lista todas las funciones
router.get('/api/funciones', funcionesController.apiListar);

// GET /api/funciones/:id - Muestra detalle de una función por ID
router.get('/api/funciones/:id', funcionesController.apiObtener);

// POST /api/funciones - Crea una nueva función (requiere user o admin)
router.post('/api/funciones', authenticateToken, requireUserOrAdmin, funcionesController.apiCrear);

// PUT /api/funciones/:id - Modifica todos los datos de una función (requiere user o admin)
router.put('/api/funciones/:id', authenticateToken, requireUserOrAdmin, funcionesController.apiActualizar);

// DELETE /api/funciones/:id - Elimina una función por ID (solo admin)
router.delete('/api/funciones/:id', authenticateToken, requireAdmin, funcionesController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /funciones

// GET /funciones - Lista de funciones
router.get('/funciones', funcionesController.listar);

// GET /funciones/crear - Formulario de Creación de función (requiere user o admin)
router.get('/funciones/crear', requireWebAuth, requireWebRole('user'), funcionesController.crearForm);

// POST /funciones - Procesa creación de función desde formulario (requiere user o admin)
router.post('/funciones', requireWebAuth, requireWebRole('user'), funcionesController.crear);

// GET /funciones/:id/editar - Formulario de Edición de función (requiere user o admin)
router.get('/funciones/:id/editar', requireWebAuth, requireWebRole('user'), funcionesController.editarForm);

// POST /funciones/:id/editar - Procesa edición de función desde formulario (requiere user o admin)
router.post('/funciones/:id/editar', requireWebAuth, requireWebRole('user'), funcionesController.editar);

module.exports = router;