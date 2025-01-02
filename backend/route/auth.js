import express from 'express';
import {register} from '../controller/register.js';
import {login} from '../controller/login.js';
import { authenticate, authorizationAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route đăng ký
router.post('/register', register);


// Route đăng nhập
router.post('/login', login);
 // Route dang xuat
router.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Sign out successful' });
});

export default router;

