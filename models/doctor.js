const mongoose = require('mongoose');
const uuid4 = require('uuid4');

// Define Doctor schema
const DoctorSchema = new mongoose.Schema({
  doctor_id: {
    type: String,
    default:uuid4(),
    required: true,
    unique: true
  },
  doctor_name: {
    type: String,
    required: true
  },
  doctor_specialization: {
    type: String,
    required: true
  },
  doctor_prices: {
    type: Map,
    of: Number
  }
});

// Create Doctor model
const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
