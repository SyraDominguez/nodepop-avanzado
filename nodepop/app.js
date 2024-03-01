var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const basicAuth = require('./lib/basicAuthMiddleware');
const Products = require('./models/Products');

require('../nodepop/lib/connectMongoose');


// crear la aplicación de express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
  → Middlewares
*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// website routes
app.get('/', async (req, res, next) => {
  try {
    const now = new Date(); // Definir la variable now
    const products = await Products.find();
    res.render('index', { title: 'NodePop', products: products, now: now });  // Pasar la variable now a la vista
  } catch (error) {
    next(error);
  }
});

// API routes
app.use('/api/products', basicAuth, require('./routes/api/products'));


// website routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // validation errors
  if (err.array) {
    const errInfo = err.array({})[0];
    console.log(errInfo);
    err.message = `Not valid - ${errInfo.type} in ${errInfo.path} ${errInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  // API errors
  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return
  };

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
