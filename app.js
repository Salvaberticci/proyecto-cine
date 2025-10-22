const express = require('express');
const app = express();

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para procesar datos de formularios

// Import routers existentes
const peliculasRouter = require('./routes/PeliculasRouter');
const funcionesRouter = require('./routes/FuncionesRouter');
const salasRouter = require('./routes/SalasRouter');
const metodosPagoRouter = require('./routes/MetodosPagoRouter');

// Import routers nuevos para Producto y Pedido
const productosRouter = require('./routes/productos');
const pedidosRouter = require('./routes/pedidos');

// Use routers existentes (manejan tanto rutas API como de vistas)
app.use('/', peliculasRouter);
app.use('/', funcionesRouter);
app.use('/', salasRouter);
app.use('/', metodosPagoRouter);

// Use routers nuevos (manejan tanto rutas API como de vistas)
app.use('/', productosRouter);
app.use('/', pedidosRouter);

// Ruta raíz para mostrar navegación básica
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Sistema de Gestión de Cine',
    message: 'Bienvenido al sistema de gestión de productos y pedidos'
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});