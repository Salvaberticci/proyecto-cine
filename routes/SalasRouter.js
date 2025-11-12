const express = require('express');
const router = express.Router();
const salasController = require('../controllers/SalasController');
const { authenticateToken, requireUserOrAdmin, requireAdmin, requireWebAuth, requireWebRole } = require('../middleware/auth');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/salas

// GET /api/salas - Lista todas las salas
router.get('/api/salas', salasController.apiListar);

// GET /api/salas/:id - Muestra detalle de una sala por ID
router.get('/api/salas/:id', salasController.apiObtener);

// POST /api/salas - Crea una nueva sala (requiere user o admin)
router.post('/api/salas', authenticateToken, requireUserOrAdmin, salasController.apiCrear);

// PUT /api/salas/:id - Modifica todos los datos de una sala (requiere user o admin)
router.put('/api/salas/:id', authenticateToken, requireUserOrAdmin, salasController.apiActualizar);

// DELETE /api/salas/:id - Elimina una sala por ID (solo admin)
router.delete('/api/salas/:id', authenticateToken, requireAdmin, salasController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /salas

// GET /salas - Lista de salas
router.get('/salas', salasController.listar);

// GET /salas/crear - Formulario de Creación de sala (requiere user o admin)
router.get('/salas/crear', requireWebAuth, requireWebRole('user'), salasController.crearForm);

// POST /salas - Procesa creación de sala desde formulario (requiere user o admin)
router.post('/salas', requireWebAuth, requireWebRole('user'), salasController.crear);

// GET /salas/:id/editar - Formulario de Edición de sala (requiere user o admin)
router.get('/salas/:id/editar', requireWebAuth, requireWebRole('user'), salasController.editarForm);

// POST /salas/:id/editar - Procesa edición de sala desde formulario (requiere user o admin)
router.post('/salas/:id/editar', requireWebAuth, requireWebRole('user'), salasController.editar);

module.exports = router;