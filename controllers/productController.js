const Product = require('../models/Product');
const generateColorwayCode = require('../utils/generateColorwayCode');

exports.createProduct = async (req, res) => {
  try {
    const data = req.body;
    const colorwayCode = generateColorwayCode();
    const productData = {
      colorwayCode,
      colorwayName: data.colorwayName,
      brand: data.brand || "Levi's",
      gender: data.gender,
      category: data.category,
      season: data.season,
      active: data.active,
      targetVolume: data.targetVolume,
      materialType: data.materialType,
      merchFabricType: data.merchFabricType,
      currentPlannedLifecycle: data.currentPlannedLifecycle,
      createdBy: req.user._id
    };
    const product = await Product.create(productData);
    res.status(201).json({ status: 'success', data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ status: 'success', results: products.length, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.filterProducts = async (req, res) => {
  try {
    const filter = { ...req.query };
    if (filter.active !== undefined) filter.active = filter.active === 'true' || filter.active === true;
    if (filter.targetVolume !== undefined) filter.targetVolume = Number(filter.targetVolume);
    const products = await Product.find(filter);
    res.json({ status: 'success', results: products.length, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const allowedUpdates = ['colorwayName','gender','category','season','active','targetVolume','materialType','merchFabricType','currentPlannedLifecycle'];
    const updates = {};
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });
    res.json({ status: 'success', data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });
    res.json({ status: 'success', message: 'Product deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
};
