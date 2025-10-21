const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/PeliculasController');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/peliculas

// GET /api/peliculas - Lista todas las películas
router.get('/api/peliculas', peliculasController.apiListar);

// GET /api/peliculas/:id - Muestra detalle de una película por ID
router.get('/api/peliculas/:id', peliculasController.apiObtener);

// POST /api/peliculas - Crea una nueva película
router.post('/api/peliculas', peliculasController.apiCrear);

// PUT /api/peliculas/:id - Modifica todos los datos de una película
router.put('/api/peliculas/:id', peliculasController.apiActualizar);

// DELETE /api/peliculas/:id - Elimina una película por ID
router.delete('/api/peliculas/:id', peliculasController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /peliculas

// GET /peliculas - Lista de películas
router.get('/peliculas', peliculasController.listar);

// GET /peliculas/crear - Formulario de Creación de película
router.get('/peliculas/crear', peliculasController.crearForm);

// POST /peliculas - Procesa creación de película desde formulario
router.post('/peliculas', peliculasController.crear);

// GET /peliculas/:id/editar - Formulario de Edición de película
router.get('/peliculas/:id/editar', peliculasController.editarForm);

// POST /peliculas/:id/editar - Procesa edición de película desde formulario
router.post('/peliculas/:id/editar', peliculasController.editar);

module.exports = router;