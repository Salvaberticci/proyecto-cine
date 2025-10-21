const express = require('express');
const router = express.Router();
const funcionesController = require('../controllers/FuncionesController');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/funciones

// GET /api/funciones - Lista todas las funciones
router.get('/api/funciones', funcionesController.apiListar);

// GET /api/funciones/:id - Muestra detalle de una función por ID
router.get('/api/funciones/:id', funcionesController.apiObtener);

// POST /api/funciones - Crea una nueva función
router.post('/api/funciones', funcionesController.apiCrear);

// PUT /api/funciones/:id - Modifica todos los datos de una función
router.put('/api/funciones/:id', funcionesController.apiActualizar);

// DELETE /api/funciones/:id - Elimina una función por ID
router.delete('/api/funciones/:id', funcionesController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /funciones

// GET /funciones - Lista de funciones
router.get('/funciones', funcionesController.listar);

// GET /funciones/crear - Formulario de Creación de función
router.get('/funciones/crear', funcionesController.crearForm);

// POST /funciones - Procesa creación de función desde formulario
router.post('/funciones', funcionesController.crear);

// GET /funciones/:id/editar - Formulario de Edición de función
router.get('/funciones/:id/editar', funcionesController.editarForm);

// POST /funciones/:id/editar - Procesa edición de función desde formulario
router.post('/funciones/:id/editar', funcionesController.editar);

module.exports = router;