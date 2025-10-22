const express = require('express');
const router = express.Router();
const funcionesController = require('../controllers/FuncionesController');

// Rutas para funciones
router.get('/', funcionesController.listar);
router.get('/:id', funcionesController.obtener);
router.post('/', funcionesController.agregar);
router.put('/:id', funcionesController.modificar);
router.delete('/:id', funcionesController.eliminar);

module.exports = router;