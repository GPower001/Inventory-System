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



import Item from "../models/Item.js";

/**
 * @desc Get all items
 * @route GET /api/items
 * @access Public
 */
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

/**
 * @desc Add new item
 * @route POST /api/items
 * @access Public
 */
export const addItem = async (req, res) => {
  try {
    const { name, quantity, salePrice, purchasePrice } = req.body;

    if (!name || !quantity) {
      return res.status(400).json({ message: "Name and quantity are required" });
    }

    const newItem = new Item({
      name,
      quantity,
      salePrice: salePrice || 0,
      purchasePrice: purchasePrice || 0,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
