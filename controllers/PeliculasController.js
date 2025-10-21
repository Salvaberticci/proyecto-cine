const dbService = require('../database/DBService');

class PeliculasController {
  // ========== MÉTODOS PARA RUTAS API (Retornan JSON) ==========

  // GET /api/peliculas - Lista todas las películas
  async apiListar(req, res) {
    try {
      const peliculas = await dbService.getAllPeliculas();
      res.json({
        success: true,
        data: peliculas,
        count: peliculas.length
      });
    } catch (error) {
      console.error('Error en apiListar películas:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // GET /api/peliculas/:id - Muestra detalle de una película por ID
  async apiObtener(req, res) {
    try {
      const { id } = req.params;
      const pelicula = await dbService.getPeliculaById(id);
      res.json({
        success: true,
        data: pelicula
      });
    } catch (error) {
      console.error('Error en apiObtener película:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Película no encontrada'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // POST /api/peliculas - Crea una nueva película
  async apiCrear(req, res) {
    try {
      const { titulo, anio, duracion } = req.body;

      // Validación básica
      if (!titulo || !anio || !duracion) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos: titulo, anio, duracion'
        });
      }

      if (anio < 1900 || anio > new Date().getFullYear() + 5) {
        return res.status(400).json({
          success: false,
          message: 'Año inválido'
        });
      }

      if (duracion <= 0) {
        return res.status(400).json({
          success: false,
          message: 'La duración debe ser un número positivo'
        });
      }

      const nuevaPelicula = await dbService.createPelicula({
        titulo,
        anio: parseInt(anio),
        duracion: parseInt(duracion)
      });

      res.status(201).json({
        success: true,
        message: 'Película creada exitosamente',
        data: nuevaPelicula
      });
    } catch (error) {
      console.error('Error en apiCrear película:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // PUT /api/peliculas/:id - Modifica todos los datos de una película
  async apiActualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anio, duracion } = req.body;

      // Validación básica
      if (!titulo || !anio || !duracion) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos: titulo, anio, duracion'
        });
      }

      if (anio < 1900 || anio > new Date().getFullYear() + 5) {
        return res.status(400).json({
          success: false,
          message: 'Año inválido'
        });
      }

      if (duracion <= 0) {
        return res.status(400).json({
          success: false,
          message: 'La duración debe ser un número positivo'
        });
      }

      const peliculaActualizada = await dbService.updatePelicula(id, {
        titulo,
        anio: parseInt(anio),
        duracion: parseInt(duracion)
      });

      res.json({
        success: true,
        message: 'Película actualizada exitosamente',
        data: peliculaActualizada
      });
    } catch (error) {
      console.error('Error en apiActualizar película:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Película no encontrada'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE /api/peliculas/:id - Elimina una película por ID
  async apiEliminar(req, res) {
    try {
      const { id } = req.params;
      const peliculaEliminada = await dbService.deletePelicula(id);

      res.json({
        success: true,
        message: 'Película eliminada exitosamente',
        data: peliculaEliminada
      });
    } catch (error) {
      console.error('Error en apiEliminar película:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Película no encontrada'
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

  // GET /peliculas - Lista de películas
  async listar(req, res) {
    try {
      const peliculas = await dbService.getAllPeliculas();
      res.render('peliculas/listar', {
        title: 'Lista de Películas',
        peliculas: peliculas
      });
    } catch (error) {
      console.error('Error en listar películas:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar la lista de películas',
        error: error.message
      });
    }
  }

  // GET /peliculas/crear - Formulario de creación de película
  crearForm(req, res) {
    res.render('peliculas/crear', {
      title: 'Crear Película'
    });
  }

  // POST /peliculas - Procesa creación de película desde formulario
  async crear(req, res) {
    try {
      const { titulo, anio, duracion } = req.body;

      // Validación básica
      if (!titulo || !anio || !duracion) {
        return res.render('peliculas/crear', {
          title: 'Crear Película',
          error: 'Todos los campos son requeridos',
          pelicula: req.body
        });
      }

      if (anio < 1900 || anio > new Date().getFullYear() + 5) {
        return res.render('peliculas/crear', {
          title: 'Crear Película',
          error: 'Año inválido',
          pelicula: req.body
        });
      }

      if (duracion <= 0) {
        return res.render('peliculas/crear', {
          title: 'Crear Película',
          error: 'La duración debe ser un número positivo',
          pelicula: req.body
        });
      }

      await dbService.createPelicula({
        titulo,
        anio: parseInt(anio),
        duracion: parseInt(duracion)
      });

      res.redirect('/peliculas');
    } catch (error) {
      console.error('Error en crear película:', error);
      res.render('peliculas/crear', {
        title: 'Crear Película',
        error: 'Error al crear la película: ' + error.message,
        pelicula: req.body
      });
    }
  }

  // GET /peliculas/:id/editar - Formulario de edición de película
  async editarForm(req, res) {
    try {
      const { id } = req.params;
      const pelicula = await dbService.getPeliculaById(id);

      res.render('peliculas/editar', {
        title: 'Editar Película',
        pelicula: pelicula
      });
    } catch (error) {
      console.error('Error en editarForm película:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).render('error', {
          title: 'Película no encontrada',
          message: 'La película que intenta editar no existe'
        });
      }
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el formulario de edición',
        error: error.message
      });
    }
  }

  // POST /peliculas/:id/editar - Procesa edición de película desde formulario
  async editar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, anio, duracion } = req.body;

      // Validación básica
      if (!titulo || !anio || !duracion) {
        const pelicula = await dbService.getPeliculaById(id);
        return res.render('peliculas/editar', {
          title: 'Editar Película',
          error: 'Todos los campos son requeridos',
          pelicula: { ...pelicula, ...req.body }
        });
      }

      if (anio < 1900 || anio > new Date().getFullYear() + 5) {
        const pelicula = await dbService.getPeliculaById(id);
        return res.render('peliculas/editar', {
          title: 'Editar Película',
          error: 'Año inválido',
          pelicula: { ...pelicula, ...req.body }
        });
      }

      if (duracion <= 0) {
        const pelicula = await dbService.getPeliculaById(id);
        return res.render('peliculas/editar', {
          title: 'Editar Película',
          error: 'La duración debe ser un número positivo',
          pelicula: { ...pelicula, ...req.body }
        });
      }

      await dbService.updatePelicula(id, {
        titulo,
        anio: parseInt(anio),
        duracion: parseInt(duracion)
      });

      res.redirect('/peliculas');
    } catch (error) {
      console.error('Error en editar película:', error);
      try {
        const pelicula = await dbService.getPeliculaById(req.params.id);
        res.render('peliculas/editar', {
          title: 'Editar Película',
          error: 'Error al actualizar la película: ' + error.message,
          pelicula: { ...pelicula, ...req.body }
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

module.exports = new PeliculasController();