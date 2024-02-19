const mongoose = require('mongoose');

// Define Doctor schema
const DoctorSchema = new mongoose.Schema({
  doctor_id: {
    type: String,
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
