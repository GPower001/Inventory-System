// models/Inventory.js
import mongoose from 'mongoose';

const InventorySchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    lastStockedDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model('Inventory', InventorySchema);

export default Inventory;
