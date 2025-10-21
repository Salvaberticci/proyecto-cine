const dbService = require('../database/DBService');

class SalasController {
  // ========== MÉTODOS PARA RUTAS API (Retornan JSON) ==========

  // GET /api/salas - Lista todas las salas
  async apiListar(req, res) {
    try {
      const salas = await dbService.getAllSalas();
      res.json({
        success: true,
        data: salas,
        count: salas.length
      });
    } catch (error) {
      console.error('Error en apiListar salas:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // GET /api/salas/:id - Muestra detalle de una sala por ID
  async apiObtener(req, res) {
    try {
      const { id } = req.params;
      const sala = await dbService.getSalaById(id);
      res.json({
        success: true,
        data: sala
      });
    } catch (error) {
      console.error('Error en apiObtener sala:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Sala no encontrada'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // POST /api/salas - Crea una nueva sala
  async apiCrear(req, res) {
    try {
      const { nombre, capacidad } = req.body;

      // Validación básica
      if (!nombre || capacidad === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Los campos nombre y capacidad son requeridos'
        });
      }

      if (capacidad <= 0) {
        return res.status(400).json({
          success: false,
          message: 'La capacidad debe ser un número positivo'
        });
      }

      const nuevaSala = await dbService.createSala({
        nombre,
        capacidad: parseInt(capacidad)
      });

      res.status(201).json({
        success: true,
        message: 'Sala creada exitosamente',
        data: nuevaSala
      });
    } catch (error) {
      console.error('Error en apiCrear sala:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // PUT /api/salas/:id - Modifica todos los datos de una sala
  async apiActualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, capacidad } = req.body;

      // Validación básica
      if (!nombre || capacidad === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Los campos nombre y capacidad son requeridos'
        });
      }

      if (capacidad <= 0) {
        return res.status(400).json({
          success: false,
          message: 'La capacidad debe ser un número positivo'
        });
      }

      const salaActualizada = await dbService.updateSala(id, {
        nombre,
        capacidad: parseInt(capacidad)
      });

      res.json({
        success: true,
        message: 'Sala actualizada exitosamente',
        data: salaActualizada
      });
    } catch (error) {
      console.error('Error en apiActualizar sala:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Sala no encontrada'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE /api/salas/:id - Elimina una sala por ID
  async apiEliminar(req, res) {
    try {
      const { id } = req.params;
      const salaEliminada = await dbService.deleteSala(id);

      res.json({
        success: true,
        message: 'Sala eliminada exitosamente',
        data: salaEliminada
      });
    } catch (error) {
      console.error('Error en apiEliminar sala:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Sala no encontrada'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // ========== MÉTODOS PARA RUTAS DE VISTAS (Retornan HTML con EJS) ==========

  // GET /salas - Lista de salas
  async listar(req, res) {
    try {
      const salas = await dbService.getAllSalas();
      res.render('salas/listar', {
        title: 'Lista de Salas',
        salas: salas
      });
    } catch (error) {
      console.error('Error en listar salas:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar la lista de salas',
        error: error.message
      });
    }
  }

  // GET /salas/crear - Formulario de creación de sala
  crearForm(req, res) {
    res.render('salas/crear', {
      title: 'Crear Sala'
    });
  }

  // POST /salas - Procesa creación de sala desde formulario
  async crear(req, res) {
    try {
      const { nombre, capacidad } = req.body;

      // Validación básica
      if (!nombre || capacidad === undefined) {
        return res.render('salas/crear', {
          title: 'Crear Sala',
          error: 'Los campos nombre y capacidad son requeridos',
          sala: req.body
        });
      }

      if (capacidad <= 0) {
        return res.render('salas/crear', {
          title: 'Crear Sala',
          error: 'La capacidad debe ser un número positivo',
          sala: req.body
        });
      }

      await dbService.createSala({
        nombre,
        capacidad: parseInt(capacidad)
      });

      res.redirect('/salas');
    } catch (error) {
      console.error('Error en crear sala:', error);
      res.render('salas/crear', {
        title: 'Crear Sala',
        error: 'Error al crear la sala: ' + error.message,
        sala: req.body
      });
    }
  }

  // GET /salas/:id/editar - Formulario de edición de sala
  async editarForm(req, res) {
    try {
      const { id } = req.params;
      const sala = await dbService.getSalaById(id);

      res.render('salas/editar', {
        title: 'Editar Sala',
        sala: sala
      });
    } catch (error) {
      console.error('Error en editarForm sala:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).render('error', {
          title: 'Sala no encontrada',
          message: 'La sala que intenta editar no existe'
        });
      }
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el formulario de edición',
        error: error.message
      });
    }
  }

  // POST /salas/:id/editar - Procesa edición de sala desde formulario
  async editar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, capacidad } = req.body;

      // Validación básica
      if (!nombre || capacidad === undefined) {
        const sala = await dbService.getSalaById(id);
        return res.render('salas/editar', {
          title: 'Editar Sala',
          error: 'Los campos nombre y capacidad son requeridos',
          sala: { ...sala, ...req.body }
        });
      }

      if (capacidad <= 0) {
        const sala = await dbService.getSalaById(id);
        return res.render('salas/editar', {
          title: 'Editar Sala',
          error: 'La capacidad debe ser un número positivo',
          sala: { ...sala, ...req.body }
        });
      }

      await dbService.updateSala(id, {
        nombre,
        capacidad: parseInt(capacidad)
      });

      res.redirect('/salas');
    } catch (error) {
      console.error('Error en editar sala:', error);
      try {
        const sala = await dbService.getSalaById(req.params.id);
        res.render('salas/editar', {
          title: 'Editar Sala',
          error: 'Error al actualizar la sala: ' + error.message,
          sala: { ...sala, ...req.body }
        });
      } catch (dbError) {
        res.status(500).render('error', {
          title: 'Error',
          message: 'Error al procesar la edición',
          error: error.message
        });
      }
    }
  }
}

module.exports = new SalasController();