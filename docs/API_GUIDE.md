# API Endpoints Guide - Cine Management System

## Base URL
```
http://localhost:3002
```

## Authentication
No authentication required for current endpoints.

## Content-Type
All POST/PUT requests must include:
```
Content-Type: application/json
```

---

## 🛍️ **PRODUCTOS ENDPOINTS**

### **GET /api/productos**
Obtiene todos los productos disponibles.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Palomitas Grandes",
      "descripcion": "Palomitas de maíz saladas tamaño grande",
      "precio": 5.5,
      "stock": 100,
      "fecha_creacion": "2025-10-22T04:00:00.000Z"
    }
  ],
  "count": 3
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3002/api/productos
```

---

### **GET /api/productos/:id**
Obtiene un producto específico por ID.

**Parameters:**
- `id` (number): ID del producto

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nombre": "Palomitas Grandes",
    "descripcion": "Palomitas de maíz saladas tamaño grande",
    "precio": 5.5,
    "stock": 100,
    "fecha_creacion": "2025-10-22T04:00:00.000Z"
  }
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3002/api/productos/1
```

---

### **POST /api/productos**
Crea un nuevo producto.

**Request Body:**
```json
{
  "nombre": "Hot Dog",
  "descripcion": "Hot dog con mostaza y ketchup",
  "precio": 4.5,
  "stock": 50
}
```

**Response:**
```json
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": 4,
    "nombre": "Hot Dog",
    "descripcion": "Hot dog con mostaza y ketchup",
    "precio": "4.50",
    "stock": 50,
    "fecha_creacion": "2025-10-23T04:00:00.000Z"
  }
}
```

**Validation Rules:**
- `nombre`: Required, string
- `descripcion`: Required, string
- `precio`: Required, positive number
- `stock`: Required, positive integer

**cURL Example:**
```bash
curl -X POST http://localhost:3002/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Hot Dog","descripcion":"Hot dog con mostaza y ketchup","precio":4.5,"stock":50}'
```

---

### **PUT /api/productos/:id**
Actualiza un producto existente.

**Parameters:**
- `id` (number): ID del producto a actualizar

**Request Body:**
```json
{
  "nombre": "Hot Dog Jumbo",
  "descripcion": "Hot dog grande con mostaza y ketchup",
  "precio": 5.5,
  "stock": 45
}
```

**Response:**
```json
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": 4,
    "nombre": "Hot Dog Jumbo",
    "descripcion": "Hot dog grande con mostaza y ketchup",
    "precio": 5.5,
    "stock": 45,
    "fecha_creacion": "2025-10-23T04:00:00.000Z"
  }
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:3002/api/productos/4 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Hot Dog Jumbo","descripcion":"Hot dog grande con mostaza y ketchup","precio":5.5,"stock":45}'
```

---

### **DELETE /api/productos/:id**
Elimina un producto por ID.

**Parameters:**
- `id` (number): ID del producto a eliminar

**Response:**
```json
{
  "success": true,
  "message": "Producto eliminado exitosamente",
  "data": {
    "id": 4,
    "nombre": "Hot Dog Jumbo",
    "descripcion": "Hot dog grande con mostaza y ketchup",
    "precio": 5.5,
    "stock": 45,
    "fecha_creacion": "2025-10-23T04:00:00.000Z"
  }
}
```

**Note:** No se puede eliminar un producto que tenga pedidos asociados. Primero debe eliminar los pedidos relacionados.

**cURL Example:**
```bash
curl -X DELETE http://localhost:3002/api/productos/4
```

---

## 🛒 **PEDIDOS ENDPOINTS**

### **GET /api/pedidos**
Obtiene todos los pedidos.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "producto_id": 1,
      "cantidad": 2,
      "fecha_pedido": "2025-10-22T04:00:00.000Z"
    }
  ],
  "count": 3
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3002/api/pedidos
```

---

### **GET /api/pedidos/ultimos**
Obtiene los últimos 5 pedidos ordenados por fecha.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 3,
      "producto_id": 3,
      "cantidad": 3,
      "fecha_pedido": "2025-10-22T04:00:00.000Z"
    }
  ],
  "count": 3
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3002/api/pedidos/ultimos
```

---

### **GET /api/pedidos/:id**
Obtiene un pedido específico por ID.

**Parameters:**
- `id` (number): ID del pedido

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "producto_id": 1,
    "cantidad": 2,
    "fecha_pedido": "2025-10-22T04:00:00.000Z"
  }
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:3002/api/pedidos/1
```

---

### **POST /api/pedidos**
Crea un nuevo pedido.

**Request Body:**
```json
{
  "producto_id": 1,
  "cantidad": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pedido creado exitosamente",
  "data": {
    "id": 4,
    "producto_id": 1,
    "cantidad": 2,
    "fecha_pedido": "2025-10-23T04:00:00.000Z"
  }
}
```

**Validation Rules:**
- `producto_id`: Required, must exist in products table
- `cantidad`: Required, positive integer

**cURL Example:**
```bash
curl -X POST http://localhost:3002/api/pedidos \
  -H "Content-Type: application/json" \
  -d '{"producto_id":1,"cantidad":2}'
