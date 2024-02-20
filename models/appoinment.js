const mongoose = require('mongoose');
const uuid4 = require('uuid4');
// Define Appointment schema
const AppointmentSchema = new mongoose.Schema({
  appointment_id: {
    type: String,
    default:uuid4(),
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true
  },
 doctor_id: {
    type: String,
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
