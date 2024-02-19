const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Appointment = require('./models/appoinment');
const Doctor = require('./models/doctor');
const Hospital = require('./models/hospital');
const User = require('./models/user');
const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = "mongodb+srv://saidhakshan4:Sai%4012345@cluster0.qtbhurf.mongodb.net/";

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get('/api/appoinments', async (req, res) => {
    try {
      // Fetch all appointments
      const appointments = await Appointment.find({});
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  app.get('/api/appoinments/:id', async (req, res) => {
    try {
      // Fetch all appointments
      const id = req.query();
      const appointments = await Appointment.findOne(id);
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  app.post('/api/users', async (req, res) => {
    try {
      // Create a new user based on the request body
      const user = await User.create(req.body);
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  
app.post('/api/appoinments', async (req, res) => {
    try {
      // Create a new appointment based on the request body
      const appointment = await Appointment.create(req.body);
      res.status(201).json({ success: true, data: appointment });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  app.get('/api/doctors', async (req, res) => {
    try {
      // Fetch all doctors
      const doctors = await Doctor.find({});
      res.status(200).json({ success: true, data: doctors });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  app.get('/api/doctors/:specialization', async (req, res) => {
    const { specialization } = req.params;
    
    try {
      // Fetch doctors by specialization
      const doctors = await Doctor.find({ doctor_specialization: specialization });
      res.status(200).json({ success: true, data: doctors });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  app.get('/api/hospitals/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    
    try {
      // Fetch hospitals by serviceId
      const hospitals = await Hospital.find({ servicesId: serviceId });
      res.status(200).json({ success: true, data: hospitals });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  
  // Define route to handle GET requests for all hospitals
  app.get('/api/hospitals', async (req, res) => {
    try {
      // Fetch all hospitals
      const hospitals = await Hospital.find({});
      res.status(200).json({ success: true, data: hospitals });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  
  // Define route to handle POST requests for creating hospitals
  app.post('/api/hospitals', async (req, res) => {
    try {
      // Create a new hospital based on the request body
      const hospital = await Hospital.create(req.body);
      res.status(201).json({ success: true, data: hospital });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
// Connect to MongoDB
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
    // Start the server after the database connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define routes
app.get('/', (req, res) => {
  res.send("This is a stack overflow clone API");
});
