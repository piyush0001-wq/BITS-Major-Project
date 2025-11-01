const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

/**
 * @openapi
 * tags:
 *   - name: Products
 *     description: Product management
 */

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *           example:
 *             colorwayName: "Sky Blue Tee"
 *             gender: "Men"
 *             category: "Tops"
 *             season: "Summer"
 *             active: true
 *             targetVolume: 1000
 *             materialType: "Cotton"
 *             merchFabricType: "Soft Fabric"
 *             currentPlannedLifecycle: "Active"
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/products', protect, productController.createProduct);

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 results:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/products', protect, productController.getAllProducts);

/**
 * @openapi
 * /api/products:
 *   parameters:
 *     - in: query
 *       name: category
 *       schema:
 *         type: string
 *       description: Filter by category
 *     - in: query
 *       name: gender
 *       schema:
 *         type: string
 *       description: Filter by gender
 *     - in: query
 *       name: season
 *       schema:
 *         type: string
 *       description: Filter by season
 *     - in: query
 *       name: active
 *       schema:
 *         type: boolean
 *       description: Filter by active status
 */

/**
 * @openapi
 * /api/products/filter:
 *   get:
 *     summary: Filter products by query parameters
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     description: Use query params like ?category=Tops&gender=Men
 *     responses:
 *       200:
 *         description: Filtered products list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string }
 *                 results: { type: integer }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/products/filter', protect, productController.filterProducts);

/**
 * @openapi
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       401:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/products/:id', protect, productController.updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (admin only)
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     description: Only users with role 'admin' can delete products.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string }
 *                 message: { type: string }
 *       403:
 *         description: Forbidden (not admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/products/:id', protect, restrictTo('admin'), productController.deleteProduct);

module.exports = router;
