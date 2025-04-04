import express from 'express';
import dashboardController from '../controllers/dashboardController.js'; // Ensure this is correctly imported

const router = express.Router();

// Route to get overall dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming user ID is stored in the request (e.g., from authentication middleware)
    const stats = await dashboardController.getDashboardStats(userId);
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
});

// Route to get revenue data for charts (weekly, monthly, yearly)
router.get('/revenue/:period', async (req, res) => {
  try {
    const userId = req.user.id;
    const { period } = req.params;  // Period could be 'weekly', 'monthly', or 'yearly'
    const revenueData = await dashboardController.getRevenueData(userId, period);
    res.json(revenueData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching revenue data' });
  }
});

// Route to get low stock items
router.get('/low-stock', async (req, res) => {
  try {
    const userId = req.user.id;
    const lowStockItems = await dashboardController.getLowStockItems(userId, 10); // Threshold for low stock (e.g., < 10)
    res.json(lowStockItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching low stock items' });
  }
});

// Route to get items approaching expiration
router.get('/expiring-items', async (req, res) => {
  try {
    const userId = req.user.id;
    const expiringItems = await dashboardController.getExpiringItems(userId, 30); // Items expiring in 30 days
    res.json(expiringItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching expiring items' });
  }
});

// Route to get sales performance data (weekly, monthly, etc.)
router.get('/sales-performance/:period', async (req, res) => {
  try {
    const userId = req.user.id;
    const { period } = req.params;  // Period could be 'weekly', 'monthly', or 'yearly'
    const salesPerformance = await dashboardController.getSalesPerformance(userId, period);
    res.json(salesPerformance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching sales performance' });
  }
});

// Route to get top selling items
router.get('/top-selling', async (req, res) => {
  try {
    const userId = req.user.id;
    const topSellingItems = await dashboardController.getTopSellingItems(userId, 5); // Limit to top 5 items
    res.json(topSellingItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching top selling items' });
  }
});

export default router;
