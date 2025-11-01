const mongoose = require('mongoose');

/**
 * @openapi
 * components:
 *   schemas:
 *     ProductModel:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         colorwayCode: { type: string }
 *         colorwayName: { type: string }
 */
const productSchema = new mongoose.Schema({
  colorwayCode: { type: String, required: true, unique: true },
  colorwayName: { type: String, required: true },
  brand: { type: String, default: "Levi's" },
  gender: { type: String },
  category: { type: String },
  season: { type: String },
  active: { type: Boolean, default: true },
  targetVolume: { type: Number, default: 0 },
  materialType: { type: String },
  merchFabricType: { type: String },
  currentPlannedLifecycle: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
