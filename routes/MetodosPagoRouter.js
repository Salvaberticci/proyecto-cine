const express = require('express');
const router = express.Router();
const metodosPagoController = require('../controllers/MetodosPagoController');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/metodospago

// GET /api/metodospago - Lista todos los métodos de pago
router.get('/api/metodospago', metodosPagoController.apiListar);

// GET /api/metodospago/:id - Muestra detalle de un método de pago por ID
router.get('/api/metodospago/:id', metodosPagoController.apiObtener);

// POST /api/metodospago - Crea un nuevo método de pago
router.post('/api/metodospago', metodosPagoController.apiCrear);

// PUT /api/metodospago/:id - Modifica todos los datos de un método de pago
router.put('/api/metodospago/:id', metodosPagoController.apiActualizar);

// DELETE /api/metodospago/:id - Elimina un método de pago por ID
router.delete('/api/metodospago/:id', metodosPagoController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /metodospago

// GET /metodospago - Lista de métodos de pago
router.get('/metodospago', metodosPagoController.listar);

// GET /metodospago/crear - Formulario de Creación de método de pago
router.get('/metodospago/crear', metodosPagoController.crearForm);

// POST /metodospago - Procesa creación de método de pago desde formulario
router.post('/metodospago', metodosPagoController.crear);

// GET /metodospago/:id/editar - Formulario de Edición de método de pago
router.get('/metodospago/:id/editar', metodosPagoController.editarForm);

// POST /metodospago/:id/editar - Procesa edición de método de pago desde formulario
router.post('/metodospago/:id/editar', metodosPagoController.editar);

module.exports = router;