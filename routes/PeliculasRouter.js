const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/PeliculasController');

// Rutas para películas
router.get('/', peliculasController.listar);
router.get('/:id', peliculasController.obtener);
router.post('/', peliculasController.agregar);
router.put('/:id', peliculasController.modificar);
router.delete('/:id', peliculasController.eliminar);

module.exports = router;