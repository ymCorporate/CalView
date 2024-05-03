import express from 'express';
import { AuthLogic } from '../authintication/signup_login.mjs';

const auth_logic = new AuthLogic();
const router = express.Router();

// For signup
router.post('/signup', auth_logic.insertSignupUser);

// For login
router.post('/login', auth_logic.login);






export {router};