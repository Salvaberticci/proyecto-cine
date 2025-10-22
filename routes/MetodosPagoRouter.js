const express = require('express');
const router = express.Router();
const metodosPagoController = require('../controllers/MetodosPagoController');

// Rutas para métodos de pago
router.get('/', metodosPagoController.listar);
router.get('/:id', metodosPagoController.obtener);
router.post('/', metodosPagoController.agregar);
router.put('/:id', metodosPagoController.modificar);
router.delete('/:id', metodosPagoController.eliminar);

module.exports = router;