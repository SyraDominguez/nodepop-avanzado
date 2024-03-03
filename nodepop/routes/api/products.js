const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
const Products = require('../../models/Products');


/* GET products list */

// all products
router.get('/', async (req, res, next) => {
  try {
    // Filters
    const filterByName = req.query.name;
    const filterBySale = req.query.sale;
    const filterByTags = req.query.tags;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const startsWithLetter = req.query.startsWithLetter;
    const containsString = req.query.containsString;

    // Pagination
    const skip = req.query.skip;
    const limit = req.query.limit;

    // Ordenation
    const sort = req.query.sort;

    // Field selection
    const fields = req.query.fields;

    const filter = {};

    // filter by name
    if (filterByName) {
      filter.name = filterByName;
    }

    // select buy and sell
    if (filterBySale !== undefined) {
      if (filterBySale !== 'true' && filterBySale !== 'false') {
        return res.status(400).json({ error: 'Invalid value for sale parameter. Please use true or false.' });
      }
      filter.sale = filterBySale === 'true';
    }

    // filter by tags
    if (filterByTags) {
      filter.tags = filterByTags;
    }

    // filter for price range
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
    // filter to search starting with a letter
    if (startsWithLetter) {
      const regex = new RegExp(`^${startsWithLetter}`, 'i');
      filter.name = { $regex: regex };
    }

    // filter to search by content in name
    if (containsString) {
      const regex = new RegExp(containsString, 'i');
      filter.name = { $regex: regex };
    }

    const products = await Products.listing(filter, skip, limit, sort, fields);

    // product is not on the list
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found with the specified criteria' });
    }

    res.json({ results: products });
  } catch (error) {
    next(error);
  }
});

// single product
router.get('/:id', async (req, res, next) => {
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
router.get('/tags/existing', async (req, res, next) => {
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


// update a product
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Validate if id is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

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