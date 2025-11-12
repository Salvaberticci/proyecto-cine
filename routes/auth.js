// routes/auth.js - Rutas de autenticación
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Rutas públicas (no requieren autenticación)
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/logout', userController.logout);

// Rutas protegidas (requieren autenticación)
router.get('/me', authenticateToken, userController.getProfile);

// Rutas de administración de usuarios (solo admin)
router.get('/usuarios', authenticateToken, requireAdmin, userController.apiListar);
router.get('/usuarios/:id', authenticateToken, requireAdmin, userController.apiObtener);
router.put('/usuarios/:id', authenticateToken, requireAdmin, userController.apiActualizar);
router.delete('/usuarios/:id', authenticateToken, requireAdmin, userController.apiEliminar);

module.exports = router;