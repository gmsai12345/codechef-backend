const mongoose = require('mongoose');
const uuid4 = require('uuid4');

// Define Service schema
const serviceSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: String,
    description: String
});

// Define Hospital schema
const hospitalSchema = new mongoose.Schema({
    id: {
      type:String,
      default:uuid4(),
      required:true
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: String,
    image: String,
    services: [serviceSchema]
});

// Create Hospital model
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
