// import Item from "../models/Item.js";

// export const getDashboardStats = async (req, res) => {
//   try {
//     const today = new Date();
    
//     const [totalProducts, lowStockItems, expiredItems] = await Promise.all([
//       Item.countDocuments(),
//       Item.countDocuments({ quantity: { $lt: "$minStock" } }),
//       Item.countDocuments({ expirationDate: { $lt: today } })
//     ]);

//     res.json({
//       totalProducts,
//       lowStockItems,
//       expiredItems,
//       lastUpdated: new Date()
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getRevenueData = async (req, res) => {
//   try {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
//     const currentMonth = new Date().getMonth();
//     const amounts = await Promise.all(
//       months.map((_, index) => 
//         Order.aggregate([
//           {
//             $match: {
//               createdAt: {
//                 $gte: new Date(new Date().getFullYear(), index, 1),
//                 $lt: new Date(new Date().getFullYear(), index + 1, 1)
//               }
//             }
//           },
//           { $group: { _id: null, total: { $sum: "$totalAmount" } } }
//         ])
//       )
//     );

//     res.json({
//       months,
//       amounts: amounts.map(m => m[0]?.total || 0)
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

import Item from "../models/Item.js";
import Order from "../models/Order.js";

// Dashboard Statistics
export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    
    const [totalProducts, lowStockItems, expiredItems] = await Promise.all([
      Item.countDocuments(),
      // Use either the direct number (10) or $minStock field from your items
      Item.countDocuments({ $expr: { $lt: ["$quantity", "$minStock"] } }), // More dynamic
      Item.countDocuments({ expirationDate: { $lt: today } })
    ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        lowStockItems,
        expiredItems,
        lastUpdated: new Date()
      }
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: "Failed to load dashboard data" 
    });
  }
};

// Revenue Data (Simplified)
export const getRevenueData = async (req, res) => {
  try {
    // Get revenue for current year only
    const revenueData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getFullYear(), 0, 1), // Start of year
            $lt: new Date(new Date().getFullYear() + 1, 0, 1) // Start of next year
          }
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" }
        }
      },
      {
        $project: {
          month: "$_id",
          total: 1,
          _id: 0
        }
      }
    ]);

    // Map to month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedData = monthNames.map((name, index) => {
      const monthData = revenueData.find(d => d.month === index + 1);
      return {
        month: name,
        total: monthData?.total || 0
      };
    });

    res.json({
      success: true,
      data: {
        months: formattedData.map(d => d.month),
        amounts: formattedData.map(d => d.total)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to load revenue data"
    });
  }
};