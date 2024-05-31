var express = require('express');
var router = express.Router();
const { query, custom, validationResult } = require('express-validator');

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login', lang: req.query.lang || 'es' });
});

/* GET home page. */
router.get('/', function (req, res, next) {

  // current date
  const now = new Date();
  res.render('index', { title: 'NODEPOP', now: now, lang: req.query.lang || 'es' });

});


module.exports = router;
