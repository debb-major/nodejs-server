import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { validateRegister } from '../middlewares/validateRequest.js';

const router = express.Router();

// POST endpoint for user registration
router.post('/register', validateRegister, registerUser);

export default router;