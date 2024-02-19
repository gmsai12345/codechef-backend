const mongoose = require('mongoose');
const uuid4 = require('uuid4');

// Define the schema for orders
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    default:uuid4(),
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  productIds: {
    type: [String],
    required: true
  }
});

// Create a model for the orders schema
const MedicalOrder = mongoose.model('MedicalOrder', orderSchema);

module.exports = MedicalOrder;
