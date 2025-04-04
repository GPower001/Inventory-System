// models/Item.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    openingQty: {
      type: Number,
      required: true,
    },
    currentQty: {
      type: Number,
      required: true,
      default: 0,
    },
    minStock: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // URL of the item image
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a `User` model for the creator of the item
      required: true,
    },
    addedDate: {
      type: Date,
      default: Date.now,
    },
    expirationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model('Item', ItemSchema);

export default Item;
