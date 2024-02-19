const mongoose = require('mongoose');
const uuid4 = require('uuid4');

// Define schema
const hospitalSchema = new mongoose.Schema({
  id: {
    type: String,
    default:uuid4(),
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  servicesId: [{
    type: String
  }],
  doctorsId: [{
    type: String
  }],
  diagnosticServicesId: [{
    type: String
  }],
  specsIds: [{
    type: String
  }]
});

// Create model
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
