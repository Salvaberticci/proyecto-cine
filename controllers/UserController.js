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

  // ========== MÉTODOS PARA AUTENTICACIÓN WEB (CON SESIONES) ==========

  // GET /login - Mostrar formulario de login
  showLoginForm(req, res) {
    // Si ya está logueado, redirigir al dashboard
    if (req.session.user) {
      return res.redirect('/dashboard');
    }

    res.render('login', {
      title: 'Iniciar Sesión',
      error: req.query.error,
      success: req.query.success
    });
  }

  // POST /auth/login-web - Procesar login web con sesiones
  async loginWeb(req, res) {
    try {
      const { username, password } = req.body;

      // Validación básica
      if (!username || !password) {
        return res.render('login', {
          title: 'Iniciar Sesión',
          error: 'Usuario y contraseña son requeridos'
        });
      }

      // Buscar usuario por username
      const user = await dbService.getUsuarioByUsername(username);

      // Verificar contraseña
      const bcrypt = require('bcrypt');
      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.render('login', {
          title: 'Iniciar Sesión',
          error: 'Credenciales inválidas'
        });
      }

      // Crear sesión
      req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      // Redirigir al dashboard
      res.redirect('/dashboard');

    } catch (error) {
      console.error('Error en loginWeb:', error);
      res.render('login', {
        title: 'Iniciar Sesión',
        error: 'Error al iniciar sesión: ' + error.message
      });
    }
  }

  // POST /auth/logout-web - Cerrar sesión web
  logoutWeb(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/login');
    });
  }

  // ========== MÉTODOS PARA GESTIÓN WEB DE USUARIOS (ADMIN) ==========

  // GET /admin/usuarios - Listar usuarios (solo admin)
  async listarUsuariosWeb(req, res) {
    try {
      const usuarios = await dbService.getAllUsuarios();
      res.render('admin/usuarios', {
        title: 'Gestión de Usuarios',
        user: req.session.user,
        usuarios: usuarios,
        error: req.query.error,
        success: req.query.success
      });
    } catch (error) {
      console.error('Error en listarUsuariosWeb:', error);
      res.render('admin/usuarios', {
        title: 'Gestión de Usuarios',
        user: req.session.user,
        usuarios: [],
        error: 'Error al cargar usuarios: ' + error.message
      });
    }
  }

  // GET /admin/usuarios/crear - Mostrar formulario de creación (solo admin)
  mostrarCrearUsuarioWeb(req, res) {
    res.render('admin/crear_usuario', {
      title: 'Crear Usuario',
      user: req.session.user,
      error: req.query.error
    });
  }

  // GET /admin/usuarios/:id/editar - Mostrar formulario de edición (solo admin)
  async mostrarEditarUsuarioWeb(req, res) {
    try {
      const { id } = req.params;
      const usuario = await dbService.getUsuarioById(id);

      res.render('admin/editar_usuario', {
        title: 'Editar Usuario',
        user: req.session.user,
        usuario: usuario,
        error: req.query.error
      });
    } catch (error) {
      console.error('Error en mostrarEditarUsuarioWeb:', error);
      res.redirect('/admin/usuarios?error=Usuario no encontrado');
    }
  }

  // POST /admin/usuarios/:id/desactivar - Desactivar usuario (solo admin)
  async desactivarUsuarioWeb(req, res) {
    try {
      const { id } = req.params;

      // No permitir desactivar al propio usuario
      if (parseInt(id) === req.session.user.id) {
        return res.redirect('/admin/usuarios?error=No puedes desactivar tu propia cuenta');
      }

      await dbService.deleteUsuario(id);
      res.redirect('/admin/usuarios?success=Usuario desactivado exitosamente');
    } catch (error) {
      console.error('Error en desactivarUsuarioWeb:', error);
      res.redirect('/admin/usuarios?error=Error al desactivar usuario: ' + error.message);
    }
  }

  // POST /admin/usuarios/:id/activar - Activar usuario (solo admin)
  async activarUsuarioWeb(req, res) {
    try {
      const { id } = req.params;
      const usuario = await dbService.getUsuarioById(id);

      // Reactivar usuario cambiando activo a true
      await dbService.updateUsuario(id, {
        username: usuario.username,
        email: usuario.email,
        role: usuario.role,
        activo: 1
      });

      res.redirect('/admin/usuarios?success=Usuario activado exitosamente');
    } catch (error) {
      console.error('Error en activarUsuarioWeb:', error);
      res.redirect('/admin/usuarios?error=Error al activar usuario: ' + error.message);
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

  // POST /admin/usuarios - Crear nuevo usuario (web)
  async crearUsuarioWeb(req, res) {
    try {
      const { username, email, password, role } = req.body;

      // Validación básica
      if (!username || !email || !password) {
        return res.redirect('/admin/usuarios?error=Username, email y password son requeridos');
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.redirect('/admin/usuarios?error=Formato de email inválido');
      }

      // Validar longitud de password
      if (password.length < 6) {
        return res.redirect('/admin/usuarios?error=La contraseña debe tener al menos 6 caracteres');
      }

      // Verificar que el username no existe
      try {
        await dbService.getUsuarioByUsername(username);
        return res.redirect('/admin/usuarios?error=El username ya está en uso');
      } catch (error) {
        // Si no encuentra el usuario, continuar (es lo esperado)
      }

      // Verificar que el email no existe
      try {
        await dbService.getUsuarioByEmail(email);
        return res.redirect('/admin/usuarios?error=El email ya está registrado');
      } catch (error) {
        // Si no encuentra el usuario, continuar (es lo esperado)
      }

      // Hash de la contraseña
      const bcrypt = require('bcrypt');
      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      // Crear usuario
      await dbService.createUsuario({
        username,
        email,
        password_hash: passwordHash,
        role: role || 'user'
      });

      res.redirect('/admin/usuarios?success=Usuario creado exitosamente');
    } catch (error) {
      console.error('Error en crearUsuarioWeb:', error);
      res.redirect('/admin/usuarios?error=Error al crear usuario: ' + error.message);
    }
  }

  // POST /admin/usuarios/:id/editar - Actualizar usuario (web)
  async editarUsuarioWeb(req, res) {
    try {
      const { id } = req.params;
      const { username, email, role, activo } = req.body;

      // Validación básica
      if (!username || !email) {
        return res.redirect(`/admin/usuarios/${id}/editar?error=Username y email son requeridos`);
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.redirect(`/admin/usuarios/${id}/editar?error=Formato de email inválido`);
      }

      // Verificar que el username no existe (excepto para el usuario actual)
      try {
        const existingUser = await dbService.getUsuarioByUsername(username);
        if (existingUser.id !== parseInt(id)) {
          return res.redirect(`/admin/usuarios/${id}/editar?error=El username ya está en uso`);
        }
      } catch (error) {
        // Si no encuentra el usuario, continuar (es lo esperado)
      }

      // Verificar que el email no existe (excepto para el usuario actual)
      try {
        const existingUser = await dbService.getUsuarioByEmail(email);
        if (existingUser.id !== parseInt(id)) {
          return res.redirect(`/admin/usuarios/${id}/editar?error=El email ya está registrado`);
        }
      } catch (error) {
        // Si no encuentra el usuario, continuar (es lo esperado)
      }

      // Actualizar usuario
      await dbService.updateUsuario(id, {
        username,
        email,
        role,
        activo: activo ? 1 : 0
      });

      res.redirect('/admin/usuarios?success=Usuario actualizado exitosamente');
    } catch (error) {
      console.error('Error en editarUsuarioWeb:', error);
      res.redirect(`/admin/usuarios/${req.params.id}/editar?error=Error al actualizar usuario: ${error.message}`);
    }
  }
}

module.exports = new UserController();