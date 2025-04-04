import express from 'express';
import { register, login, logout, getMe, forgotPassword, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to log in a user
router.post('/login', login);

// Route to log out a user
router.get('/logout', logout);

// Route to get the logged-in user's details
router.get('/me', protect, getMe);

// Route to request a password reset (forgot password)
router.post('/forgotpassword', forgotPassword);

// Route to reset the password using a reset token
router.put('/resetpassword/:resettoken', resetPassword);

export default router;
