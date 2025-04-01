import express from "express";
import { 
  getDashboardStats,
  getRevenueData
} from "../controllers/dashboardControllers.js";
import  authenticate  from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/stats", authenticate, getDashboardStats);
router.get("/revenue", authenticate, getRevenueData);

export default router;