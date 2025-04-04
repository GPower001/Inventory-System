import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// **Middleware**
app.use(cors());
app.use(express.json());


app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);

export default app;
