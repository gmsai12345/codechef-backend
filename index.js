const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Appointment = require('./models/appoinment');
const Doctor = require('./models/doctor');
const Hospital = require('./models/hospital');
const User = require('./models/user');
const MedicalOrder = require('./models/medicalorder');
const Product = require('./models/product');
const Order = require('./models/orders');
const DiagnosticCentre = require('./models/diagnosticCentre')
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGODB_URI;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.get('/api/hospitals/:name', async (req, res) => {
  try {
    // Fetch all appointments
    const name  = req.params.name;
    const hospital = await Hospital.findOne({title:name});
    res.status(200).json({ success: true, data: hospital });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
app.get('/api/appoinments', async (req, res) => {
    try {
      // Fetch all appointments
      const appointments = await Appointment.find({});
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  app.get('/api/products', async (req, res) => {
    try {
      // Retrieve all products from the database
      const products = await Product.find();
  
      res.status(200).json(products);
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ message: 'Error retrieving products' });
    }
  });
  
  // Route to get a product by name
  app.get('/api/products/:name', async (req, res) => {
    try {
      const name = req.params.name;
  
      // Retrieve the product from the database by name
      const product = await Product.findOne({ name });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error('Error retrieving product by name:', error);
      res.status(500).json({ message: 'Error retrieving product by name' });
    }
  });
  
  // Route to create a new product
  app.post('/api/products', async (req, res) => {
    try {
      const { productId, name, description, price } = req.body;
  
      // Create a new product instance
      const product = new Product({
        productId,
        name,
        description,
        price
      });
  
      // Save the product to the database
      await product.save();
  
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Error creating product' });
    }
  });
  app.post('/api/orders', async (req, res) => {
    try {
      const { orderId, userId, serviceIds } = req.body;
  
      // Create a new order instance
      const order = new Order({
        orderId,
        userId,
        serviceIds
      });
  
      // Save the order to the database
      await order.save();
  
      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Error creating order' });
    }
  });
  
  // Route to get orders by user ID
  app.get('/api/orders/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Retrieve orders from the database by user ID
      const orders = await Order.find({ userId });
  
      if (orders.length === 0) {
        return res.status(404).json({ message: 'Orders not found for the user ID' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error retrieving orders by user ID:', error);
      res.status(500).json({ message: 'Error retrieving orders by user ID' });
    }
  });
  app.get('/api/appoinments/:id', async (req, res) => {
    try {
      // Fetch all appointments
      const id = req.params.id;
      const appointments = await Appointment.findOne(id);
      res.status(200).json({ success: true, data: appointments });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  app.post('/api/medicalorders', async (req, res) => {
    try {
      const { orderId, userId, productIds } = req.body;
  
      // Create a new medical order instance
      const medicalOrder = new MedicalOrder({
        orderId,
        userId,
        productIds
      });
  
      // Save the medical order to the database
      await medicalOrder.save();
  
      res.status(201).json({ message: 'Medical order created successfully', medicalOrder });
    } catch (error) {
      console.error('Error creating medical order:', error);
      res.status(500).json({ message: 'Error creating medical order' });
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

  app.post('/api/doctors', async (req, res) => {
    try {
      // Create a new appointment based on the request body
      const doctor = await Doctor.create(req.body);
      res.status(201).json({ success: true, data: doctor });
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
  app.get('/api/doctors/specialization', async (req, res) => {
    const { specialization } = req.query;
    
    try {
      // Fetch doctors by specialization
      const doctors = await Doctor.find({ doctor_specialization: specialization });
      res.status(200).json({ success: true, data: doctors });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  });
  app.get('/api/hospitals/serviceId', async (req, res) => {
    const { serviceId } = req.query;
    
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
  app.post('/api/diagnostic-centers', async (req, res) => {
    try {
        // Create a new diagnostic center based on the request body
        const diagnosticCentre = await DiagnosticCentre.create(req.body);
        res.status(201).json({ success: true, data: diagnosticCentre });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// GET endpoint to get all diagnostic centers
app.get('/api/diagnostic-centers', async (req, res) => {
    try {
        const diagnosticCentres = await DiagnosticCentre.find();
        res.status(200).json({ success: true, data: diagnosticCentres });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET endpoint to get diagnostic centers by name
app.get('/api/diagnostic-centers/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const diagnosticCentres = await DiagnosticCentre.find({ centername: name });
        if (diagnosticCentres.length === 0) {
            res.status(404).json({ success: false, message: 'Diagnostic center not found' });
        } else {
            res.status(200).json({ success: true, data: diagnosticCentres });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// Define routes
app.get('/', (req, res) => {
  res.send("This is a stack overflow clone API");
});
