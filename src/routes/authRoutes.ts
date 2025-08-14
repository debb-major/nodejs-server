import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { validateRegister } from '../middlewares/validateRequest.js';

const router = express.Router();

// POST endpoint for user registration
router.post('/register', validateRegister, registerUser);

export default router;

// this route handles user registration
// it uses the validateRegister middleware to validate the request body
// if validation passes, it calls the registerUser controller to handle the registration logic
// this route is part of the authentication module of the application
// it is used to create new user accounts in the system
// it ensures that user registration requests are properly validated before processing