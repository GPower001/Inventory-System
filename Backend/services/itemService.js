import Item from "../models/Item.js";

export const updateStock = async (itemId, newQuantity) => {
  if (newQuantity < 0) throw new Error("Quantity cannot be negative");
  return await Item.findByIdAndUpdate(itemId, { quantity: newQuantity }, { new: true });
};

export const checkLowStock = async () => {
  const items = await Item.find({ quantity: { $lte: "$minStock" } });
  return items; // For alerts
};