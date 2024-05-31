require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('i18n');
const config = require('./config');

require('./lib/connectMongoose');

// Configurar i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'es',
  queryParameter: 'lang',
  register: global
});

var app = express();

// Configurar i18n como middleware
app.use(i18n.init);

// Middleware para definir la variable `lang`
app.use((req, res, next) => {
  res.locals.lang = req.query.lang || 'es';
  next();
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  try {
    const Products = require('./models/Products');
    const products = await Products.find();
    res.locals.products = products;
    next();
  } catch (error) {
    next(error);
  }
});

// API routes
app.use('/api/products', require('./routes/api/products'));
app.use('/api', require('./routes/api/auth'));

// Website routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/index'));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Validation errors
  if (err.array) {
    const errInfo = err.array({})[0];
    err.message = req.__('errors.not_valid', { type: errInfo.type, path: errInfo.path, msg: errInfo.msg });
    err.status = 422;
  }

  res.status(err.status || 500);

  // API errors
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: req.__(`errors.${err.message}`) || err.message });
    return;
  }

  // Set locals, only providing error in development
  res.locals.message = req.__(`errors.${err.message}`) || err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.render('error');
});

module.exports = app;
