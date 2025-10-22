// DBService.js - Clase que encapsula la conexión y consultas a la BD
// Utiliza Promesas para simular operaciones asíncronas de BD SQL
// Aplica el principio de Separación de Intereses (SoC) manteniendo la lógica de BD separada

class DBService {
  constructor() {
    // Simulación de datos en memoria para productos
    this.productos = [
      { id: 1, nombre: 'Palomitas Grandes', descripcion: 'Palomitas de maíz saladas tamaño grande', precio: 5.50, stock: 100, fecha_creacion: '2023-10-01' },
      { id: 2, nombre: 'Refresco Mediano', descripcion: 'Bebida gaseosa mediana', precio: 3.00, stock: 150, fecha_creacion: '2023-10-01' },
      { id: 3, nombre: 'Nachos', descripcion: 'Nachos con queso y jalapeños', precio: 7.00, stock: 80, fecha_creacion: '2023-10-02' }
    ];

    // Simulación de datos en memoria para pedidos
    this.pedidos = [
      { id: 1, producto_id: 1, cantidad: 2, fecha_pedido: '2023-10-01' },
      { id: 2, producto_id: 2, cantidad: 1, fecha_pedido: '2023-10-02' },
      { id: 3, producto_id: 3, cantidad: 3, fecha_pedido: '2023-10-03' }
    ];

    this.nextProductoId = 4;
    this.nextPedidoId = 4;
  }

  // ========== MÉTODOS CRUD PARA PRODUCTOS ==========

  // CREATE - Crear un nuevo producto
  async createProducto(productoData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const nuevoProducto = {
            id: this.nextProductoId++,
            nombre: productoData.nombre,
            descripcion: productoData.descripcion,
            precio: parseFloat(productoData.precio),
            stock: parseInt(productoData.stock),
            fecha_creacion: new Date().toISOString().split('T')[0]
          };
          this.productos.push(nuevoProducto);
          resolve(nuevoProducto);
        } catch (error) {
          reject(new Error('Error al crear producto: ' + error.message));
        }
      }, 100); // Simula latencia de BD
    });
  }

  // READ - Obtener todos los productos
  async getAllProductos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.productos]);
      }, 50);
    });
  }

  // READ - Obtener producto por ID
  async getProductoById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const producto = this.productos.find(p => p.id === parseInt(id));
        if (producto) {
          resolve({ ...producto });
        } else {
          reject(new Error('Producto no encontrado'));
        }
      }, 50);
    });
  }

  // UPDATE - Actualizar producto completo
  async updateProducto(id, productoData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const index = this.productos.findIndex(p => p.id === parseInt(id));
          if (index === -1) {
            reject(new Error('Producto no encontrado'));
            return;
          }

          this.productos[index] = {
            ...this.productos[index],
            nombre: productoData.nombre,
            descripcion: productoData.descripcion,
            precio: parseFloat(productoData.precio),
            stock: parseInt(productoData.stock)
          };
          resolve({ ...this.productos[index] });
        } catch (error) {
          reject(new Error('Error al actualizar producto: ' + error.message));
        }
      }, 100);
    });
  }

  // DELETE - Eliminar producto por ID
  async deleteProducto(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.productos.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
          reject(new Error('Producto no encontrado'));
          return;
        }

        const productoEliminado = this.productos.splice(index, 1)[0];
        resolve(productoEliminado);
      }, 100);
    });
  }

  // ========== MÉTODOS CRUD PARA PEDIDOS ==========

  // CREATE - Crear un nuevo pedido
  async createPedido(pedidoData) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          // Verificar que el producto existe
          await this.getProductoById(pedidoData.producto_id);

          const nuevoPedido = {
            id: this.nextPedidoId++,
            producto_id: parseInt(pedidoData.producto_id),
            cantidad: parseInt(pedidoData.cantidad),
            fecha_pedido: new Date().toISOString().split('T')[0]
          };
          this.pedidos.push(nuevoPedido);
          resolve(nuevoPedido);
        } catch (error) {
          reject(new Error('Error al crear pedido: ' + error.message));
        }
      }, 100);
    });
  }

  // READ - Obtener todos los pedidos
  async getAllPedidos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.pedidos]);
      }, 50);
    });
  }

  // READ - Obtener los últimos 5 pedidos ordenados por fecha
  async getUltimosPedidos() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ultimosPedidos = [...this.pedidos]
          .sort((a, b) => new Date(b.fecha_pedido) - new Date(a.fecha_pedido))
          .slice(0, 5);
        resolve(ultimosPedidos);
      }, 50);
    });
  }

  // READ - Obtener pedido por ID
  async getPedidoById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pedido = this.pedidos.find(p => p.id === parseInt(id));
        if (pedido) {
          resolve({ ...pedido });
        } else {
          reject(new Error('Pedido no encontrado'));
        }
      }, 50);
    });
  }

  // UPDATE - Actualizar pedido completo
  async updatePedido(id, pedidoData) {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const index = this.pedidos.findIndex(p => p.id === parseInt(id));
          if (index === -1) {
            reject(new Error('Pedido no encontrado'));
            return;
          }

          // Verificar que el producto existe
          await this.getProductoById(pedidoData.producto_id);

          this.pedidos[index] = {
            ...this.pedidos[index],
            producto_id: parseInt(pedidoData.producto_id),
            cantidad: parseInt(pedidoData.cantidad)
          };
          resolve({ ...this.pedidos[index] });
        } catch (error) {
          reject(new Error('Error al actualizar pedido: ' + error.message));
        }
      }, 100);
    });
  }

  // DELETE - Eliminar pedido por ID
  async deletePedido(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.pedidos.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
          reject(new Error('Pedido no encontrado'));
          return;
        }

        const pedidoEliminado = this.pedidos.splice(index, 1)[0];
        resolve(pedidoEliminado);
      }, 100);
    });
  }

  // DELETE - Eliminar relación específica entre pedido y producto
  async deletePedidoProducto(pedidoId, productoId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.pedidos.findIndex(p =>
          p.id === parseInt(pedidoId) && p.producto_id === parseInt(productoId)
        );
        if (index === -1) {
          reject(new Error('Relación pedido-producto no encontrada'));
          return;
        }

        const pedidoEliminado = this.pedidos.splice(index, 1)[0];
        resolve(pedidoEliminado);
      }, 100);
    });
  }
}

module.exports = new DBService();