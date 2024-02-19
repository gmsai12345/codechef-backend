const mongoose = require('mongoose');
const uuid4 = require('uuid4');

// Define the schema for products
const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    default:uuid4(),
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
