// routes/auth.js - Rutas de autenticación
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authenticateToken, requireAdmin, requireWebAuth } = require('../middleware/auth');

// ========== RUTAS API (JSON) ==========

// Rutas públicas API (no requieren autenticación)
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/logout', userController.logout);

// Rutas protegidas API (requieren token JWT)
router.get('/me', authenticateToken, userController.getProfile);

// Rutas de administración API (solo admin)
router.get('/usuarios', authenticateToken, requireAdmin, userController.apiListar);
router.get('/usuarios/:id', authenticateToken, requireAdmin, userController.apiObtener);
router.put('/usuarios/:id', authenticateToken, requireAdmin, userController.apiActualizar);
router.delete('/usuarios/:id', authenticateToken, requireAdmin, userController.apiEliminar);


// ========== RUTAS WEB (HTML) ==========

// Página de login (pública)
router.get('/login', userController.showLoginForm);

// Procesar login web (crea sesión)
router.post('/login-web', userController.loginWeb);

// Logout web (destruye sesión)
router.post('/logout-web', userController.logoutWeb);

// Ruta GET para logout (útil para links)
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error('Error al cerrar sesión:', err);
    res.redirect('/login?success=Sesión cerrada exitosamente');
  });
});

module.exports = router;