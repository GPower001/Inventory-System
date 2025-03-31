// config/socket.js
import { Server } from 'socket.io';
import http from 'http';

let io;

/**
 * Initialize Socket.IO server
 * @param {http.Server} server - HTTP server instance
 * @returns {Server} Socket.IO server instance
 */
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
      skipMiddlewares: true
    }
  });

  // Connection event handlers
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    socket.on('error', (err) => {
      console.error(`Socket error (${socket.id}):`, err);
    });
  });

  return io;
};

/**
 * Get the Socket.IO server instance
 * @returns {Server}
 * @throws {Error} If Socket.IO is not initialized
 */
export const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

/**
 * Broadcast inventory update to all connected clients
 */
export const broadcastInventoryUpdate = () => {
  if (io) {
    io.emit('inventoryUpdate', { 
      timestamp: new Date().toISOString() 
    });
  }
};