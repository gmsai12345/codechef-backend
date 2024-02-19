const mongoose = require('mongoose');

// Define Appointment schema
const AppointmentSchema = new mongoose.Schema({
  appointment_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  start_datetime: {
    type: Date,
    required: true
  }
});

// Create Appointment model
const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
