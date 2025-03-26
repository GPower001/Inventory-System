  import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import app from "./app.js";
import swaggerDocs from "./swagger.js";

dotenv.config();
connectDB();

const server = http.createServer(app);

const allowedOrigins = [
    "http://localhost:5173", 
    process.env.FRONTEND_URL,  // Ensure this is correctly defined in `.env`
];

// **CORS Middleware for Express (Fix for Credentials Issue)**
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // Allow the request
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Required for authentication
    })
);

// Allow Preflight Requests
app.options("*", cors());

// **Socket.io CORS Fix**
const io = new Server(server, {
    cors: {
        origin: allowedOrigins, // No "*", only specific frontend URLs
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    },
});

// **Attach Socket.io to Requests for Real-Time Updates**
app.use((req, res, next) => {
    req.io = io;
    next();
});

// **Swagger Documentation**
swaggerDocs(app);

// **WebSocket Connection Handling**
io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.emit("welcome", { message: "Welcome to the WebSocket server!" });

    socket.on("updateData", (data) => {
        console.log("Received updateData:", data);
        io.emit("dataUpdated", data); // Broadcast update
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

// **Start Server**
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
