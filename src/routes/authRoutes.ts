import express from 'express';
import { registerUser, loginUser } from '@controllers/authController';
import { validateRegister, validateLogin } from '@middlewares/validateRequest';

const router = express.Router();

// POST endpoint for user registration
router.post('/register', validateRegister, registerUser);


// POST endpoint for user login 

router.post('/login', validateLogin, loginUser)


export default router; 