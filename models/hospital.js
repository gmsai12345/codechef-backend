const mongoose = require('mongoose');

// Define schema
const hospitalSchema = new mongoose.Schema({
  id: {
    type: String,
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
