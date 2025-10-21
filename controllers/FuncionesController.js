const dbService = require('../database/DBService');

class FuncionesController {
  // ========== MÉTODOS PARA RUTAS API (Retornan JSON) ==========

  // GET /api/funciones - Lista todas las funciones
  async apiListar(req, res) {
    try {
      const funciones = await dbService.getAllFunciones();
      res.json({
        success: true,
        data: funciones,
        count: funciones.length
      });
    } catch (error) {
      console.error('Error en apiListar funciones:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // GET /api/funciones/:id - Muestra detalle de una función por ID
  async apiObtener(req, res) {
    try {
      const { id } = req.params;
      const funcion = await dbService.getFuncionById(id);
      res.json({
        success: true,
        data: funcion
      });
    } catch (error) {
      console.error('Error en apiObtener función:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Función no encontrada'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // POST /api/funciones - Crea una nueva función
  async apiCrear(req, res) {
    try {
      const { id_pelicula, id_sala, fecha_hora } = req.body;

      // Validación básica
      if (!id_pelicula || !id_sala || !fecha_hora) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos: id_pelicula, id_sala, fecha_hora'
        });
      }

      const nuevaFuncion = await dbService.createFuncion({
        id_pelicula: parseInt(id_pelicula),
        id_sala: parseInt(id_sala),
        fecha_hora
      });

      res.status(201).json({
        success: true,
        message: 'Función creada exitosamente',
        data: nuevaFuncion
      });
    } catch (error) {
      console.error('Error en apiCrear función:', error);
      if (error.message.includes('Película no encontrada') || error.message.includes('Sala no encontrada')) {
        return res.status(400).json({
          success: false,
          message: 'Película o sala especificada no existe'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // PUT /api/funciones/:id - Modifica todos los datos de una función
  async apiActualizar(req, res) {
    try {
      const { id } = req.params;
      const { id_pelicula, id_sala, fecha_hora } = req.body;

      // Validación básica
      if (!id_pelicula || !id_sala || !fecha_hora) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos: id_pelicula, id_sala, fecha_hora'
        });
      }

      const funcionActualizada = await dbService.updateFuncion(id, {
        id_pelicula: parseInt(id_pelicula),
        id_sala: parseInt(id_sala),
        fecha_hora
      });

      res.json({
        success: true,
        message: 'Función actualizada exitosamente',
        data: funcionActualizada
      });
    } catch (error) {
      console.error('Error en apiActualizar función:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Función no encontrada'
        });
      }
      if (error.message.includes('Película no encontrada') || error.message.includes('Sala no encontrada')) {
        return res.status(400).json({
          success: false,
          message: 'Película o sala especificada no existe'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE /api/funciones/:id - Elimina una función por ID
  async apiEliminar(req, res) {
    try {
      const { id } = req.params;
      const funcionEliminada = await dbService.deleteFuncion(id);

      res.json({
        success: true,
        message: 'Función eliminada exitosamente',
        data: funcionEliminada
      });
    } catch (error) {
      console.error('Error en apiEliminar función:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Función no encontrada'
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

  // GET /funciones - Lista de funciones
  async listar(req, res) {
    try {
      const funciones = await dbService.getAllFunciones();
      // Obtener películas y salas para mostrar nombres en lugar de IDs
      const peliculas = await dbService.getAllPeliculas();
      const salas = await dbService.getAllSalas();

      const peliculasMap = peliculas.reduce((map, pelicula) => {
        map[pelicula.id_pelicula] = pelicula.titulo;
        return map;
      }, {});

      const salasMap = salas.reduce((map, sala) => {
        map[sala.id_sala] = sala.nombre;
        return map;
      }, {});

      res.render('funciones/listar', {
        title: 'Lista de Funciones',
        funciones: funciones,
        peliculasMap: peliculasMap,
        salasMap: salasMap
      });
    } catch (error) {
      console.error('Error en listar funciones:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar la lista de funciones',
        error: error.message
      });
    }
  }

  // GET /funciones/crear - Formulario de creación de función
  async crearForm(req, res) {
    try {
      const peliculas = await dbService.getAllPeliculas();
      const salas = await dbService.getAllSalas();
      res.render('funciones/crear', {
        title: 'Crear Función',
        peliculas: peliculas,
        salas: salas
      });
    } catch (error) {
      console.error('Error en crearForm función:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el formulario de creación',
        error: error.message
      });
    }
  }

  // POST /funciones - Procesa creación de función desde formulario
  async crear(req, res) {
    try {
      const { id_pelicula, id_sala, fecha_hora } = req.body;

      // Validación básica
      if (!id_pelicula || !id_sala || !fecha_hora) {
        const peliculas = await dbService.getAllPeliculas();
        const salas = await dbService.getAllSalas();
        return res.render('funciones/crear', {
          title: 'Crear Función',
          error: 'Los campos película, sala y fecha/hora son requeridos',
          peliculas: peliculas,
          salas: salas,
          funcion: req.body
        });
      }

      await dbService.createFuncion({
        id_pelicula: parseInt(id_pelicula),
        id_sala: parseInt(id_sala),
        fecha_hora
      });

      res.redirect('/funciones');
    } catch (error) {
      console.error('Error en crear función:', error);
      try {
        const peliculas = await dbService.getAllPeliculas();
        const salas = await dbService.getAllSalas();
        res.render('funciones/crear', {
          title: 'Crear Función',
          error: 'Error al crear la función: ' + error.message,
          peliculas: peliculas,
          salas: salas,
          funcion: req.body
        });
      } catch (dbError) {
        res.status(500).render('error', {
          title: 'Error',
          message: 'Error al procesar la creación',
          error: error.message
        });
      }
    }
  }

  // GET /funciones/:id/editar - Formulario de edición de función
  async editarForm(req, res) {
    try {
      const { id } = req.params;
      const funcion = await dbService.getFuncionById(id);
      const peliculas = await dbService.getAllPeliculas();
      const salas = await dbService.getAllSalas();

      res.render('funciones/editar', {
        title: 'Editar Función',
        funcion: funcion,
        peliculas: peliculas,
        salas: salas
      });
    } catch (error) {
      console.error('Error en editarForm función:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).render('error', {
          title: 'Función no encontrada',
          message: 'La función que intenta editar no existe'
        });
      }
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el formulario de edición',
        error: error.message
      });
    }
  }

  // POST /funciones/:id/editar - Procesa edición de función desde formulario
  async editar(req, res) {
    try {
      const { id } = req.params;
      const { id_pelicula, id_sala, fecha_hora } = req.body;

      // Validación básica
      if (!id_pelicula || !id_sala || !fecha_hora) {
        const funcion = await dbService.getFuncionById(id);
        const peliculas = await dbService.getAllPeliculas();
        const salas = await dbService.getAllSalas();
        return res.render('funciones/editar', {
          title: 'Editar Función',
          error: 'Los campos película, sala y fecha/hora son requeridos',
          funcion: { ...funcion, ...req.body },
          peliculas: peliculas,
          salas: salas
        });
      }

      await dbService.updateFuncion(id, {
        id_pelicula: parseInt(id_pelicula),
        id_sala: parseInt(id_sala),
        fecha_hora
      });

      res.redirect('/funciones');
    } catch (error) {
      console.error('Error en editar función:', error);
      try {
        const funcion = await dbService.getFuncionById(req.params.id);
        const peliculas = await dbService.getAllPeliculas();
        const salas = await dbService.getAllSalas();
        res.render('funciones/editar', {
          title: 'Editar Función',
          error: 'Error al actualizar la función: ' + error.message,
          funcion: { ...funcion, ...req.body },
          peliculas: peliculas,
          salas: salas
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

module.exports = new FuncionesController();