// middleware/auth.js - Middleware de autenticación y autorización
const jwt = require('jsonwebtoken');

// Middleware para verificar JWT o sesión web
const authenticateToken = (req, res, next) => {
  // Primero intentar con JWT (para APIs)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token) {
    // Si hay token JWT, usarlo
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
        return next();
      }
      // Si el token es inválido, continuar con verificación de sesión
    });
  }

  // Si no hay token JWT o es inválido, verificar sesión web
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  }

  // Si no hay ni token ni sesión, devolver error
  return res.status(401).json({
    success: false,
    message: 'Token de acceso requerido'
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

// Middleware específico para admin (acepta JWT o sesión)
const requireAdmin = (req, res, next) => {
  // Primero intentar con JWT
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err && user.role === 'admin') {
        req.user = user;
        return next();
      }
    });
  }

  // Si no hay token JWT válido, verificar sesión web
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    req.user = req.session.user;
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Token de acceso requerido o permisos de administrador necesarios'
  });
};

// Middleware específico para user o admin (acepta JWT o sesión)
const requireUserOrAdmin = (req, res, next) => {
  // Primero intentar con JWT
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err && (user.role === 'user' || user.role === 'admin')) {
        req.user = user;
        return next();
      }
    });
  }

  // Si no hay token JWT válido, verificar sesión web
  if (req.session && req.session.user) {
    const userRole = req.session.user.role;
    if (userRole === 'user' || userRole === 'admin') {
      req.user = req.session.user;
      return next();
    }
  }

  return res.status(401).json({
    success: false,
    message: 'Token de acceso requerido o permisos insuficientes'
  });
};

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