```

---

### **PUT /api/pedidos/:id**
Actualiza un pedido existente.

**Parameters:**
- `id` (number): ID del pedido a actualizar

**Request Body:**
```json
{
  "producto_id": 1,
  "cantidad": 3
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pedido actualizado exitosamente",
  "data": {
    "id": 4,
    "producto_id": 1,
    "cantidad": 3,
    "fecha_pedido": "2025-10-23T04:00:00.000Z"
  }
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:3002/api/pedidos/4 \
  -H "Content-Type: application/json" \
  -d '{"producto_id":1,"cantidad":3}'
```

---

### **DELETE /api/pedidos/:pedidoId/producto/:productoId**
Elimina la relación específica entre un pedido y un producto.

**Parameters:**
- `pedidoId` (number): ID del pedido
- `productoId` (number): ID del producto

**Response:**
```json
{
  "success": true,
  "message": "Relación pedido-producto eliminada exitosamente",
  "data": {
    "id": 4,
    "producto_id": 4
  }
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:3002/api/pedidos/4/producto/4
```

---

## ❌ **ERROR RESPONSES**

### **400 Bad Request**
Campos requeridos faltantes o datos inválidos.
```json
{
  "success": false,
  "message": "Todos los campos son requeridos: nombre, descripcion, precio, stock"
}
```

### **404 Not Found**
Recurso no encontrado.
```json
{
  "success": false,
  "message": "Producto no encontrado"
}
```

### **500 Internal Server Error**
Error del servidor.
```json
{
  "success": false,
  "message": "Error interno del servidor",
  "error": "Error message details"
}
```

---

## 🧪 **POSTMAN COLLECTION**

Puedes importar esta colección en Postman para probar los endpoints:

```json
{
  "info": {
    "name": "Cine Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3002"
    }
  ],
  "item": [
    {
      "name": "Productos",
      "item": [
        {
          "name": "Get All Products",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/productos",
              "host": ["{{base_url}}"],
              "path": ["api", "productos"]
            }
          }
        },
        {
          "name": "Get Product by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/productos/1",
              "host": ["{{base_url}}"],
              "path": ["api", "productos", "1"]
            }
          }
        },
        {
          "name": "Create Product",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nombre\": \"Hot Dog\",\n  \"descripcion\": \"Hot dog con mostaza y ketchup\",\n  \"precio\": 4.5,\n  \"stock\": 50\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/productos",
              "host": ["{{base_url}}"],
              "path": ["api", "productos"]
            }
          }
        },
        {
          "name": "Update Product",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"nombre\": \"Hot Dog Jumbo\",\n  \"descripcion\": \"Hot dog grande con mostaza y ketchup\",\n  \"precio\": 5.5,\n  \"stock\": 45\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/productos/4",
              "host": ["{{base_url}}"],
              "path": ["api", "productos", "4"]
            }
          }
        },
        {
          "name": "Delete Product",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/productos/4",
              "host": ["{{base_url}}"],
              "path": ["api", "productos", "4"]
            }
          }
        }
      ]
    },
    {
      "name": "Pedidos",
      "item": [
        {
          "name": "Get All Orders",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/pedidos",
              "host": ["{{base_url}}"],
              "path": ["api", "pedidos"]
            }
          }
        },
        {
          "name": "Get Last Orders",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/pedidos/ultimos",
              "host": ["{{base_url}}"],
              "path": ["api", "pedidos", "ultimos"]
            }
          }
        },
        {
          "name": "Get Order by ID",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/pedidos/1",
              "host": ["{{base_url}}"],
              "path": ["api", "pedidos", "1"]
            }
          }
        },
        {
          "name": "Create Order",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"producto_id\": 1,\n  \"cantidad\": 2\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/pedidos",
              "host": ["{{base_url}}"],
              "path": ["api", "pedidos"]
            }
          }
        },
        {
          "name": "Update Order",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"producto_id\": 1,\n  \"cantidad\": 3\n}"
            },
            "url": {
              "raw": "{{base_url}}/api/pedidos/4",
              "host": ["{{base_url}}"],
              "path": ["api", "pedidos", "4"]
            }
          }
        },
        {
          "name": "Delete Order-Product Relation",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{base_url}}/api/pedidos/4/producto/4",
              "host": ["{{base_url}}"],
              "path": ["api", "pedidos", "4", "producto", "4"]
            }
          }
        }
      ]
    }
  ]
}
```

---

## 📝 **USAGE NOTES**

1. **Server must be running** on port 3002 (`npm run dev`)
2. **Database connection** must be configured in `.env` file
3. **MySQL server** must be running with the `cine` database
4. **Foreign key constraints** prevent deleting products with existing orders
5. **All prices** are returned as numbers, all dates as ISO strings
6. **Error responses** include detailed messages for debugging

---

## 🔧 **TROUBLESHOOTING**

- **Connection refused**: Ensure server is running on port 3002
- **Database errors**: Check MySQL connection and database existence
- **Foreign key errors**: Delete related orders before deleting products
- **Validation errors**: Ensure all required fields are provided with correct types