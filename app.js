var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var app = express()
const session = require('express-session')
const sessionAuth = require('./lib/sessionAuth')

const loginController = require('./routes/loginController')
const privadoController = require('./routes/privadoController')
const jwtAuth = require('./lib/jwtAuth')

// conectar a la base de datos
require('./lib/connectMongoose')

// Cargamos las definiciones de todos nuestros modelos
require('./models/Producto');

// lo probamos
// i18n.setLocale('es');
// console.log(i18n.__('Welcome to'));

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')
app.engine('html', require('ejs').__express) // Nuevo

// Establecemos la variable title de forma global, para todas las vistas
app.locals.title = 'Express'
app.locals.feo = 'Perro'

// app.locals.anuncios

// Ante cada petición se ejecutan los siguientes middlewares
app.use(function(req, res, next){
  // console.log('Hola middleware')
  // res.send('Hola, qué tal')
  next();
})

// En un middleware siempre hay que hacer una de 2:
// -Responder
// -Llamar a next() 

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Setup de i18n
// Recordar que para que funcione la cookie 'nodeapi-locale' debemos inicializar
// i18n tras el middleware que lee las cookies
const i18n = require('./lib/i18nConfig')
app.use(i18n.init) // metemos un middleware a express

 // Rutas del API
 app.post('/api/loginJWT', loginController.postJWT)
 app.use('/api/productos', jwtAuth(), require('./routes/api/productos'))
 
 // Inicializamos el sistema de sesiones
 // carga la sesión en req.session
 app.use(session({
   name: 'nodepop-session',
   secret:'$@Ah5yKW*sAj5q^N', // cambiar en produccón
   saveUninitialized: false,
   resave: false,
   cookie: {
     secure: 'auto', // es automatico para https o no 
     maxAge: 1000*60*60*24*7 // Caduca tras 7 dias inactivo
   }

 }))

 // Rutas del website
app.use('/',                require('./routes/index'))
app.use('/users',           require('./routes/users'))
app.use('/services',        require('./routes/services'))
app.use('/change-locale',   require('./routes/change-locale'))
app.use('/api-nodepop',     require('./routes/api/productos'))
// Estructura controladores
app.get('/login',           loginController.index)
app.post('/login',          loginController.post)
app.get('/logout',          loginController.logout)
app.get('/privado',  sessionAuth({}),  privadoController.index)

//app.get('/privado',  sessionAuth({rol:'admin'}),  privadoController.index)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {

  // if(req.originalUrl.starsWith('/api/')){
   // res.json({error: err.message})
  // return

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app;
