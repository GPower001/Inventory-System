// controllers/itemController.js
import Item from '../models/Item.js';
import StockAdjustment from '../models/StockAdjustment.js';
import { io } from '../server.js'; // Assuming you're exporting `io` for real-time updates

// Get all items with search filters
export const getItems = async (req, res, next) => {
  try {
    let query = {};

    const { search, category, type, filter, limit = 100 } = req.query;

    if (search) {
      query.itemName = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (type) {
      query.type = type;
    }

    if (filter === 'low-stock') {
      query = {
        ...query,
        $expr: { $lte: ['$currentQty', '$minStock'] },
      };
    }

    if (filter === 'expired') {
      query.expirationDate = { $lte: new Date() };
    }

    const items = await Item.find(query)
      .sort({ addedDate: -1 })
      .limit(parseInt(limit));

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

// Get a single item
export const getItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

// Create a new item
export const createItem = async (req, res, next) => {
  try {
    if (req.files?.image) {
      req.body.image = `/uploads/${req.files.image[0].filename}`;
    }

    req.body.currentQty = req.body.openingQty;
    req.body.createdBy = req.user.id;

    const item = await Item.create(req.body);

    // Record stock adjustment for the newly created item
    await StockAdjustment.create({
      item: item._id,
      adjustmentType: 'initial',
      quantity: item.openingQty,
      previousQuantity: 0,
      newQuantity: item.openingQty,
      reason: 'Initial stock entry',
      adjustedBy: req.user.id,
    });

    io.emit('inventoryUpdate', { action: 'create', item });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// Update an item
export const updateItem = async (req, res, next) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (req.files?.image) {
      req.body.image = `/uploads/${req.files.image[0].filename}`;
    }

    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    io.emit('inventoryUpdate', { action: 'update', item });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

// Delete an item
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    await item.remove();

    io.emit('inventoryUpdate', { action: 'delete', itemId: req.params.id });

    res.status(200).json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Adjust stock for an item
export const adjustStock = async (req, res, next) => {
  try {
    const { adjustmentType, quantity, reason, notes } = req.body;
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const prevQty = item.currentQty;
    const qty = parseInt(quantity);
    let newQty;

    switch (adjustmentType) {
      case 'add':
        newQty = prevQty + qty;
        break;
      case 'remove':
        newQty = prevQty - qty;
        if (newQty < 0) {
          return res.status(400).json({
            success: false,
            message: 'Cannot remove more than current stock',
          });
        }
        break;
      case 'set':
        newQty = qty;
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid adjustment type' });
    }

    const adjustment = await StockAdjustment.create({
      item: item._id,
      adjustmentType,
      quantity: qty,
      previousQuantity: prevQty,
      newQuantity: newQty,
      reason,
      notes,
      adjustedBy: req.user.id,
    });

    item.currentQty = newQty;
    await item.save();

    io.emit('inventoryUpdate', { action: 'adjust', item });

    res.status(200).json({ success: true, data: adjustment });
  } catch (error) {
    next(error);
  }
};
