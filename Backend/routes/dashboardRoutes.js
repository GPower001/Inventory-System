import express from "express";
import { 
  getDashboardStats,
  getRevenueData
} from "../controllers/dashboardController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", authenticate, getDashboardStats);
router.get("/revenue", authenticate, getRevenueData);

export default router;