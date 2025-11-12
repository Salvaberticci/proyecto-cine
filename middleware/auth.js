// middleware/auth.js - Middleware de autenticación y autorización
const jwt = require('jsonwebtoken');

// Middleware para verificar JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token de acceso requerido'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token inválido o expirado'
      });
    }

    req.user = user; // Guardar información del usuario en la request
    next();
  });
};

// Middleware para verificar roles (RBAC - Role-Based Access Control)
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Acceso denegado. Rol requerido: ${allowedRoles.join(' o ')}. Tu rol: ${req.user.role}`
      });
    }

    next();
  };
};

// Middleware específico para admin
const requireAdmin = authorizeRoles('admin');

// Middleware específico para user o admin
const requireUserOrAdmin = authorizeRoles('user', 'admin');

// Middleware específico para guest, user o admin
const requireGuestOrHigher = authorizeRoles('guest', 'user', 'admin');

// Middleware opcional - si hay token, lo valida pero no es requerido
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }

  next();
};

// Middleware para verificar sesión web
const requireWebAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login?error=Debes iniciar sesión para acceder a esta página');
  }
  next();
};

// Middleware para verificar roles en sesiones web
const requireWebRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/login?error=Debes iniciar sesión para acceder a esta página');
    }

    const userRole = req.session.user.role;
    const roleHierarchy = { guest: 1, user: 2, admin: 3 };

    if (roleHierarchy[userRole] < roleHierarchy[requiredRole]) {
      return res.redirect('/dashboard?error=No tienes permisos suficientes para acceder a esta sección');
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  requireAdmin,
  requireUserOrAdmin,
  requireGuestOrHigher,
  optionalAuth,
  requireWebAuth,
  requireWebRole
};