import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import app from "./app.js";
import swaggerDocs from "./swagger.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import { apiLimiter, authLimiter } from "./config/rateLimit.js";

dotenv.config();
connectDB();

const server = http.createServer(app);

// =======================
// 1. Middleware Setup
// =======================
app.use(morgan("dev")); // HTTP request logging

const allowedOrigins = [
  "http://localhost:5173", 
  process.env.FRONTEND_URL,
];

// CORS Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

// Rate Limiting
app.use("/api/", apiLimiter); // General API limiter
app.use("/api/auth", authLimiter); // Strict auth limiter

// =======================
// 2. Socket.IO Setup
// =======================
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // Fixed typo from allowedOrigins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Attach Socket.io to requests
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.emit("welcome", { message: "Welcome to the WebSocket server!" });

  socket.on("updateData", (data) => {
    console.log("Received updateData:", data);
    io.emit("dataUpdated", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// =======================
// 3. Routes & Documentation
// =======================
// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Swagger Documentation
swaggerDocs(app);

// =======================
// 4. Error Handling (MUST BE LAST)
// =======================
app.use(errorHandler);

// =======================
// 5. Server Startup
// =======================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📄 API Docs at http://localhost:${PORT}/api-docs`);
  console.log(`⚡ WebSocket ready at ws://localhost:${PORT}`);
});