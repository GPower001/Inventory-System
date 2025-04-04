import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import connectDB from "./config/db.js";
import app from "./app.js";
import swaggerDocs from "./swagger.js";

// Load environment variables
dotenv.config();

// Ensure uploads directory exists
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    },
});

// Attach io to all requests
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Swagger Docs
swaggerDocs(app);

// --- Socket.io Logic ---
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Welcome message
    socket.emit("welcome", { message: "Welcome to the WebSocket server!" });

    // Join Room
    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Broadcast update to room
    socket.on("item-update", (data) => {
        io.to(data.roomId).emit("item-updated", data);
    });

    // New item broadcast
    socket.on("new-item", (data) => {
        io.to(data.roomId).emit("item-created", data);
    });

    // Delete item broadcast
    socket.on("delete-item", (data) => {
        io.to(data.roomId).emit("item-deleted", data);
    });

    // Track active users in room
    socket.on("user-activity", (userData) => {
        socket.data.user = userData;
        io.to(userData.roomId).emit("active-users", getUsersInRoom(userData.roomId));
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
        if (socket.data.user) {
            io.to(socket.data.user.roomId).emit("active-users", getUsersInRoom(socket.data.user.roomId));
        }
    });
});

// Helper to get all users in a room
function getUsersInRoom(roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) return [];

    const users = [];
    for (const socketId of room) {
        const socket = io.sockets.sockets.get(socketId);
        if (socket?.data?.user) {
            users.push(socket.data.user);
        }
    }
    return users;
}

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
