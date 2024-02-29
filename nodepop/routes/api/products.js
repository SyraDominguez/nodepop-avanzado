var express = require('express');
var router = express.Router();
const Products = require('../../models/Products');


/* GET products listing. */
router.get('/', async function (req, res, next) {
  try {
    const products = await Products.find();
    res.json({ results: products });
  } catch (error) {
    next(error);
  }

});

module.exports = router;