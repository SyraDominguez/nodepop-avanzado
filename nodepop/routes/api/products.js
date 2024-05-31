const express = require('express');
const router = express.Router();
const Products = require('../../models/Products');
const authenticateToken = require('../../lib/authMiddleware');

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
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

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
      if (isNaN(minPrice) || isNaN(maxPrice)) {
        return res.status(400).json({ error: 'Price range values must be numbers' });
      }
      filter.price = { $gte: minPrice, $lte: maxPrice };
    } else if (minPrice) {
      if (isNaN(minPrice)) {
        return res.status(400).json({ error: 'Minimum price must be a number' });
      }
      filter.price = { $gte: minPrice };
    } else if (maxPrice) {
      if (isNaN(maxPrice)) {
        return res.status(400).json({ error: 'Maximum price must be a number' });
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

    // Respond with JSON
    return res.json({ results: products });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
