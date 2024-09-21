const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./config/db');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration to allow requests from localhost:5173 (frontend)
app.use(cors({
  origin: 'http://localhost:5173', // Allow only the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true // Allow cookies if needed
}));

app.use(express.json());

dbConnect();

const eventRoutes = require('./routes/event');
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send(`<h1>This is HomePage</h1>`);
});
