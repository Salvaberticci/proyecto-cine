const express = require('express');
const router = express.Router();
const salasController = require('../controllers/SalasController');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/salas

// GET /api/salas - Lista todas las salas
router.get('/api/salas', salasController.apiListar);

// GET /api/salas/:id - Muestra detalle de una sala por ID
router.get('/api/salas/:id', salasController.apiObtener);

// POST /api/salas - Crea una nueva sala
router.post('/api/salas', salasController.apiCrear);

// PUT /api/salas/:id - Modifica todos los datos de una sala
router.put('/api/salas/:id', salasController.apiActualizar);

// DELETE /api/salas/:id - Elimina una sala por ID
router.delete('/api/salas/:id', salasController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /salas

// GET /salas - Lista de salas
router.get('/salas', salasController.listar);

// GET /salas/crear - Formulario de Creación de sala
router.get('/salas/crear', salasController.crearForm);

// POST /salas - Procesa creación de sala desde formulario
router.post('/salas', salasController.crear);

// GET /salas/:id/editar - Formulario de Edición de sala
router.get('/salas/:id/editar', salasController.editarForm);

// POST /salas/:id/editar - Procesa edición de sala desde formulario
router.post('/salas/:id/editar', salasController.editar);

module.exports = router;