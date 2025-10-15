import express from 'express';
const router = express.Router();

// GET /api/users/test
router.get('/test', (req, res) => {
  res.json({ message: 'User routes working!' });
});

// POST /api/users/register - User registration
router.post('/register', (req, res) => {
  res.json({ message: 'User registration endpoint' });
});

// POST /api/users/login - User login  
router.post('/login', (req, res) => {
  res.json({ message: 'User login endpoint' });
});

export default router;