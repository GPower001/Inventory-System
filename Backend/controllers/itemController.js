// import Item from "../models/Item.js";

// export const addItem = async (req, res) => {
//   try {
//     const { itemName, category, enabled, openingQty, minStock, date, itemCode } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

//     const newItem = new Item({ itemName, category, enabled, openingQty, minStock, date, itemCode, imageUrl });
//     await newItem.save();

//     res.status(201).json({ message: "Item added successfully", item: newItem });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



// import Item from "../models/Item.js";

// /**
//  * @desc Get all items
//  * @route GET /api/items
//  * @access Public
//  */
// export const getItems = async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.status(200).json(items);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// /**
//  * @desc Add new item
//  * @route POST /api/items
//  * @access Public
//  */
// export const addItem = async (req, res) => {
//   try {
//     const { name, quantity, salePrice, purchasePrice } = req.body;

//     if (!name || !quantity) {
//       return res.status(400).json({ message: "Name and quantity are required" });
//     }

//     const newItem = new Item({
//       name,
//       quantity,
//       salePrice: salePrice || 0,
//       purchasePrice: purchasePrice || 0,
//     });

//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };


import Item from '../models/Item.js';
import { broadcastInventoryUpdate } from '../utils/socket.js';

/**
 * @desc Get items with optional filtering and pagination
 * @route GET /api/items
 * @access Private
 * @param {number} limit - Maximum number of items to return
 * @param {string} filter - Filter type ('low-stock' or 'expired')
 */
export const getItems = async (req, res) => {
  try {
    const { limit = 5, filter, search } = req.query;
    let query = {};

    // Apply filters
    if (filter === 'low-stock') {
      query = { $expr: { $lt: ['$quantity', '$minStock'] } };
    } else if (filter === 'expired') {
      query = { expirationDate: { $lt: new Date() } };
    }

    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('-__v'); // Exclude version key

    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (err) {
    console.error(`Error fetching items: ${err.message}`);
    res.status(500).json({ 
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc Create new inventory item
 * @route POST /api/items
 * @access Private
 */
export const addItem = async (req, res) => {
  try {
    const { name, quantity, minStock, price, salePrice, expirationDate, category } = req.body;

    // Validation
    if (!name || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Name and quantity are required'
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        error: 'Quantity cannot be negative'
      });
    }

    const newItem = new Item({
      name,
      quantity,
      minStock: minStock || 10,
      price,
      salePrice: salePrice || price,
      expirationDate,
      category,
      ...(req.file && { imageUrl: `/uploads/${req.file.filename}` })
    });

    const savedItem = await newItem.save();
    
    // Notify all connected clients
    broadcastInventoryUpdate();

    res.status(201).json({
      success: true,
      data: savedItem
    });
  } catch (err) {
    console.error(`Error adding item: ${err.message}`);
    
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Item with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

/**
 * @desc Update an existing item
 * @route PUT /api/items/:id
 * @access Private
 */
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Prevent certain fields from being updated
    delete updates._id;
    delete updates.createdAt;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { ...updates, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        error: 'Item not found'
      });
    }

    broadcastInventoryUpdate();
    
    res.json({
      success: true,
      data: updatedItem
    });
  } catch (err) {
    console.error(`Error updating item: ${err.message}`);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};