// DBService.js - Clase que encapsula la conexión y consultas a la BD MySQL
// Utiliza mysql2 con Promesas para operaciones asíncronas reales de BD
// Aplica el principio de Separación de Intereses (SoC) manteniendo la lógica de BD separada

const mysql = require('mysql2/promise');
require('dotenv').config();

class DBService {
  constructor() {
    this.connection = null;
    this.initConnection();
  }

  // Inicializar conexión a la base de datos
  async initConnection() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      });
      console.log('Conexión a la base de datos establecida exitosamente');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      throw error;
    }
  }

  // ========== MÉTODOS CRUD PARA PRODUCTOS ==========

  // CREATE - Crear un nuevo producto
  async createProducto(productoData) {
    try {
      const query = `
        INSERT INTO productos (nombre, descripcion, precio, stock, fecha_creacion)
        VALUES (?, ?, ?, ?, CURDATE())
      `;
      const [result] = await this.connection.execute(query, [
        productoData.nombre,
        productoData.descripcion,
        parseFloat(productoData.precio),
        parseInt(productoData.stock)
      ]);

      // Obtener el producto creado
      const [rows] = await this.connection.execute(
        'SELECT * FROM productos WHERE id = ?',
        [result.insertId]
      );

      return rows[0];
    } catch (error) {
      throw new Error('Error al crear producto: ' + error.message);
    }
  }

  // READ - Obtener todos los productos
  async getAllProductos() {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM productos ORDER BY id DESC');
      // Convertir precio a número para compatibilidad con vistas EJS
      return rows.map(producto => ({
        ...producto,
        precio: parseFloat(producto.precio)
      }));
    } catch (error) {
      throw new Error('Error al obtener productos: ' + error.message);
    }
  }

  // READ - Obtener producto por ID
  async getProductoById(id) {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM productos WHERE id = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Producto no encontrado');
      }

      // Convertir precio a número para compatibilidad con vistas EJS
      return {
        ...rows[0],
        precio: parseFloat(rows[0].precio)
      };
    } catch (error) {
      if (error.message.includes('Producto no encontrado')) {
        throw error;
      }
      throw new Error('Error al obtener producto: ' + error.message);
    }
  }

  // UPDATE - Actualizar producto completo
  async updateProducto(id, productoData) {
    try {
      const query = `
        UPDATE productos
        SET nombre = ?, descripcion = ?, precio = ?, stock = ?
        WHERE id = ?
      `;
      const [result] = await this.connection.execute(query, [
        productoData.nombre,
        productoData.descripcion,
        parseFloat(productoData.precio),
        parseInt(productoData.stock),
        parseInt(id)
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Producto no encontrado');
      }

      // Obtener el producto actualizado
      const [rows] = await this.connection.execute(
        'SELECT * FROM productos WHERE id = ?',
        [parseInt(id)]
      );

      return {
        ...rows[0],
        precio: parseFloat(rows[0].precio)
      };
    } catch (error) {
      if (error.message.includes('Producto no encontrado')) {
        throw error;
      }
      throw new Error('Error al actualizar producto: ' + error.message);
    }
  }

  // DELETE - Eliminar producto por ID
  async deleteProducto(id) {
    try {
      // Primero verificar que el producto existe y obtener sus datos
      const [rows] = await this.connection.execute(
        'SELECT * FROM productos WHERE id = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Producto no encontrado');
      }

      // Eliminar el producto
      await this.connection.execute('DELETE FROM productos WHERE id = ?', [parseInt(id)]);

      return {
        ...rows[0],
        precio: parseFloat(rows[0].precio)
      };
    } catch (error) {
      if (error.message.includes('Producto no encontrado')) {
        throw error;
      }
      throw new Error('Error al eliminar producto: ' + error.message);
    }
  }

  // ========== MÉTODOS CRUD PARA PEDIDOS ==========

  // CREATE - Crear un nuevo pedido
  async createPedido(pedidoData) {
    try {
      // Verificar que el producto existe
      await this.getProductoById(pedidoData.producto_id);

      const query = `
        INSERT INTO pedidos (producto_id, cantidad, fecha_pedido)
        VALUES (?, ?, CURDATE())
      `;
      const [result] = await this.connection.execute(query, [
        parseInt(pedidoData.producto_id),
        parseInt(pedidoData.cantidad)
      ]);

      // Obtener el pedido creado
      const [rows] = await this.connection.execute(
        'SELECT * FROM pedidos WHERE id = ?',
        [result.insertId]
      );

      return rows[0];
    } catch (error) {
      throw new Error('Error al crear pedido: ' + error.message);
    }
  }

  // READ - Obtener todos los pedidos
  async getAllPedidos() {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM pedidos ORDER BY id DESC');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener pedidos: ' + error.message);
    }
  }

  // READ - Obtener los últimos 5 pedidos ordenados por fecha
  async getUltimosPedidos() {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM pedidos ORDER BY fecha_pedido DESC, id DESC LIMIT 5'
      );
      return rows;
    } catch (error) {
      throw new Error('Error al obtener últimos pedidos: ' + error.message);
    }
  }

  // READ - Obtener pedido por ID
  async getPedidoById(id) {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM pedidos WHERE id = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Pedido no encontrado');
      }

      return rows[0];
    } catch (error) {
      if (error.message.includes('Pedido no encontrado')) {
        throw error;
      }
      throw new Error('Error al obtener pedido: ' + error.message);
    }
  }

  // UPDATE - Actualizar pedido completo
  async updatePedido(id, pedidoData) {
    try {
      // Verificar que el producto existe
      await this.getProductoById(pedidoData.producto_id);

      const query = `
        UPDATE pedidos
        SET producto_id = ?, cantidad = ?
        WHERE id = ?
      `;
      const [result] = await this.connection.execute(query, [
        parseInt(pedidoData.producto_id),
        parseInt(pedidoData.cantidad),
        parseInt(id)
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Pedido no encontrado');
      }

      // Obtener el pedido actualizado
      const [rows] = await this.connection.execute(
        'SELECT * FROM pedidos WHERE id = ?',
        [parseInt(id)]
      );

      return rows[0];
    } catch (error) {
      if (error.message.includes('Pedido no encontrado')) {
        throw error;
      }
      throw new Error('Error al actualizar pedido: ' + error.message);
    }
  }

  // DELETE - Eliminar pedido por ID
  async deletePedido(id) {
    try {
      // Primero verificar que el pedido existe y obtener sus datos
      const [rows] = await this.connection.execute(
        'SELECT * FROM pedidos WHERE id = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Pedido no encontrado');
      }

      // Eliminar el pedido
      await this.connection.execute('DELETE FROM pedidos WHERE id = ?', [parseInt(id)]);

      return rows[0];
    } catch (error) {
      if (error.message.includes('Pedido no encontrado')) {
        throw error;
      }
      throw new Error('Error al eliminar pedido: ' + error.message);
    }
  }

  // DELETE - Eliminar relación específica entre pedido y producto
  async deletePedidoProducto(pedidoId, productoId) {
    try {
      const query = `
        DELETE FROM pedidos
        WHERE id = ? AND producto_id = ?
      `;
      const [result] = await this.connection.execute(query, [
        parseInt(pedidoId),
        parseInt(productoId)
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Relación pedido-producto no encontrada');
      }

      return { id: parseInt(pedidoId), producto_id: parseInt(productoId) };
    } catch (error) {
      if (error.message.includes('Relación pedido-producto no encontrada')) {
        throw error;
      }
      throw new Error('Error al eliminar relación pedido-producto: ' + error.message);
    }
  }

  // ========== MÉTODOS CRUD PARA PELÍCULAS ==========

  // CREATE - Crear una nueva película
  async createPelicula(peliculaData) {
    try {
      const query = `
        INSERT INTO peliculas (titulo, anio, duracion)
        VALUES (?, ?, ?)
      `;
      const [result] = await this.connection.execute(query, [
        peliculaData.titulo,
        parseInt(peliculaData.anio),
        parseInt(peliculaData.duracion)
      ]);

      // Obtener la película creada
      const [rows] = await this.connection.execute(
        'SELECT * FROM peliculas WHERE id_pelicula = ?',
        [result.insertId]
      );

      return rows[0];
    } catch (error) {
      throw new Error('Error al crear película: ' + error.message);
    }
  }

  // READ - Obtener todas las películas
  async getAllPeliculas() {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM peliculas ORDER BY id_pelicula DESC');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener películas: ' + error.message);
    }
  }

  // READ - Obtener película por ID
  async getPeliculaById(id) {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM peliculas WHERE id_pelicula = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Película no encontrada');
      }

      return rows[0];
    } catch (error) {
      if (error.message.includes('Película no encontrada')) {
        throw error;
      }
      throw new Error('Error al obtener película: ' + error.message);
    }
  }

  // UPDATE - Actualizar película completa
  async updatePelicula(id, peliculaData) {
    try {
      const query = `
        UPDATE peliculas
        SET titulo = ?, anio = ?, duracion = ?
        WHERE id_pelicula = ?
      `;
      const [result] = await this.connection.execute(query, [
        peliculaData.titulo,
        parseInt(peliculaData.anio),
        parseInt(peliculaData.duracion),
        parseInt(id)
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Película no encontrada');
      }

      // Obtener la película actualizada
      const [rows] = await this.connection.execute(
        'SELECT * FROM peliculas WHERE id_pelicula = ?',
        [parseInt(id)]
      );

      return rows[0];
    } catch (error) {
      if (error.message.includes('Película no encontrada')) {
        throw error;
      }
      throw new Error('Error al actualizar película: ' + error.message);
    }
  }

  // DELETE - Eliminar película por ID
  async deletePelicula(id) {
    try {
      // Primero verificar que la película existe y obtener sus datos
      const [rows] = await this.connection.execute(
        'SELECT * FROM peliculas WHERE id_pelicula = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Película no encontrada');
      }

      // Eliminar la película
      await this.connection.execute('DELETE FROM peliculas WHERE id_pelicula = ?', [parseInt(id)]);

      return rows[0];
    } catch (error) {
      if (error.message.includes('Película no encontrada')) {
        throw error;
      }
      throw new Error('Error al eliminar película: ' + error.message);
    }
  }

  // ========== MÉTODOS CRUD PARA SALAS ==========

  // CREATE - Crear una nueva sala
  async createSala(salaData) {
    try {
      const query = `
        INSERT INTO salas (nombre, capacidad)
        VALUES (?, ?)
      `;
      const [result] = await this.connection.execute(query, [
        salaData.nombre,
        parseInt(salaData.capacidad)
      ]);

      // Obtener la sala creada
      const [rows] = await this.connection.execute(
        'SELECT * FROM salas WHERE id_sala = ?',
        [result.insertId]
      );

      return rows[0];
    } catch (error) {
      throw new Error('Error al crear sala: ' + error.message);
    }
  }

  // READ - Obtener todas las salas
  async getAllSalas() {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM salas ORDER BY id_sala DESC');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener salas: ' + error.message);
    }
  }

  // READ - Obtener sala por ID
  async getSalaById(id) {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM salas WHERE id_sala = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Sala no encontrada');
      }

      return rows[0];
    } catch (error) {
      if (error.message.includes('Sala no encontrada')) {
        throw error;
      }
      throw new Error('Error al obtener sala: ' + error.message);
    }
  }

  // UPDATE - Actualizar sala completa
  async updateSala(id, salaData) {
    try {
      const query = `
        UPDATE salas
        SET nombre = ?, capacidad = ?
        WHERE id_sala = ?
      `;
      const [result] = await this.connection.execute(query, [
        salaData.nombre,
        parseInt(salaData.capacidad),
        parseInt(id)
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Sala no encontrada');
      }

      // Obtener la sala actualizada
      const [rows] = await this.connection.execute(
        'SELECT * FROM salas WHERE id_sala = ?',
        [parseInt(id)]
      );

      return rows[0];
    } catch (error) {
      if (error.message.includes('Sala no encontrada')) {
        throw error;
      }
      throw new Error('Error al actualizar sala: ' + error.message);
    }
  }

  // DELETE - Eliminar sala por ID
  async deleteSala(id) {
    try {
      // Primero verificar que la sala existe y obtener sus datos
      const [rows] = await this.connection.execute(
        'SELECT * FROM salas WHERE id_sala = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Sala no encontrada');
      }

      // Eliminar la sala
      await this.connection.execute('DELETE FROM salas WHERE id_sala = ?', [parseInt(id)]);

      return rows[0];
    } catch (error) {
      if (error.message.includes('Sala no encontrada')) {
        throw error;
      }
      throw new Error('Error al eliminar sala: ' + error.message);
    }
  }

  // ========== MÉTODOS CRUD PARA MÉTODOS DE PAGO ==========

  // CREATE - Crear un nuevo método de pago
  async createMetodoPago(metodoData) {
    try {
      const query = `
        INSERT INTO metodos_pago (nombre)
        VALUES (?)
      `;
      const [result] = await this.connection.execute(query, [metodoData.nombre]);

      // Obtener el método de pago creado
      const [rows] = await this.connection.execute(
        'SELECT * FROM metodos_pago WHERE id_metodo = ?',
        [result.insertId]
      );

      return rows[0];
    } catch (error) {
      throw new Error('Error al crear método de pago: ' + error.message);
    }
  }

  // READ - Obtener todos los métodos de pago
  async getAllMetodosPago() {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM metodos_pago ORDER BY id_metodo DESC');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener métodos de pago: ' + error.message);
    }
  }

  // READ - Obtener método de pago por ID
  async getMetodoPagoById(id) {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM metodos_pago WHERE id_metodo = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Método de pago no encontrado');
      }

      return rows[0];
    } catch (error) {
      if (error.message.includes('Método de pago no encontrado')) {
        throw error;
      }
      throw new Error('Error al obtener método de pago: ' + error.message);
    }
  }

  // UPDATE - Actualizar método de pago completo
  async updateMetodoPago(id, metodoData) {
    try {
      const query = `
        UPDATE metodos_pago
        SET nombre = ?
        WHERE id_metodo = ?
      `;
      const [result] = await this.connection.execute(query, [
        metodoData.nombre,
        parseInt(id)
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Método de pago no encontrado');
      }

      // Obtener el método de pago actualizado
      const [rows] = await this.connection.execute(
        'SELECT * FROM metodos_pago WHERE id_metodo = ?',
        [parseInt(id)]
      );

      return rows[0];
    } catch (error) {
      if (error.message.includes('Método de pago no encontrado')) {
        throw error;
      }
      throw new Error('Error al actualizar método de pago: ' + error.message);
    }
  }

  // DELETE - Eliminar método de pago por ID
  async deleteMetodoPago(id) {
    try {
      // Primero verificar que el método de pago existe y obtener sus datos
      const [rows] = await this.connection.execute(
        'SELECT * FROM metodos_pago WHERE id_metodo = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Método de pago no encontrado');
      }

      // Eliminar el método de pago
      await this.connection.execute('DELETE FROM metodos_pago WHERE id_metodo = ?', [parseInt(id)]);

      return rows[0];
    } catch (error) {
      if (error.message.includes('Método de pago no encontrado')) {
        throw error;
      }
      throw new Error('Error al eliminar método de pago: ' + error.message);
    }
  }

  // ========== MÉTODOS CRUD PARA FUNCIONES ==========

  // CREATE - Crear una nueva función
  async createFuncion(funcionData) {
    try {
      // Verificar que la película y sala existen
      await this.getPeliculaById(funcionData.id_pelicula);
      await this.getSalaById(funcionData.id_sala);

      const query = `
        INSERT INTO funciones (id_pelicula, id_sala, fecha_hora)
        VALUES (?, ?, ?)
      `;
      const [result] = await this.connection.execute(query, [
        parseInt(funcionData.id_pelicula),
        parseInt(funcionData.id_sala),
        funcionData.fecha_hora
      ]);

      // Obtener la función creada
      const [rows] = await this.connection.execute(
        'SELECT * FROM funciones WHERE id_funcion = ?',
        [result.insertId]
      );

      return rows[0];
    } catch (error) {
      throw new Error('Error al crear función: ' + error.message);
    }
  }

  // READ - Obtener todas las funciones
  async getAllFunciones() {
    try {
      const [rows] = await this.connection.execute('SELECT * FROM funciones ORDER BY id_funcion DESC');
      return rows;
    } catch (error) {
      throw new Error('Error al obtener funciones: ' + error.message);
    }
  }

  // READ - Obtener función por ID
  async getFuncionById(id) {
    try {
      const [rows] = await this.connection.execute(
        'SELECT * FROM funciones WHERE id_funcion = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Función no encontrada');
      }

      return rows[0];
    } catch (error) {
      if (error.message.includes('Función no encontrada')) {
        throw error;
      }
      throw new Error('Error al obtener función: ' + error.message);
    }
  }

  // UPDATE - Actualizar función completa
  async updateFuncion(id, funcionData) {
    try {
      // Verificar que la película y sala existen
      await this.getPeliculaById(funcionData.id_pelicula);
      await this.getSalaById(funcionData.id_sala);

      const query = `
        UPDATE funciones
        SET id_pelicula = ?, id_sala = ?, fecha_hora = ?
        WHERE id_funcion = ?
      `;
      const [result] = await this.connection.execute(query, [
        parseInt(funcionData.id_pelicula),
        parseInt(funcionData.id_sala),
        funcionData.fecha_hora,
        parseInt(id)
      ]);

      if (result.affectedRows === 0) {
        throw new Error('Función no encontrada');
      }

      // Obtener la función actualizada
      const [rows] = await this.connection.execute(
        'SELECT * FROM funciones WHERE id_funcion = ?',
        [parseInt(id)]
      );

      return rows[0];
    } catch (error) {
      if (error.message.includes('Función no encontrada')) {
        throw error;
      }
      throw new Error('Error al actualizar función: ' + error.message);
    }
  }

  // DELETE - Eliminar función por ID
  async deleteFuncion(id) {
    try {
      // Primero verificar que la función existe y obtener sus datos
      const [rows] = await this.connection.execute(
        'SELECT * FROM funciones WHERE id_funcion = ?',
        [parseInt(id)]
      );

      if (rows.length === 0) {
        throw new Error('Función no encontrada');
      }

      // Eliminar la función
      await this.connection.execute('DELETE FROM funciones WHERE id_funcion = ?', [parseInt(id)]);

      return rows[0];
    } catch (error) {
      if (error.message.includes('Función no encontrada')) {
        throw error;
      }
      throw new Error('Error al eliminar función: ' + error.message);
    }
  }
}

module.exports = new DBService();