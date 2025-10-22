// ProductoController.js - Clase controladora para la gestión de productos
// Implementa POO con ES6 classes, consume DBService con async/await y gestiona errores
// Maneja tanto rutas API (JSON) como rutas de vistas (EJS)

const dbService = require('../database/DBService');

class ProductoController {
  // ========== MÉTODOS PARA RUTAS API (Retornan JSON) ==========

  // GET /api/productos - Lista todos los productos
  async apiListar(req, res) {
    try {
      const productos = await dbService.getAllProductos();
      res.json({
        success: true,
        data: productos,
        count: productos.length
      });
    } catch (error) {
      console.error('Error en apiListar productos:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // GET /api/productos/:id - Muestra detalle de un producto por ID
  async apiObtener(req, res) {
    try {
      const { id } = req.params;
      const producto = await dbService.getProductoById(id);
      res.json({
        success: true,
        data: producto
      });
    } catch (error) {
      console.error('Error en apiObtener producto:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // POST /api/productos - Crea un nuevo producto
  async apiCrear(req, res) {
    try {
      const { nombre, descripcion, precio, stock } = req.body;

      // Validación básica
      if (!nombre || !descripcion || precio === undefined || stock === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos: nombre, descripcion, precio, stock'
        });
      }

      if (precio < 0 || stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Precio y stock deben ser valores positivos'
        });
      }

      const nuevoProducto = await dbService.createProducto({
        nombre,
        descripcion,
        precio,
        stock
      });

      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: nuevoProducto
      });
    } catch (error) {
      console.error('Error en apiCrear producto:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // PUT /api/productos/:id - Modifica todos los datos de un producto
  async apiActualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, stock } = req.body;

      // Validación básica
      if (!nombre || !descripcion || precio === undefined || stock === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Todos los campos son requeridos: nombre, descripcion, precio, stock'
        });
      }

      if (precio < 0 || stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Precio y stock deben ser valores positivos'
        });
      }

      const productoActualizado = await dbService.updateProducto(id, {
        nombre,
        descripcion,
        precio,
        stock
      });

      res.json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: productoActualizado
      });
    } catch (error) {
      console.error('Error en apiActualizar producto:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE /api/productos/:id - Elimina un producto por ID
  async apiEliminar(req, res) {
    try {
      const { id } = req.params;
      const productoEliminado = await dbService.deleteProducto(id);

      res.json({
        success: true,
        message: 'Producto eliminado exitosamente',
        data: productoEliminado
      });
    } catch (error) {
      console.error('Error en apiEliminar producto:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado'
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

  // GET /productos - Lista de productos
  async listar(req, res) {
    try {
      const productos = await dbService.getAllProductos();
      res.render('productos/listar', {
        title: 'Lista de Productos',
        productos: productos
      });
    } catch (error) {
      console.error('Error en listar productos:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar la lista de productos',
        error: error.message
      });
    }
  }

  // GET /productos/crear - Formulario de creación de producto
  crearForm(req, res) {
    res.render('productos/crear', {
      title: 'Crear Producto'
    });
  }

  // POST /productos - Procesa creación de producto desde formulario
  async crear(req, res) {
    try {
      const { nombre, descripcion, precio, stock } = req.body;

      // Validación básica
      if (!nombre || !descripcion || precio === undefined || stock === undefined) {
        return res.render('productos/crear', {
          title: 'Crear Producto',
          error: 'Todos los campos son requeridos',
          producto: req.body
        });
      }

      if (precio < 0 || stock < 0) {
        return res.render('productos/crear', {
          title: 'Crear Producto',
          error: 'Precio y stock deben ser valores positivos',
          producto: req.body
        });
      }

      await dbService.createProducto({
        nombre,
        descripcion,
        precio,
        stock
      });

      res.redirect('/productos');
    } catch (error) {
      console.error('Error en crear producto:', error);
      res.render('productos/crear', {
        title: 'Crear Producto',
        error: 'Error al crear el producto: ' + error.message,
        producto: req.body
      });
    }
  }

  // GET /productos/:id/editar - Formulario de edición de producto
  async editarForm(req, res) {
    try {
      const { id } = req.params;
      const producto = await dbService.getProductoById(id);

      res.render('productos/editar', {
        title: 'Editar Producto',
        producto: producto
      });
    } catch (error) {
      console.error('Error en editarForm producto:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).render('error', {
          title: 'Producto no encontrado',
          message: 'El producto que intenta editar no existe'
        });
      }
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el formulario de edición',
        error: error.message
      });
    }
  }

  // POST /productos/:id/editar - Procesa edición de producto desde formulario
  async editar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, stock } = req.body;

      // Validación básica
      if (!nombre || !descripcion || precio === undefined || stock === undefined) {
        const producto = await dbService.getProductoById(id);
        return res.render('productos/editar', {
          title: 'Editar Producto',
          error: 'Todos los campos son requeridos',
          producto: { ...producto, ...req.body }
        });
      }

      if (precio < 0 || stock < 0) {
        const producto = await dbService.getProductoById(id);
        return res.render('productos/editar', {
          title: 'Editar Producto',
          error: 'Precio y stock deben ser valores positivos',
          producto: { ...producto, ...req.body }
        });
      }

      await dbService.updateProducto(id, {
        nombre,
        descripcion,
        precio,
        stock
      });

      res.redirect('/productos');
    } catch (error) {
      console.error('Error en editar producto:', error);
      try {
        const producto = await dbService.getProductoById(req.params.id);
        res.render('productos/editar', {
          title: 'Editar Producto',
          error: 'Error al actualizar el producto: ' + error.message,
          producto: { ...producto, ...req.body }
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

module.exports = new ProductoController();