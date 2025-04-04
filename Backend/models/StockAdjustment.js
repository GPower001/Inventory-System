// models/StockAdjustment.js
import mongoose from 'mongoose';

const StockAdjustmentSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    adjustmentType: {
      type: String,
      enum: ['add', 'remove', 'set'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    previousQuantity: {
      type: Number,
      required: true,
    },
    newQuantity: {
      type: Number,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    adjustedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a 'User' model for tracking who made the adjustment
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const StockAdjustment = mongoose.model('StockAdjustment', StockAdjustmentSchema);

export default StockAdjustment;
