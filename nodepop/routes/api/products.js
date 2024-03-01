var express = require('express');
var router = express.Router();
const Products = require('../../models/Products');




/* GET products list */

// all products
router.get('/', async (req, res, next) => {
  try {

    // filters
    const filterByName = req.query.name;
    const filterBySale = req.query.sale;
    const filterByTags = req.query.tags;

    // pagination
    const skip = req.query.skip
    const limit = req.query.limit

    //sorting
    const sort = req.query.sort;

    // fields selection
    const fields = req.query.fields;

    const filter = {};

    if (filterByName) {
      filter.name = filterByName;
    }

    if (filterBySale) {
      filter.sale = filterBySale;
    }

    if (filterByTags) {
      filter.tags = filterByTags;
    }

    const products = await Products.listing(filter, skip, limit, sort, fields, tags);
    res.json({ results: products });
  } catch (error) {
    next(error);
  }
});

// single product
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await Products.findById(req.params.id);

    res.json({ result: product });
  } catch (error) {
    next(error);
  }
});

// update a product
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateProduct = await Products.findByIdAndUpdate(id, data, { new: true });

    res.json({ result: updateProduct });
  } catch (error) {
    next(error);
  }
});

// create a new product
router.post('/', async (req, res, next) => {
  try {
    const data = req.body;

    const product = new Products(data);

    const newProduct = await product.save();

    res.json({ result: newProduct });

  } catch (error) {
    next(error);
  }
});

// delete a product
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Products.deleteOne({ _id: id });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});


module.exports = router;