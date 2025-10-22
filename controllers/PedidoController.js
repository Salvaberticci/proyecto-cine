// PedidoController.js - Clase controladora para la gestión de pedidos
// Implementa POO con ES6 classes, consume DBService con async/await y gestiona errores
// Maneja tanto rutas API (JSON) como rutas de vistas (EJS)

const dbService = require('../database/DBService');

class PedidoController {
  // ========== MÉTODOS PARA RUTAS API (Retornan JSON) ==========

  // GET /api/pedidos/ultimos - Muestra los últimos 5 pedidos ordenados por fecha
  async apiUltimos(req, res) {
    try {
      const pedidos = await dbService.getUltimosPedidos();
      res.json({
        success: true,
        data: pedidos,
        count: pedidos.length
      });
    } catch (error) {
      console.error('Error en apiUltimos pedidos:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // GET /api/pedidos - Lista todos los pedidos (no requerido específicamente pero útil)
  async apiListar(req, res) {
    try {
      const pedidos = await dbService.getAllPedidos();
      res.json({
        success: true,
        data: pedidos,
        count: pedidos.length
      });
    } catch (error) {
      console.error('Error en apiListar pedidos:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // GET /api/pedidos/:id - Muestra detalle de un pedido por ID (no requerido específicamente pero útil)
  async apiObtener(req, res) {
    try {
      const { id } = req.params;
      const pedido = await dbService.getPedidoById(id);
      res.json({
        success: true,
        data: pedido
      });
    } catch (error) {
      console.error('Error en apiObtener pedido:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Pedido no encontrado'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // POST /api/pedidos - Crea un nuevo pedido
  async apiCrear(req, res) {
    try {
      const { producto_id, cantidad } = req.body;

      // Validación básica
      if (!producto_id || !cantidad) {
        return res.status(400).json({
          success: false,
          message: 'Los campos producto_id y cantidad son requeridos'
        });
      }

      if (cantidad <= 0) {
        return res.status(400).json({
          success: false,
          message: 'La cantidad debe ser un número positivo'
        });
      }

      const nuevoPedido = await dbService.createPedido({
        producto_id,
        cantidad
      });

      res.status(201).json({
        success: true,
        message: 'Pedido creado exitosamente',
        data: nuevoPedido
      });
    } catch (error) {
      console.error('Error en apiCrear pedido:', error);
      if (error.message.includes('Producto no encontrado')) {
        return res.status(400).json({
          success: false,
          message: 'El producto especificado no existe'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // PUT /api/pedidos/:id - Actualizar pedido (no requerido específicamente pero implementado para completitud)
  async apiActualizar(req, res) {
    try {
      const { id } = req.params;
      const { producto_id, cantidad } = req.body;

      // Validación básica
      if (!producto_id || !cantidad) {
        return res.status(400).json({
          success: false,
          message: 'Los campos producto_id y cantidad son requeridos'
        });
      }

      if (cantidad <= 0) {
        return res.status(400).json({
          success: false,
          message: 'La cantidad debe ser un número positivo'
        });
      }

      const pedidoActualizado = await dbService.updatePedido(id, {
        producto_id,
        cantidad
      });

      res.json({
        success: true,
        message: 'Pedido actualizado exitosamente',
        data: pedidoActualizado
      });
    } catch (error) {
      console.error('Error en apiActualizar pedido:', error);
      if (error.message.includes('no encontrado')) {
        return res.status(404).json({
          success: false,
          message: 'Pedido no encontrado'
        });
      }
      if (error.message.includes('Producto no encontrado')) {
        return res.status(400).json({
          success: false,
          message: 'El producto especificado no existe'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }

  // DELETE /api/pedidos/:pedidoId/producto/:productoId - Elimina la relación específica entre un pedido y un producto
  async apiEliminarRelacion(req, res) {
    try {
      const { pedidoId, productoId } = req.params;
      const pedidoEliminado = await dbService.deletePedidoProducto(pedidoId, productoId);

      res.json({
        success: true,
        message: 'Relación pedido-producto eliminada exitosamente',
        data: pedidoEliminado
      });
    } catch (error) {
      console.error('Error en apiEliminarRelacion:', error);
      if (error.message.includes('no encontrada')) {
        return res.status(404).json({
          success: false,
          message: 'Relación pedido-producto no encontrada'
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

  // GET /pedidos - Lista de pedidos
  async listar(req, res) {
    try {
      const pedidos = await dbService.getAllPedidos();
      // Obtener productos para mostrar nombres en lugar de IDs
      const productos = await dbService.getAllProductos();
      const productosMap = productos.reduce((map, producto) => {
        map[producto.id] = producto.nombre;
        return map;
      }, {});

      res.render('pedidos/listar', {
        title: 'Lista de Pedidos',
        pedidos: pedidos,
        productosMap: productosMap
      });
    } catch (error) {
      console.error('Error en listar pedidos:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar la lista de pedidos',
        error: error.message
      });
    }
  }

  // GET /pedidos/crear - Formulario de creación de pedido
  async crearForm(req, res) {
    try {
      const productos = await dbService.getAllProductos();
      res.render('pedidos/crear', {
        title: 'Crear Pedido',
        productos: productos
      });
    } catch (error) {
      console.error('Error en crearForm pedido:', error);
      res.status(500).render('error', {
        title: 'Error',
        message: 'Error al cargar el formulario de creación',
        error: error.message
      });
    }
  }

  // POST /pedidos - Procesa creación de pedido desde formulario
  async crear(req, res) {
    try {
      const { producto_id, cantidad } = req.body;

      // Validación básica
      if (!producto_id || !cantidad) {
        const productos = await dbService.getAllProductos();
        return res.render('pedidos/crear', {
          title: 'Crear Pedido',
          error: 'Los campos producto y cantidad son requeridos',
          productos: productos,
          pedido: req.body
        });
      }

      if (cantidad <= 0) {
        const productos = await dbService.getAllProductos();
        return res.render('pedidos/crear', {
          title: 'Crear Pedido',
          error: 'La cantidad debe ser un número positivo',
          productos: productos,
          pedido: req.body
        });
      }

      await dbService.createPedido({
        producto_id,
        cantidad
      });

      res.redirect('/pedidos');
    } catch (error) {
      console.error('Error en crear pedido:', error);
      try {
        const productos = await dbService.getAllProductos();
        res.render('pedidos/crear', {
          title: 'Crear Pedido',
          error: 'Error al crear el pedido: ' + error.message,
          productos: productos,
          pedido: req.body
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
}

module.exports = new PedidoController();