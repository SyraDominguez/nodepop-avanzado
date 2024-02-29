const mongoose = require('mongoose');

// define products schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sale: { type: Boolean, required: true },
  price: { type: Number, required: true },
  photo: String,
  tags: [String]
  // owner:
});

// create the model for products
const Products = mongoose.model('Products', productSchema);

// (optional) export the model
module.exports = Products;