const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  documents: [{
    type: String // Assuming documents are stored as URLs or file paths
  }],
  appointments: [{
    date: {
      type: Date,
    },
    description: String
  }],
  medicalHistory: {
    type: String
  }
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;
