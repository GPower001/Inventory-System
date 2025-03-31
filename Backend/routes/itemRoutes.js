// // import express from "express";
// // import { addItem } from "../controllers/itemController.js";
// // import upload from "../middlewares/uploadMiddleware.js";

// // const router = express.Router();

// // /**
// //  * @swagger
// //  * tags:
// //  *   name: Items
// //  *   description: API for managing inventory items
// //  */

// // /**
// //  * @swagger
// //  * /api/items:
// //  *   post:
// //  *     summary: Add a new item to the inventory
// //  *     description: Upload an item with an optional image.
// //  *     tags: [Items]
// //  *     consumes:
// //  *       - multipart/form-data
// //  *     parameters:
// //  *       - in: formData
// //  *         name: itemName
// //  *         type: string
// //  *         required: true
// //  *         description: Name of the item.
// //  *       - in: formData
// //  *         name: category
// //  *         type: string
// //  *         required: true
// //  *         description: Category of the item.
// //  *       - in: formData
// //  *         name: enabled
// //  *         type: string
// //  *         enum: [Service, Product]
// //  *         description: Specifies whether the item is a service or a product.
// //  *       - in: formData
// //  *         name: openingQty
// //  *         type: number
// //  *         required: false
// //  *         description: Initial quantity of the item.
// //  *       - in: formData
// //  *         name: minStock
// //  *         type: number
// //  *         required: false
// //  *         description: Minimum stock level before restocking.
// //  *       - in: formData
// //  *         name: date
// //  *         type: string
// //  *         format: date
// //  *         required: false
// //  *         description: The date the item was added.
// //  *       - in: formData
// //  *         name: itemCode
// //  *         type: string
// //  *         required: false
// //  *         description: Unique item code.
// //  *       - in: formData
// //  *         name: image
// //  *         type: file
// //  *         required: false
// //  *         description: Image of the item (JPEG, PNG, JPG).
// //  *     responses:
// //  *       201:
// //  *         description: Item successfully added.
// //  *         content:
// //  *           application/json:
// //  *             schema:
// //  *               type: object
// //  *               properties:
// //  *                 message:
// //  *                   type: string
// //  *                   example: Item added successfully
// //  *       400:
// //  *         description: Bad request, missing required fields.
// //  *       500:
// //  *         description: Internal server error.
// //  */
// // router.post("/", upload.single("image"), addItem);

// // export default router;




// import express from "express";
// import { getItems, addItem } from "../controllers/itemController.js";

// const router = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Items
//  *   description: API for managing inventory items
//  */

// /**
//  * @swagger
//  * /api/items:
//  *   get:
//  *     summary: Get all inventory items
//  *     tags: [Items]
//  *     responses:
//  *       200:
//  *         description: List of all items
//  *       500:
//  *         description: Server error
//  */
// router.get("/", getItems);

// /**
//  * @swagger
//  * /api/items:
//  *   post:
//  *     summary: Add a new item
//  *     tags: [Items]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               quantity:
//  *                 type: number
//  *               salePrice:
//  *                 type: number
//  *               purchasePrice:
//  *                 type: number
//  *     responses:
//  *       201:
//  *         description: Item added successfully
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Server error
//  */
// router.post("/", AuthenticatorResponse, upload.single("image"), addItem);

// export default router;

import express from "express";
import { asyncHandler } from '../app.js';
import Item from '../models/Item.js';
import upload from "../middlewares/uploadMiddleware.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: API for managing inventory items
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limit number of items returned
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [low-stock, expired]
 *         description: Filter items by condition
 *     responses:
 *       200:
 *         description: List of all items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *       500:
 *         description: Server error
 */
router.get('/', asyncHandler(async (req, res) => {
  const { limit, filter } = req.query;
  let query = {};

  if (filter === 'low-stock') {
    query = { $expr: { $lt: ['$quantity', '$minStock'] } };
  } else if (filter === 'expired') {
    query = { expirationDate: { $lt: new Date() } };
  }

  const items = await Item.find(query)
    .sort({ createdAt: -1 })
    .limit(parseInt(limit) || 0);
    
  res.json({ success: true, data: items });
}));

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Add a new item to inventory
 *     tags: [Items]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               quantity:
 *                 type: number
 *               minStock:
 *                 type: number
 *               price:
 *                 type: number
 *               salePrice:
 *                 type: number
 *               category:
 *                 type: string
 *               expirationDate:
 *                 type: string
 *                 format: date
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         quantity:
 *           type: number
 *         minStock:
 *           type: number
 *         price:
 *           type: number
 *         salePrice:
 *           type: number
 *         category:
 *           type: string
 *         expirationDate:
 *           type: string
 *           format: date
 *         imageUrl:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
router.post('/', 
  authenticate, 
  upload.single('image'), 
  asyncHandler(async (req, res) => {
    const itemData = {
      ...req.body,
      ...(req.file && { imageUrl: `/uploads/${req.file.filename}` })
    };
    
    const newItem = await Item.create(itemData);
    res.status(201).json({ 
      success: true, 
      data: newItem 
    });
  })
);

export default router;