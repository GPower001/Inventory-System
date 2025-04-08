// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();

// const app = express();


// app.use(cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173", 
//     credentials: true,
// }));


// app.use(express.json());


// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/auth", authRoutes);

// export default app;



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ Recommended CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // ✅ Ensure no trailing slash
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Use CORS with options
app.use(cors(corsOptions));

// ✅ Parse JSON
app.use(express.json());

// ✅ Mount routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

export default app;
