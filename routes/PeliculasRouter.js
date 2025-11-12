const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/PeliculasController');
const { authenticateToken, requireUserOrAdmin, requireAdmin, requireWebAuth, requireWebRole } = require('../middleware/auth');

// ========== RUTAS API (Retornan JSON) ==========
// Prefijo: /api/peliculas

// GET /api/peliculas - Lista todas las películas (público)
router.get('/api/peliculas', peliculasController.apiListar);

// GET /api/peliculas/:id - Muestra detalle de una película por ID (público)
router.get('/api/peliculas/:id', peliculasController.apiObtener);

// POST /api/peliculas - Crea una nueva película (requiere user o admin)
router.post('/api/peliculas', authenticateToken, requireUserOrAdmin, peliculasController.apiCrear);

// PUT /api/peliculas/:id - Modifica todos los datos de una película (requiere user o admin)
router.put('/api/peliculas/:id', authenticateToken, requireUserOrAdmin, peliculasController.apiActualizar);

// DELETE /api/peliculas/:id - Elimina una película por ID (solo admin)
router.delete('/api/peliculas/:id', authenticateToken, requireAdmin, peliculasController.apiEliminar);

// ========== RUTAS DE VISTAS (Retornan HTML con EJS) ==========
// Prefijo: /peliculas

// GET /peliculas - Lista de películas (público)
router.get('/peliculas', peliculasController.listar);

// GET /peliculas/crear - Formulario de Creación de película (requiere user o admin)
router.get('/peliculas/crear', requireWebAuth, requireWebRole('user'), peliculasController.crearForm);

// POST /peliculas - Procesa creación de película desde formulario (requiere user o admin)
router.post('/peliculas', requireWebAuth, requireWebRole('user'), peliculasController.crear);

// GET /peliculas/:id/editar - Formulario de Edición de película (requiere user o admin)
router.get('/peliculas/:id/editar', requireWebAuth, requireWebRole('user'), peliculasController.editarForm);

// POST /peliculas/:id/editar - Procesa edición de película desde formulario (requiere user o admin)
router.post('/peliculas/:id/editar', requireWebAuth, requireWebRole('user'), peliculasController.editar);

// DELETE /peliculas/:id - Elimina una película (requiere admin)
router.delete('/peliculas/:id', requireWebAuth, requireWebRole('admin'), peliculasController.eliminar);

module.exports = router;