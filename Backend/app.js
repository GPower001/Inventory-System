// // import express from "express";
// // import cors from "cors";
// // import morgan from "morgan";
// // import helmet from "helmet";
// // import authRoutes from "./routes/authRoutes.js";

// // const app = express();

// // // Middleware
// // app.use(cors());
// // app.use(helmet()); // Security headers
// // app.use(morgan("dev")); // Logs requests in development mode
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true })); // Support form data

// // // Routes
// // app.use("/auth", authRoutes);

// // // Global Error Handler
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
// // });

// // export default app;



// // import express from "express";
// // import cors from "cors";
// // import morgan from "morgan";
// // import helmet from "helmet";
// // import authRoutes from "./routes/authRoutes.js";
// // import itemRoutes from "./routes/itemRoutes.js";

// // const app = express();

// // // **CORS Middleware (Ensuring It Runs Before Routes)**
// // app.use(
// //     cors({
// //         origin: ["http://localhost:5173", process.env.FRONTEND_URL],
// //         credentials: true,
// //         methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
// //         allowedHeaders: ["Content-Type", "Authorization"],
// //     })
// // );

// // // **Preflight Requests**
// // app.options("*", cors());

// // // **Security & Logging Middlewares**
// // app.use(helmet());
// // app.use(morgan("dev"));

// // // **Body Parsers**
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));

// // // **Routes**
// // app.use('/api/dashboard', dashboardRoutes);
// // app.use('/api/items', itemRoutes);
// // app.use("/auth", authRoutes);
// // app.use("/uploads", express.static("uploads"));
// // app.use("/api/items", itemRoutes);

// // // **Global Error Handler**
// // app.use((err, req, res, next) => {
// //     console.error(err.stack);
// //     res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
// // });

// // export default app;
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import helmet from "helmet";
// import { logApiError } from "./utils/logger.js"; // Changed to ES module import
// import authRoutes from "./routes/authRoutes.js";
// import itemRoutes from "./routes/itemRoutes.js";
// import dashboardRoutes from "./routes/dashboardRoutes.js";

// const app = express();

// // **CORS Middleware (Ensuring It Runs Before Routes)**
// app.use(
//     cors({
//         origin: ["http://localhost:5173", process.env.FRONTEND_URL],
//         credentials: true,
//         methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//         allowedHeaders: ["Content-Type", "Authorization"],
//     })
// );

// // **Preflight Requests**
// app.options("*", cors());

// // **Security & Logging Middlewares**
// app.use(helmet());
// app.use(morgan("dev"));

// // ▼ HTTP Request Logging ▼
// app.use((req, res, next) => {
//     logToFile(`Request: ${req.method} ${req.path}`, 'info');
//     next();
//   });

// // **Body Parsers**
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // **Routes**
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/items', itemRoutes);
// app.use("/auth", authRoutes);
// app.use("/uploads", express.static("uploads"));


// // **Global Error Handler** (Enhanced with logging)
// app.use((err, req, res, next) => {
//     // 1. Log the error with context
//     logApiError(err, req);
    
//     // 2. Determine error response based on environment
//     const errorResponse = {
//         success: false,
//         error: process.env.NODE_ENV === 'development' 
//             ? {
//                 message: err.message,
//                 stack: err.stack
//               }
//             : 'Something went wrong',
//         ...err.errors && Object.keys(err.errors).length > 0 && { 
//             details: err.errors 
//         }
//     };

//     // 3. Send response
//     res.status(err.status || 500).json(errorResponse);
// });

// export default app;


import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { logToFile, logApiError } from "./utils/logger.js";
import { notifyDevTeam } from "./utils/monitoring.js";
import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// Async handler utility
const asyncHandler = (fn) => (req, res, next) => 
  Promise.resolve(fn(req, res, next)).catch(next);

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

// Security & Logging Middlewares
app.use(helmet());
app.use(morgan("dev"));

// Request Logging
app.use((req, res, next) => {
  logToFile(`Request: ${req.method} ${req.path} - IP: ${req.ip}`, 'info');
  next();
});

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/items', itemRoutes);
app.use("/auth", authRoutes);
app.use("/uploads", express.static("uploads"));

// Enhanced Global Error Handler
app.use((err, req, res, next) => {
  // Log error with context
  logApiError(err, req);
  
  // Notify team for critical errors
  if (err.isCritical) {
    notifyDevTeam(err).catch(e => console.error('Monitoring failed:', e));
  }

  // Prepare error response
  const response = {
    success: false,
    error: process.env.NODE_ENV === 'development' 
      ? {
          message: err.message,
          stack: err.stack,
          ...(err.errors && { details: err.errors })
        } 
      : 'Something went wrong',
    ...(err.code && { code: err.code })
  };

  // Send response
  res.status(err.status || 500).json(response);
});
export default app;