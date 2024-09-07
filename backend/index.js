const express = require('express');
const dotenv = require('dotenv');
const http = require('http'); 
const { WebSocketServer } = require('ws'); 
const userRoutes = require('./src/routes/userRoutes');
const BookRoutes = require('./src/routes/bookRaoute');
const ProfileRoutes = require('./src/routes/ProfileRoute');
const MsgRoute = require('./src/routes/MsgRoute');
const { setWss } = require('./src/middleware/websocket'); 

dotenv.config();

const app = express();
app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Use routes
app.use('/users', userRoutes);
app.use('/book', BookRoutes);
app.use('/profiles', ProfileRoutes);
app.use('/Msg', MsgRoute);

// Test API
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});


const server = http.createServer(app);
const wss = new WebSocketServer({ server });


setWss(wss);

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
