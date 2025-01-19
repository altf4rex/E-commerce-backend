import { Router } from "express";
import { login, register, logout } from '../controllers/userController.js'

const router = Router();

// TODO: Create a POST /register route to handle user registration.
router.post('/v1/register', validateRegistration, register);

// TODO: Create a POST /login route for user authentication.
router.post('/v1/login', validateLogin, login);

// TODO: Create a POST /logout route to clear the authentication token.
router.post('/v1/logout', logout);


export default router;