const mongoose = require('mongoose');
const uuid4 = require('uuid4');

// Define Service schema
const serviceSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid4(),
        required: true,
        unique: true
    },
    name: String,
    price: String,
    description: String
});

// Define Doctor schema
const doctorSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid4(),
        required: true,
        unique: true
    },
    name: String,
    specialization: String,
    // Add more fields as needed
});

// Define DiagnosticService schema
const diagnosticServiceSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid4(),
        required: true,
        unique: true
    },
    name: String,
    // Add more fields as needed
});

// Define Specialty schema
const specialtySchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid4(),
        required: true,
        unique: true
    },
    name: String,
    // Add more fields as needed
});

// Define DiagnosticCentre schema
const diagnosticCentreSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid4(),
        required: true,
        unique: true
    },
    centername: {
        type: String,
        required: true
    },
    services: [serviceSchema],
    doctors: [doctorSchema],
    diagnosticServices: [diagnosticServiceSchema],
    specialties: [specialtySchema]
});

// Create DiagnosticCentre model
const DiagnosticCentre = mongoose.model('DiagnosticCentre', diagnosticCentreSchema);

module.exports = DiagnosticCentre;
