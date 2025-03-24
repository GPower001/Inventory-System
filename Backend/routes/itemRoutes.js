// import express from "express";
// import { addItem } from "../controllers/itemController.js";
// import upload from "../middlewares/uploadMiddleware.js";

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
//  *   post:
//  *     summary: Add a new item to the inventory
//  *     description: Upload an item with an optional image.
//  *     tags: [Items]
//  *     consumes:
//  *       - multipart/form-data
//  *     parameters:
//  *       - in: formData
//  *         name: itemName
//  *         type: string
//  *         required: true
//  *         description: Name of the item.
//  *       - in: formData
//  *         name: category
//  *         type: string
//  *         required: true
//  *         description: Category of the item.
//  *       - in: formData
//  *         name: enabled
//  *         type: string
//  *         enum: [Service, Product]
//  *         description: Specifies whether the item is a service or a product.
//  *       - in: formData
//  *         name: openingQty
//  *         type: number
//  *         required: false
//  *         description: Initial quantity of the item.
//  *       - in: formData
//  *         name: minStock
//  *         type: number
//  *         required: false
//  *         description: Minimum stock level before restocking.
//  *       - in: formData
//  *         name: date
//  *         type: string
//  *         format: date
//  *         required: false
//  *         description: The date the item was added.
//  *       - in: formData
//  *         name: itemCode
//  *         type: string
//  *         required: false
//  *         description: Unique item code.
//  *       - in: formData
//  *         name: image
//  *         type: file
//  *         required: false
//  *         description: Image of the item (JPEG, PNG, JPG).
//  *     responses:
//  *       201:
//  *         description: Item successfully added.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Item added successfully
//  *       400:
//  *         description: Bad request, missing required fields.
//  *       500:
//  *         description: Internal server error.
//  */
// router.post("/", upload.single("image"), addItem);

// export default router;




import express from "express";
import { getItems, addItem } from "../controllers/itemController.js";

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
 *     responses:
 *       200:
 *         description: List of all items
 *       500:
 *         description: Server error
 */
router.get("/", getItems);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Add a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *               salePrice:
 *                 type: number
 *               purchasePrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", addItem);

export default router;
