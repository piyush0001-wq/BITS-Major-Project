const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/product_db';
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser and useUnifiedTopology are defaults in newer mongoose versions
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
