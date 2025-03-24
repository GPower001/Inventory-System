import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  enabled: { type: String, enum: ["Product", "Service"], required: true },
  openingQty: { type: Number, default: 0 },
  minStock: { type: Number, default: 0 },
  date: { type: Date, required: true },
  itemCode: { type: String, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);


