const mongoose = require('mongoose');

// define products schema
const productSchema = new mongoose.Schema({
  name: String,
  sale: Boolean,
  price: Number,
  photo: String,
  tags: [String]
  // owner:
});

// create the model for products
const Products = mongoose.model('Products', productSchema);

// (optional) export the model
module.exports = Products;