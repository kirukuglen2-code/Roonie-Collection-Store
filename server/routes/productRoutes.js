import express from 'express';
const router = express.Router();

// Temporary product data
const temporaryProducts = [
  {
    _id: '1',
    name: 'Premium Coffee',
    description: 'High-quality roasted coffee beans',
    price: 25.99,
    image: '/images/coffee.jpg',
    category: 'Beverages'
  },
  {
    _id: '2', 
    name: 'Artisan Tea Set',
    description: 'Handcrafted tea collection',
    price: 45.50,
    image: '/images/tea-set.jpg',
    category: 'Beverages'
  }
];

// GET /api/products - Get all products
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: temporaryProducts.length,
    data: temporaryProducts
  });
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  const product = temporaryProducts.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  res.json({
    success: true,
    data: product
  });
});

export default router;