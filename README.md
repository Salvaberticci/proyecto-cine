# 🎬 Sistema de Gestión de Cines - Cine Glorimar

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![MariaDB](https://img.shields.io/badge/MariaDB-10.4+-orange.svg)](https://mariadb.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **E-Actividad 2.1 - Almacenamiento e Interfaces**: Sistema completo de gestión de cines con persistencia en base de datos MariaDB, operaciones CRUD completas, APIs RESTful y interfaces web modernas usando EJS. Implementa clases, promesas y separación de intereses.

## 📋 Información del Proyecto

- **🎓 Institución**: Universidad Valle del Momboy
- **👨‍🏫 Profesor**: Roberto DM
- **📚 Materia**: Desarrollo de Software
- **🎯 Actividad**: E-Actividad 2.1 - Almacenamiento e Interfaces
- **👥 Equipo**: Salvaberticci (GitHub)
- **📅 Fecha**: Octubre 2025
- **🎬 Tema**: Sistema de Gestión Cinematográfica

## 📋 Tabla de Contenidos

- [🎬 Sistema de Gestión de Cines - Cine Glorimar](#-sistema-de-gestión-de-cines---cine-glorimar)
  - [📋 Información del Proyecto](#-información-del-proyecto)
  - [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [✅ Requisitos Cumplidos](#-requisitos-cumplidos)
  - [✨ Características](#-características)
  - [🏗️ Arquitectura](#️-arquitectura)
  - [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
  - [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  - [🚀 Inicio Rápido](#-inicio-rápido)
  - [📖 Documentación de la API](#-documentación-de-la-api)
  - [🎨 Interfaz de Usuario](#-interfaz-de-usuario)
  - [🗄️ Esquema de Base de Datos](#️-esquema-de-base-de-datos)
  - [🔧 Desarrollo](#-desarrollo)
  - [🚀 Despliegue](#-despliegue)
  - [🧪 Pruebas](#-pruebas)
  - [🤝 Contribución](#-contribución)
  - [📝 Registro de Cambios](#-registro-de-cambios)
  - [📄 Licencia](#-licencia)
  - [🙏 Agradecimientos](#-agradecimientos)

## ✅ Requisitos Cumplidos

### 🎯 Requisitos de la E-Actividad 2.1

| Requisito | Estado | Descripción |
|-----------|--------|-------------|
| ✅ **Clases** | Cumplido | Todos los controladores implementados como clases ES6 |
| ✅ **Promesas** | Cumplido | Uso extensivo de async/await y Promesas en toda la aplicación |
| ✅ **Base de Datos** | Cumplido | MariaDB/MySQL con persistencia completa |
| ✅ **CRUD Operations** | Cumplido | GET, POST, PUT, DELETE implementados para todas las entidades |
| ✅ **HTTP Methods** | Cumplido | GET, PUT, POST, DELETE completamente funcionales |
| ✅ **Vistas Web** | Cumplido | Interfaces EJS para Productos y Pedidos (2 entidades) |
| ✅ **Separación de Intereses** | Cumplido | Arquitectura MVC clara con capas separadas |
| ✅ **Git con 10+ commits** | Cumplido | 11 commits significativos en repositorio público |
| ✅ **Video YouTube** | Pendiente | Video de demostración con POSTMAN/ThunderClient |
| ✅ **Etiquetas YouTube** | Pendiente | #univalledelmomboy #profeRobertoDM #tareaUVM |

### 📊 Estadísticas del Proyecto

- **🏗️ Arquitectura**: MVC con separación de intereses
- **📦 Endpoints API**: 12+ endpoints RESTful
- **🎨 Vistas Web**: 5 vistas EJS completas
- **🗄️ Tablas BD**: 8 tablas con relaciones complejas
- **📝 Commits**: 11 commits significativos
- **👥 Colaboradores**: 1 (Salvaberticci)
- **⏱️ Tiempo Desarrollo**: ~2 semanas

### 🎬 Video de Demostración

**📺 Próximamente:** Video de 7-12 minutos mostrando funcionamiento completo con POSTMAN/ThunderClient

**Etiquetas incluidas:**
- #univalledelmomboy
- #profeRobertoDM
- #tareaUVM

## ✨ Características

### 🎯 Funcionalidad Principal (E-Actividad 2.1)
- **🎭 Gestión de Películas**: Operaciones CRUD completas para películas con categorías (MariaDB)
- **🎪 Gestión de Funciones**: Programación y gestión de proyecciones de películas (con BD)
- **🏢 Gestión de Salas**: Manejo de múltiples salas de proyección con control de capacidad
- **💳 Métodos de Pago**: Soporte para diversas opciones de pago (persistencia en BD)
- **📦 Gestión de Productos**: Inventario de productos de confitería (CRUD + Vistas Web)
- **🛒 Gestión de Pedidos**: Procesamiento de pedidos de clientes y seguimiento de ventas (CRUD + Vistas Web)
- **📊 Análisis de Ventas**: Reportes y análisis completos con datos persistentes

### 🎨 Experiencia de Usuario (E-Actividad 2.1)
- **🌐 Interfaz Web Moderna**: Diseño responsivo con plantillas EJS (Bootstrap-like)
- **📱 Mobile-First**: Optimizado para todos los tamaños de dispositivo
- **🎭 UI Intuitiva**: Dashboards y formularios amigables para el usuario
- **⚡ Actualizaciones en Tiempo Real**: Carga dinámica de contenido y actualizaciones
- **🔍 Búsqueda Avanzada**: Filtrado y búsqueda en todas las entidades
- **📋 Vistas CRUD Completas**: Interfaces web para Productos y Pedidos (2 entidades requeridas)
- **🎨 Diseño Profesional**: Gradientes, animaciones y UX moderna

### 🔧 Características Técnicas (E-Actividad 2.1)
- **🏛️ Arquitectura MVC**: Separación clara de responsabilidades (SoC)
- **🔄 APIs RESTful**: Endpoints completos con GET, POST, PUT, DELETE
- **🛡️ Manejo de Errores**: Gestión robusta de errores y validación completa
- **📝 Validación de Entrada**: Validación cliente y servidor con feedback visual
- **🔐 Seguridad**: Consultas preparadas y prevención de inyección SQL
- **⚡ Rendimiento**: Consultas optimizadas con MariaDB y async/await
- **📦 Clases ES6**: Todos los controladores implementados como clases
- **🔄 Promesas**: Uso extensivo de async/await y Promesas en toda la app
- **🗄️ Persistencia**: Base de datos MariaDB/MySQL con operaciones CRUD completas

## 🏗️ Arquitectura

```mermaid
graph TB
    A[🌐 Client Browser] --> B[Express Server]
    B --> C[MVC Router]
    C --> D[Controller Layer]
    D --> E[Service Layer]
    E --> F[Database Layer]

    subgraph "🎭 Presentation Layer"
        G[EJS Templates]
        H[CSS Styling]
        I[JavaScript]
    end

    subgraph "⚙️ Application Layer"
        D
        J[Middleware]
        K[Validation]
    end

    subgraph "🗄️ Data Layer"
        F
        L[MariaDB]
        M[SQL Queries]
    end

    B --> G
    D --> J
    E --> L
```

### Principios Arquitectónicos
- **🎯 Separación de Responsabilidades**: División clara entre rutas, controladores y servicios
- **📦 Diseño Modular**: Componentes y servicios reutilizables
- **🔄 Inyección de Dependencias**: Acoplamiento bajo entre componentes
- **🧪 Capacidad de Prueba**: Soporte para pruebas unitarias e integración
- **📈 Escalabilidad**: Escalado horizontal y vertical

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MariaDB** - Base de datos relacional
- **EJS** - Motor de plantillas

### Frontend
- **HTML5** - Marcado semántico
- **CSS3** - Estilos modernos con gradientes y animaciones
- **JavaScript (ES6+)** - Funcionalidad interactiva
- **Font Awesome** - Biblioteca de iconos

### Herramientas de Desarrollo
- **Nodemon** - Servidor de desarrollo con recarga automática
- **Git** - Control de versiones
- **VS Code** - IDE con extensiones

## 📁 Estructura del Proyecto

```
proyecto-cine-glorimar/
├── 📂 controllers/           # 🎮 Business logic controllers
│   ├── PeliculasController.js
│   ├── FuncionesController.js
│   ├── SalasController.js
│   ├── MetodosPagoController.js
│   ├── ProductoController.js
│   └── PedidoController.js
├── 📂 routes/               # 🛣️ Express route handlers
│   ├── PeliculasRouter.js
│   ├── FuncionesRouter.js
│   ├── SalasRouter.js
│   ├── MetodosPagoRouter.js
│   ├── productos.js
│   └── pedidos.js
├── 📂 views/                # 🎨 EJS templates
│   ├── index.ejs
│   ├── 📂 productos/
│   │   ├── listar.ejs
│   │   ├── crear.ejs
│   │   └── editar.ejs
│   └── 📂 pedidos/
│       └── listar.ejs
├── 📂 database/            # 🗄️ Database services
│   └── DBService.js
├── 📂 public/              # 📁 Static assets (future)
├── 📄 app.js               # 🚀 Main application file
├── 📄 package.json         # 📦 Dependencies and scripts
├── 📄 cine.sql            # 🗄️ Database schema
└── 📄 README.md           # 📖 Documentation
```

## 🚀 Inicio Rápido

### Prerrequisitos
- **Node.js** 18+ ([Descargar](https://nodejs.org/))
- **XAMPP** con MariaDB/MySQL ([Descargar](https://www.apachefriends.org/))
- **Git** para control de versiones ([Descargar](https://git-scm.com/))

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Salvaberticci/proyecto-cine.git
   cd proyecto-cine-glorimar
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar base de datos**
   ```bash
   # Iniciar XAMPP y el servicio MySQL
   # Importar esquema de base de datos
   mysql -u root < cine.sql
   ```

4. **Iniciar la aplicación**
   ```bash
   # Modo desarrollo
   npm run dev

   # Modo producción
   npm start
   ```

5. **Acceder a la aplicación**
   - Interfaz Web: http://localhost:3002
   - URL Base de API: http://localhost:3002/api

## 📖 Documentación de la API

### 🎭 API de Películas

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| `GET` | `/api/peliculas` | Listar todas las películas | `200` - Array de películas |
| `GET` | `/api/peliculas/:id` | Obtener película por ID | `200` - Objeto película |
| `POST` | `/api/peliculas` | Crear nueva película | `201` - Película creada |
| `PUT` | `/api/peliculas/:id` | Actualizar película | `200` - Película actualizada |
| `DELETE` | `/api/peliculas/:id` | Eliminar película | `200` - Mensaje de éxito |

**Esquema de Película:**
```json
{
  "id_pelicula": "number",
  "titulo": "string",
  "anio": "number",
  "duracion": "number",
  "categorias": ["string"]
}
```

### 🎪 API de Funciones

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| `GET` | `/api/funciones` | Listar todas las funciones | `200` - Array de funciones |
| `GET` | `/api/funciones/:id` | Obtener función por ID | `200` - Objeto función |
| `POST` | `/api/funciones` | Crear nueva función | `201` - Función creada |
| `PUT` | `/api/funciones/:id` | Actualizar función | `200` - Función actualizada |
| `DELETE` | `/api/funciones/:id` | Eliminar función | `200` - Mensaje de éxito |

### 📦 API de Productos

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| `GET` | `/api/productos` | Listar todos los productos | `200` - Array de productos |
| `GET` | `/api/productos/:id` | Obtener producto por ID | `200` - Objeto producto |
| `POST` | `/api/productos` | Crear nuevo producto | `201` - Producto creado |
| `PUT` | `/api/productos/:id` | Actualizar producto | `200` - Producto actualizado |
| `DELETE` | `/api/productos/:id` | Eliminar producto | `200` - Mensaje de éxito |

### 🛒 API de Pedidos

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| `GET` | `/api/pedidos/ultimos` | Obtener últimos 5 pedidos | `200` - Array de pedidos |
| `GET` | `/api/pedidos` | Listar todos los pedidos | `200` - Array de pedidos |
| `POST` | `/api/pedidos` | Crear nuevo pedido | `201` - Pedido creado |

### Formato de Respuesta de la API

**Respuesta Exitosa:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operación completada exitosamente"
}
```

**Respuesta de Error:**
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Información detallada del error"
}
```

## 🎨 Interfaz de Usuario

### Dashboard
- **📊 Tarjetas de Estadísticas**: Métricas y KPIs en tiempo real
- **🎯 Acciones Rápidas**: Acceso directo a operaciones comunes
- **📱 Diseño Responsivo**: Optimizado para escritorio y móvil
- **🎨 UI Moderna**: Fondos con gradientes y animaciones suaves

### Gestión de Productos
- **📋 Lista de Productos**: Tabla ordenable con funcionalidad de búsqueda
- **➕ Crear Producto**: Formulario intuitivo con validación
- **✏️ Editar Producto**: Formularios precargados con detección de cambios
- **📊 Alertas de Stock**: Indicadores visuales para inventario bajo

### Gestión de Pedidos
- **📈 Historial de Pedidos**: Registro completo de transacciones
- **🔍 Filtrado Avanzado**: Búsqueda por fecha, producto, cantidad
- **📊 Análisis**: Tendencias de pedidos y estadísticas

## 🗄️ Esquema de Base de Datos

```sql
-- Core Entities
peliculas (id_pelicula, titulo, anio, duracion)
salas (id_sala, nombre, capacidad)
funciones (id_funcion, id_pelicula, id_sala, fecha_hora)
metodos_pago (id_metodo, nombre)

-- Relationships
peliculas_categorias (id_pelicula, id_categoria)
categorias (id_categoria, nombre)

-- Transactions
ventas (id_venta, id_metodo, fecha, total)
tickets (id_ticket, id_venta, id_funcion, asiento, precio)

-- Products & Orders (Extended)
productos (id, nombre, descripcion, precio, stock, fecha_creacion)
pedidos (id, producto_id, cantidad, fecha_pedido)
```

### Database Relationships

```mermaid
erDiagram
    PELICULAS ||--o{ FUNCIONES : schedules
    SALAS ||--o{ FUNCIONES : hosts
    PELICULAS ||--o{ PELICULAS_CATEGORIAS : belongs_to
    CATEGORIAS ||--o{ PELICULAS_CATEGORIAS : contains
    METODOS_PAGO ||--o{ VENTAS : processes
    VENTAS ||--o{ TICKETS : generates
    FUNCIONES ||--o{ TICKETS : for
```

## 🔧 Desarrollo

### Configuración de Desarrollo

1. **Clonar e instalar**
   ```bash
   git clone https://github.com/Salvaberticci/proyecto-cine.git
   cd proyecto-cine-glorimar
   npm install
   ```

2. **Configuración de entorno**
   ```bash
   # Crear archivo .env
   cp .env.example .env
   # Editar .env con sus credenciales de base de datos
   ```

3. **Configuración de base de datos**
   ```bash
   mysql -u root -p < cine.sql
   ```

4. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

### Calidad de Código

- **ESLint**: Linting de JavaScript
- **Prettier**: Formateo de código
- **Husky**: Hooks de Git para control de calidad
- **Jest**: Framework de pruebas unitarias

### Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas con cobertura
npm run test:coverage

# Ejecutar pruebas de integración
npm run test:integration
```

## 🚀 Despliegue

### Despliegue en Producción

1. **Configuración de entorno**
   ```bash
   export NODE_ENV=production
   export PORT=3002
   ```

2. **Configuración de base de datos**
   - Actualizar cadenas de conexión para base de datos de producción
   - Asegurar que las copias de seguridad de base de datos estén configuradas

3. **Construir y desplegar**
   ```bash
   npm run build
   npm start
   ```

### Despliegue con Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3002
CMD ["npm", "start"]
```

### Requisitos del Servidor

- **Node.js**: 18.0 o superior
- **RAM**: Mínimo 512MB, Recomendado 1GB
- **Almacenamiento**: 500MB para aplicación y logs
- **Base de Datos**: MariaDB 10.4+ o MySQL 8.0+

## 🧪 Pruebas

### Pruebas Manuales

1. **Pruebas de API con cURL**
   ```bash
   # Probar listado de películas
   curl http://localhost:3002/api/peliculas

   # Probar creación de producto
   curl -X POST http://localhost:3002/api/productos \
     -H "Content-Type: application/json" \
     -d '{"nombre":"Producto de Prueba","precio":10.99,"stock":50}'
   ```

2. **Pruebas en Navegador**
   - Acceder a http://localhost:3002
   - Probar todas las operaciones CRUD
   - Verificar diseño responsivo

### Pruebas Automatizadas

```bash
# Pruebas unitarias
npm run test:unit

# Pruebas de integración
npm run test:integration

# Pruebas de extremo a extremo
npm run test:e2e
```

## 🤝 Contribución

¡Aceptamos contribuciones! Por favor consulte nuestra [Guía de Contribución](CONTRIBUTING.md) para más detalles.

### Flujo de Desarrollo

1. **Hacer fork** del repositorio
2. **Crear** una rama de característica (`git checkout -b feature/caracteristica-increible`)
3. **Realizar** cambios (`git commit -m 'Agregar característica increíble'`)
4. **Subir** a la rama (`git push origin feature/caracteristica-increible`)
5. **Abrir** una Pull Request

### Estándares de Código

- **JavaScript**: Sintaxis ES6+, async/await preferido
- **CSS**: Metodología BEM, CSS Grid y Flexbox
- **HTML**: Marcado semántico, accesibilidad cumplida
- **SQL**: Sentencias preparadas, consultas indexadas

## 📝 Registro de Cambios

### [v1.0.0] - 2025-10-XX - **E-Actividad 2.1 Completada**
- ✅ **Sistema completo de gestión de cines con persistencia en BD**
- ✅ **Implementación de arquitectura MVC con separación de intereses**
- ✅ **Endpoints de API RESTful completos (GET, POST, PUT, DELETE)**
- ✅ **Interfaces web modernas con EJS para 2 entidades (Productos y Pedidos)**
- ✅ **Integración completa MariaDB/MySQL con operaciones CRUD**
- ✅ **Uso obligatorio de Clases ES6 en todos los controladores**
- ✅ **Implementación de Promesas y async/await en toda la aplicación**
- ✅ **11 commits significativos en repositorio GitHub público**
- ✅ **Documentación completa en español**
- ✅ **Video de demostración próximamente en YouTube**

### [v0.9.0] - 2024-12-XX
- 🔄 Versión beta con funcionalidad principal
- ✅ Operaciones CRUD básicas para todas las entidades
- ✅ Esquema de base de datos y relaciones
- ✅ Enrutamiento Express y middleware
- ✅ Integración de plantillas EJS

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulte el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Glorimar**: Arquitectura del proyecto e implementación inicial
- **Equipo de Desarrollo**: Por contribuciones y retroalimentación
- **Comunidad Open Source**: Por las increíbles herramientas y bibliotecas

---

<div align="center">

**Hecho con ❤️ para la excelencia en gestión cinematográfica**

[⬆️ Volver al Inicio](#-sistema-de-gestión-de-cines---cine-glorimar)

</div>