var express = require('express');
var router = express.Router();
const { query, custom, validationResult } = require('express-validator');
// const { routes } = require('../app');

/* GET home page. */
router.get('/', function (req, res, next) {

  // current date
  const now = new Date();
  res.render('index', { title: 'NODEPOP', now: now });

});


module.exports = router;
