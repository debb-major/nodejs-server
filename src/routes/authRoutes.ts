import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateRegister } from '../middlewares/validateRequest.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST endpoint for user registration

// this route handles user registration
// it uses the validateRegister middleware to validate the request body
// if validation passes, it calls the registerUser controller to handle the registration logic
// this route is part of the authentication module of the application
// it is used to create new user accounts in the system
// it ensures that user registration requests are properly validated before processing

router.post('/register', validateRegister, registerUser);



// POST endpoint for user login 

// this route handles user login
// it uses the authMiddleware to ensure the user is authenticated
// if the user is authenticated, it calls the loginUser controller to handle the login logic
// this route is part of the authentication module of the application

// remove auth middleware, also validate this route...... very. very important
router.post('/login', authMiddleware, loginUser)


export default router; 