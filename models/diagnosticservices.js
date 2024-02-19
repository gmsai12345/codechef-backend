const mongoose = require('mongoose');
const uuid4 = require('uuid4');

// Define schema
const DiagnosticCentreSchema = new mongoose.Schema({
  id: {
    type: String,
    default:uuid4(),
    required: true,
    unique: true
  },
  centername: {
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
const DiagnosticCentre = mongoose.model('DiagnosticCentre', DiagnosticCentreSchema);

module.exports = DiagnosticCentre;
