var express = require('express');
var router = express.Router();
const { query, custom, validationResult } = require('express-validator');
const { routes } = require('../app');

/* GET home page. */
router.get('/', function (req, res, next) {

  // current date
  const now = new Date();
  res.render('index', { title: 'NODEPOP', now: now });

});

// routes.get('products', 
// query('tag').custom(value => {
//   if (value != [work, lifestyle, motor, mobile]) return true
//   else return false
// }).withMessage('Seleccionar uno de los siguientes tags: work, lifestyle, motor, mobile'),

//  query('tag'). ...
//  function (req, res, next) {
// validationResult(req).throw(); //lanza excepcion si hay errores de validacion 
//   
// });

module.exports = router;
