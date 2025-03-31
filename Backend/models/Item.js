// import mongoose from "mongoose";

// const itemSchema = new mongoose.Schema({
//   itemName: { type: String, required: true },
//   category: { type: String, required: true },
//   enabled: { type: String, enum: ["Product", "Service"], required: true },
//   openingQty: { type: Number, default: 0 },
//   minStock: { type: Number, default: 0 },
//   date: { type: Date, required: true },
//   itemCode: { type: String, required: true },
//   imageUrl: { type: String },
// }, { timestamps: true });

// export default mongoose.model("Item", itemSchema);

import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, required: true, min: 0 },
  minStock: { type: Number, default: 10 },
  price: { type: Number, required: true, min: 0 },
  salePrice: { type: Number, min: 0 },
  category: String,
  imageUrl: String,
  expirationDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

itemSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Item', itemSchema);
