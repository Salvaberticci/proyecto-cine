const express = require('express');
const router = express.Router();
const salasController = require('../controllers/SalasController');

// Rutas para salas
router.get('/', salasController.listar);
router.get('/:id', salasController.obtener);
router.post('/', salasController.agregar);
router.put('/:id', salasController.modificar);
router.delete('/:id', salasController.eliminar);

module.exports = router;