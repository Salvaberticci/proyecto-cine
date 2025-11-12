// routes/admin.js - Rutas de administración (solo para admins)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { requireWebAuth, requireWebRole } = require('../middleware/auth');

// Todas las rutas aquí requieren autenticación de admin
router.use(requireWebAuth);
router.use(requireWebRole('admin'));

// GET /admin/usuarios - Listar usuarios
router.get('/usuarios', userController.listarUsuariosWeb);

// GET /admin/usuarios/crear - Mostrar formulario de creación
router.get('/usuarios/crear', userController.mostrarCrearUsuarioWeb);

// POST /admin/usuarios - Crear nuevo usuario
router.post('/usuarios', userController.crearUsuarioWeb);

// GET /admin/usuarios/:id/editar - Mostrar formulario de edición
router.get('/usuarios/:id/editar', userController.mostrarEditarUsuarioWeb);

// POST /admin/usuarios/:id/editar - Actualizar usuario
router.post('/usuarios/:id/editar', userController.editarUsuarioWeb);

// POST /admin/usuarios/:id/desactivar - Desactivar usuario
router.post('/usuarios/:id/desactivar', userController.desactivarUsuarioWeb);

// POST /admin/usuarios/:id/activar - Activar usuario
router.post('/usuarios/:id/activar', userController.activarUsuarioWeb);

module.exports = router;