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

// listing method
productSchema.statics.listing = function (filter, skip, limit) {
  const query = Products.find(filter);
  query.skip(skip);
  query.limit(limit);
  return query.exec();
};

// create the model for products
const Products = mongoose.model('Products', productSchema);

// (optional) export the model
module.exports = Products;