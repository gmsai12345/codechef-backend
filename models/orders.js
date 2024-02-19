const mongoose = require('mongoose');
const uuid4 = require('uuid4');

// Define the schema for orders
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    default:uuid4(),
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  serviceIds: {
    type: [String],
    required: true
  }
});

// Create a model for the orders schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
