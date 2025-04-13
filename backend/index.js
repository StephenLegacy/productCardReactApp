require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');  // Import the Product model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Connection error:', err));

// Dummy route for now
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Create a new product
app.post('/api/products', async (req, res) => {
  const { name, description, price, imageUrl, category } = req.body;
  
  try {
    const newProduct = new Product({ name, description, price, imageUrl, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch products' });
  }
});

// Get a product by ID
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch product' });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, imageUrl, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      imageUrl,
      category
    }, { new: true });
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete product' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
