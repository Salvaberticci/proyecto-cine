require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();

// Configuración de EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware de sesiones
app.use(session({
  secret: process.env.JWT_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true en producción con HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

// Middleware para method override
app.use(methodOverride('_method'));

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

// Import router de autenticación
const authRouter = require('./routes/auth');

// Import router de administración
const adminRouter = require('./routes/admin');

// Use routers existentes (manejan tanto rutas API como de vistas)
app.use('/', peliculasRouter);
app.use('/', funcionesRouter);
app.use('/', salasRouter);
app.use('/', metodosPagoRouter);

// Use routers nuevos (manejan tanto rutas API como de vistas)
app.use('/', productosRouter);
app.use('/', pedidosRouter);

// Use router de autenticación
app.use('/auth', authRouter);

// Use router de administración
app.use('/admin', adminRouter);

// Ruta raíz - redirige según estado de autenticación
app.get('/', (req, res) => {
  if (req.session.user) {
    // Usuario autenticado - ir al dashboard
    res.redirect('/dashboard');
  } else {
    // Usuario no autenticado - ir al login
    res.redirect('/login');
  }
});

// Página de login (pública) - ruta directa
app.get('/login', require('./controllers/UserController').showLoginForm);

// Dashboard (requiere autenticación)
app.get('/dashboard', require('./middleware/auth').requireWebAuth, (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard - Cine Glorimar',
    user: req.session.user,
    error: req.query.error,
    success: req.query.success
  });
});

const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});