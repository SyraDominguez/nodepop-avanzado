const mongoose = require('mongoose');

// define products schema
const productSchema = new mongoose.Schema({
  name: String,
  sale: { type: Boolean, index: true },
  price: Number,
  photo: { type: String, index: true },
  tags: [String]
  // owner:
});

// listing method
productSchema.statics.listing = function (filter, skip, limit, sort, fields, tags) {
  const query = Products.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  query.listing('tags');

  return query.exec();
};

// create the model for products
const Products = mongoose.model('Products', productSchema);

// (optional) export the model
module.exports = Products;