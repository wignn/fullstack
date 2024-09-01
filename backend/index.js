const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const BookRoutes = require('./src/routes/bookRaoute')


dotenv.config();

const app = express();
app.use(express.json()); 

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Use routes
app.use('/users', userRoutes);
app.use('/books', BookRoutes)

// Test API
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
