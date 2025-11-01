require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// connect DB
connectDB();

// routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', authRoutes);
app.use('/api', productRoutes);

app.get('/', (req, res) => res.json({ status: 'ok', message: 'API running' }));

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
