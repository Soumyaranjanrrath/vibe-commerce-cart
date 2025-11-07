const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (fallback if MongoDB is not available)
let products = [
  { 
    id: '1', 
    name: 'Wireless Headphones', 
    price: 8299, 
    image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Premium wireless over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals who demand the best sound experience.',
    category: 'Audio',
    rating: 4.5,
    reviews: 128
  },
  { 
    id: '2', 
    name: 'Smartphone Case', 
    price: 1999, 
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Durable protective case with shock-absorbing technology and raised edges to protect your screen. Available in multiple colors with a sleek, slim design that doesn\'t add bulk to your device.',
    category: 'Accessories',
    rating: 4.2,
    reviews: 89
  },
  { 
    id: '3', 
    name: 'Bluetooth Speaker', 
    price: 6499, 
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Portable waterproof Bluetooth speaker with 360-degree sound, 12-hour battery, and IPX7 rating. Perfect for outdoor adventures, parties, or just enjoying music anywhere with rich bass and clear treble.',
    category: 'Audio',
    rating: 4.7,
    reviews: 203
  },
  { 
    id: '4', 
    name: 'USB-C Cable', 
    price: 1599, 
    image: 'https://images.pexels.com/photos/163117/keyboard-old-input-device-163117.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'High-speed USB-C to USB-C cable with fast charging support up to 100W and data transfer speeds up to 10Gbps. Reinforced connectors and braided nylon design for durability and longevity.',
    category: 'Accessories',
    rating: 4.3,
    reviews: 156
  },
  { 
    id: '5', 
    name: 'Laptop Stand', 
    price: 4199, 
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Ergonomic aluminum laptop stand with adjustable height and ventilation slots. Improves posture, reduces neck strain, and keeps your laptop cool during extended use. Fits laptops from 11" to 17".',
    category: 'Accessories',
    rating: 4.6,
    reviews: 94
  },
  { 
    id: '6', 
    name: 'Wireless Mouse', 
    price: 2899, 
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Ergonomic wireless mouse with precision tracking, long battery life, and silent clicks. Features customizable buttons, smooth scrolling, and works on any surface. Perfect for work or gaming.',
    category: 'Accessories',
    rating: 4.4,
    reviews: 167
  },
  { 
    id: '7', 
    name: 'Desk Lamp', 
    price: 4999, 
    image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. Touch controls, USB charging port, and flexible gooseneck design. Eye-friendly lighting that reduces eye strain during long work sessions.',
    category: 'Accessories',
    rating: 4.5,
    reviews: 112
  },
  { 
    id: '8', 
    name: 'Power Bank', 
    price: 3299, 
    image: 'https://images.pexels.com/photos/163140/technology-laptop-macbook-mac-163140.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    description: 'High-capacity 20000mAh portable power bank with fast charging technology. Dual USB ports, LED indicator, and compact design. Can charge smartphones multiple times and tablets once. Perfect for travel and daily use.',
    category: 'Accessories',
    rating: 4.6,
    reviews: 189
  }
];

let cart = [];

// MongoDB Schemas (optional - using in-memory for simplicity)
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  rating: Number,
  reviews: Number
});

const cartSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  addedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);
const CartItem = mongoose.model('CartItem', cartSchema);

// Connect to MongoDB (optional - will use in-memory if fails)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Clear and reseed products to ensure latest data
    Product.deleteMany({}).then(() => {
      Product.insertMany(products);
      console.log('Seeded products to MongoDB');
    });
  })
  .catch(err => {
    console.log('MongoDB connection failed, using in-memory storage:', err.message);
  });

// Routes

// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const products = await Product.find();
      res.json(products);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.json(products); // Fallback to in-memory
  }
});

// POST /api/cart - Add item to cart
app.post('/api/cart', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if product exists
    const product = products.find(p => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (mongoose.connection.readyState === 1) {
      // Try MongoDB first
      const existingItem = await CartItem.findOne({ productId });
      if (existingItem) {
        existingItem.quantity += quantity;
        await existingItem.save();
      } else {
        const cartItem = new CartItem({ productId, quantity });
        await cartItem.save();
      }
    } else {
      // Fallback to in-memory
      const existingItem = cart.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ id: uuidv4(), productId, quantity, addedAt: new Date() });
      }
    }

    res.json({ message: 'Item added to cart', productId, quantity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/cart - Get cart items with total
app.get('/api/cart', async (req, res) => {
  try {
    let cartItems = [];
    
    if (mongoose.connection.readyState === 1) {
      cartItems = await CartItem.find();
    } else {
      cartItems = cart;
    }

    // Add product details and calculate total
    const cartWithDetails = cartItems.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        id: item.id || item._id,
        productId: item.productId,
        quantity: item.quantity,
        product: product,
        subtotal: product ? product.price * item.quantity : 0
      };
    });

    const total = cartWithDetails.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({
      items: cartWithDetails,
      total: Math.round(total * 100) / 100
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/cart/:id - Update item quantity
app.put('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    if (mongoose.connection.readyState === 1) {
      const cartItem = await CartItem.findById(id);
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      cartItem.quantity = quantity;
      await cartItem.save();
    } else {
      const index = cart.findIndex(item => item.id === id);
      if (index > -1) {
        cart[index].quantity = quantity;
      } else {
        return res.status(404).json({ error: 'Cart item not found' });
      }
    }

    res.json({ message: 'Cart item updated', quantity });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/cart/:id - Remove item from cart
app.delete('/api/cart/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      await CartItem.findByIdAndDelete(id);
    } else {
      const index = cart.findIndex(item => item.id === id);
      if (index > -1) {
        cart.splice(index, 1);
      }
    }

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/checkout - Mock checkout
app.post('/api/checkout', async (req, res) => {
  try {
    const { cartItems, customerInfo } = req.body;
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    // Generate mock receipt
    const receipt = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      customer: customerInfo,
      items: cartItems,
      total: Math.round(total * 100) / 100,
      status: 'completed'
    };

    // Clear cart after checkout
    if (mongoose.connection.readyState === 1) {
      await CartItem.deleteMany({});
    } else {
      cart.length = 0;
    }

    res.json({
      message: 'Checkout successful',
      receipt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;