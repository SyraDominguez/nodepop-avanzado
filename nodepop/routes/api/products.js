const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const Products = require('../../models/Products');
const authenticateToken = require('../../middlewares/verifyToken');

// All products
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    // Filters
    const filterByName = req.query.name;
    const filterBySale = req.query.sale;
    const filterByTags = req.query.tags;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;

    // Pagination
    const skip = req.query.skip;
    const limit = req.query.limit;

    // Sorting
    let sort = {};
    if (req.query.sortByPrice === 'asc') {
      sort.price = 1;
    } else if (req.query.sortByPrice === 'desc') {
      sort.price = -1;
    }

    // Field selection
    const fields = req.query.fields;

    const filter = {};

    // Filter by name
    if (filterByName) {
      filter.name = filterByName;
    }

    // Select buy and sell
    if (filterBySale !== undefined) {
      if (filterBySale !== 'true' && filterBySale !== 'false') {
        return res.status(400).json({ error: 'Invalid value for sale parameter. Please use true or false.' });
      }
      filter.sale = filterBySale === 'true';
    }

    // Filter by tags
    if (filterByTags) {
      filter.tags = filterByTags;
    }

    // Filter for price range
    if (minPrice && maxPrice) {
      if (!Number.isInteger(Number(minPrice)) || !Number.isInteger(Number(maxPrice))) {
        return res.status(400).json({ error: 'Price range values must be integers' });
      }
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      if (!Number.isInteger(Number(minPrice))) {
        return res.status(400).json({ error: 'Minimum price must be an integer' });
      }
      filter.price = { $gte: minPrice };
    } else if (maxPrice) {
      if (!Number.isInteger(Number(maxPrice))) {
        return res.status(400).json({ error: 'Maximum price must be an integer' });
      }
      filter.price = { $lte: maxPrice };
    }

    // Filter for Start With & Contain
    if (req.query.searchTerm) {
      if (req.query.searchType === 'startsWith') {
        filter.name = { $regex: `^${req.query.searchTerm}`, $options: 'i' };
      } else if (req.query.searchType === 'contains') {
        filter.name = { $regex: req.query.searchTerm, $options: 'i' };
      }
    }

    const products = await Products.listing(filter, skip, limit, sort, fields);

    // Product is not on the list
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found with the specified criteria' });
    }

    // Respond with JSON
    return res.json({ results: products });
  } catch (error) {
    next(error);
  }
});

// single product
router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product id' });
    }

    const product = await Products.findById(req.params.id);
    console.log("Found product:", product);

    res.json({ result: product });
  } catch (error) {
    next(error);
  }
});

// listing tags
router.get('/tags/existing', authenticateToken, async (req, res, next) => {
  try {
    const distinctTags = await Products.distinct('tags');

    if (distinctTags.length === 0) {
      return res.status(404).json({ message: 'No tags found' });
    }

    // Filter out empty or undefined tags
    const existingTags = distinctTags.filter(tag => tag !== undefined && tag !== '');

    res.json({ tags: existingTags });
  } catch (error) {
    next(error);
  }
});

// create a new product
router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const data = req.body;

    const product = new Products(data);

    const newProduct = await product.save();

    // res.json({ result: newProduct });
    res.redirect('/');

  } catch (error) {
    next(error);
  }
});

// update a product
router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Validate if id is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const updateProduct = await Products.findByIdAndUpdate(id, data, { new: true });

    res.json({ result: updateProduct });
    // res.redirect('/');
  } catch (error) {
    next(error);
  }
});

// delete a product
router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    await Products.deleteOne({ _id: id });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
