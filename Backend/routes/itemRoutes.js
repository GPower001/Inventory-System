// server.js - Enhanced with better Socket.io integration
const app = require('./app');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Start server after database connection
    const PORT = process.env.PORT || 6000;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Enhanced Socket.io connection handlers
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);
  
  // Join a room (e.g., for specific dashboards or item categories)
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });
  
  // Handle item updates
  socket.on('item-update', (data) => {
    // Broadcast to all clients in the same room
    io.to(data.roomId).emit('item-updated', data);
  });
  
  // Handle new items
  socket.on('new-item', (data) => {
    // Broadcast to all clients in the same room
    io.to(data.roomId).emit('item-created', data);
  });
  
  // Handle item deletions
  socket.on('delete-item', (data) => {
    io.to(data.roomId).emit('item-deleted', data);
  });
  
  // Handle user activity for real-time presence
  socket.on('user-activity', (userData) => {
    socket.data.user = userData;
    io.emit('active-users', getUsersInRoom(userData.roomId));
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
    if (socket.data.user) {
      io.emit('active-users', getUsersInRoom(socket.data.user.roomId));
    }
  });
});

// Helper function to get users in a room
function getUsersInRoom(roomId) {
  const room = io.sockets.adapter.rooms.get(roomId);
  if (!room) return [];
  
  const users = [];
  for (const socketId of room) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket.data.user) {
      users.push(socket.data.user);
    }
  }
  return users;
}

// Export socket.io instance to be used elsewhere
module.exports = io;