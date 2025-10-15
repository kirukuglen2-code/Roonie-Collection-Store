import express from 'express';
const router = express.Router();

// GET /api/orders/test
router.get('/test', (req, res) => {
  res.json({ message: 'Order routes working!' });
});

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  res.json({ message: 'Order creation endpoint' });
});

export default router;