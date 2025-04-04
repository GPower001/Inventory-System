// controllers/dashboardController.js
import dayjs from 'dayjs';
import Item from '../models/Item.js';
import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';

const handleError = (res, error) =>
  res.status(500).json({ message: error.message });

// Fetch overall stats
export const getStats = async (req, res) => {
  try {
    const [totalItems, totalOrders, totalInventory] = await Promise.all([
      Item.countDocuments(),
      Order.countDocuments(),
      Inventory.countDocuments(),
    ]);

    res.json({ totalItems, totalOrders, totalInventory });
  } catch (error) {
    handleError(res, error);
  }
};

// Calculate revenue for the current month
export const getRevenue = async (req, res) => {
  try {
    const currentMonth = dayjs().month() + 1;
    const currentYear = dayjs().year();

    const orders = await Order.aggregate([
      {
        $match: {
          status: 'delivered',
          createdAt: {
            $gte: new Date(`${currentYear}-${currentMonth}-01`),
            $lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' },
        },
      },
    ]);

    const monthlyTotal = orders[0]?.total || 0;

    res.json({ monthlyRevenue: parseFloat(monthlyTotal.toFixed(2)) });
  } catch (error) {
    handleError(res, error);
  }
};

// Sales performance over the past 12 months
export const getSalesPerformance = async (req, res) => {
  try {
    const salesPerformance = await Order.aggregate([
      {
        $match: {
          status: 'delivered',
          createdAt: {
            $gte: new Date(dayjs().subtract(11, 'month').startOf('month')),
            $lte: new Date(),
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          total: { $sum: '$totalPrice' },
        },
      },
      {
        $project: {
          month: {
            $concat: [
              { $arrayElemAt: [
                ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ], '$_id.month'
              ] },
              '-', { $toString: '$_id.year' },
            ],
          },
          total: 1,
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.json(salesPerformance);
  } catch (error) {
    handleError(res, error);
  }
};

// Fetch low stock items
export const getLowStockItems = async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({ quantity: { $lt: 10 } }).sort({ quantity: 1 });
    res.json(lowStockItems);
  } catch (error) {
    handleError(res, error);
  }
};

// Fetch expiring items
export const getExpiringItems = async (req, res) => {
  try {
    const today = dayjs();
    const next30Days = today.add(30, 'day');

    const expiringItems = await Inventory.find({
      expiryDate: { $gte: today.toDate(), $lte: next30Days.toDate() },
    }).sort({ expiryDate: 1 });

    res.json(expiringItems);
  } catch (error) {
    handleError(res, error);
  }
};

// Fetch top-selling items
export const getTopSellingItems = async (req, res) => {
  try {
    const topSellingItems = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.item',
          totalQuantity: { $sum: '$items.quantity' },
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: '_id',
          foreignField: '_id',
          as: 'item',
        },
      },
      { $unwind: '$item' },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          item: '$item.name',
          totalQuantity: 1,
        },
      },
    ]);

    res.json(topSellingItems);
  } catch (error) {
    handleError(res, error);
  }
};

const dashboardController = {
  getStats,
  getRevenue,
  getSalesPerformance,
  getLowStockItems,
  getExpiringItems,
  getTopSellingItems
};


export default dashboardController;