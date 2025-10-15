import express from 'express';
const router = express.Router();

// GET /api/payments/test
router.get('/test', (req, res) => {
  res.json({ message: 'Payment routes working!' });
});

// POST /api/payments/mpesa - Initiate M-Pesa payment
router.post('/mpesa', (req, res) => {
  res.json({ message: 'M-Pesa payment endpoint' });
});

// POST /api/payments/stripe - Initiate Stripe payment
router.post('/stripe', (req, res) => {
  res.json({ message: 'Stripe payment endpoint' });
});

export default router;