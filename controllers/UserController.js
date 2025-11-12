// UserController.js - Controlador para gestión de usuarios y autenticación
// Implementa login con JWT, registro de usuarios y gestión de sesiones

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbService = require('../database/DBService');

class UserController {
  // ========== MÉTODOS PARA AUTENTICACIÓN ==========

  // POST /auth/login - Iniciar sesión
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validación básica
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username y password son requeridos'
        });
      }

      // Buscar usuario por username
      const user = await dbService.getUsuarioByUsername(username);

      // Verificar contraseña
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }

      // Generar JWT
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Retornar token y datos del usuario (sin password)
      res.json({
        success: true,
        message: 'Login exitoso',
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          },
          token: token
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      if (error.message.includes('Usuario no encontrado')) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // POST /auth/register - Registrar nuevo usuario
  async register(req, res) {
    try {
      const { username, email, password, role } = req.body;

      // Validación básica
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username, email y password son requeridos'
        });
      }

      // Validar formato de email básico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Formato de email inválido'
        });
      }

      // Validar longitud de password
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña debe tener al menos 6 caracteres'
        });
      }

      // Verificar que el username no existe
      try {
        await dbService.getUsuarioByUsername(username);
        return res.status(409).json({
          success: false,
          message: 'El username ya está en uso'
        });
      } catch (error) {
        // Si no encuentra el usuario, continuar (es lo esperado)
      }

      // Verificar que el email no existe
      try {
        await dbService.getUsuarioByEmail(email);
        return res.status(409).json({
          success: false,
          message: 'El email ya está registrado'
        });
      } catch (error) {
        // Si no encuentra el usuario, continuar (es lo esperado)
      }

      // Hash de la contraseña
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Crear usuario
      const nuevoUsuario = await dbService.createUsuario({
        username,
        email,
        password_hash: passwordHash,
        role: role || 'user' // Por defecto user, solo admin puede crear admin
      });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: nuevoUsuario
      });
    } catch (error) {
      console.error('Error en register:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // POST /auth/logout - Cerrar sesión (cliente debe eliminar token)
  logout(req, res) {
    res.json({
      success: true,
      message: 'Logout exitoso. Elimine el token del cliente.'
    });
  }

  // GET /auth/me - Obtener información del usuario actual
  async getProfile(req, res) {
    try {
      // El middleware de autenticación ya verificó el token y agregó user al req
      const user = await dbService.getUsuarioById(req.user.id);

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error en getProfile:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // ========== MÉTODOS PARA GESTIÓN DE USUARIOS (ADMIN) ==========

  // GET /api/usuarios - Lista todos los usuarios (solo admin)
  async apiListar(req, res) {
    try {
      const usuarios = await dbService.getAllUsuarios();
      res.json({
        success: true,
        data: usuarios,
        count: usuarios.length
      });
    } catch (error) {
      console.error('Error en apiListar usuarios:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // GET /api/usuarios/:id - Obtener usuario por ID (solo admin)
  async apiObtener(req, res) {
    try {
      const { id } = req.params;
      const usuario = await dbService.getUsuarioById(id);
      res.json({
        success: true,
        data: usuario
      });
    } catch (error) {
      console.error('Error en apiObtener usuario:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // PUT /api/usuarios/:id - Actualizar usuario (solo admin)
  async apiActualizar(req, res) {
    try {
      const { id } = req.params;
      const { username, email, role, activo } = req.body;

      // Validación básica
      if (!username || !email) {
        return res.status(400).json({
          success: false,
          message: 'Username y email son requeridos'
        });
      }

      const usuarioActualizado = await dbService.updateUsuario(id, {
        username,
        email,
        role,
        activo
      });

      res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        data: usuarioActualizado
      });
    } catch (error) {
      console.error('Error en apiActualizar usuario:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE /api/usuarios/:id - Desactivar usuario (solo admin)
  async apiEliminar(req, res) {
    try {
      const { id } = req.params;
      const usuarioEliminado = await dbService.deleteUsuario(id);

      res.json({
        success: true,
        message: 'Usuario desactivado exitosamente',
        data: usuarioEliminado
      });
    } catch (error) {
      console.error('Error en apiEliminar usuario:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
}

module.exports = new UserController();