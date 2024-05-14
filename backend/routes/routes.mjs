import express from 'express';
// import { AuthLogic } from '../authintication/signup_login.mjs';
// import { NormRoutes } from '../normRoutes/linkpage.mjs';
// import { VerifyJwt } from '../verifyJWT/verifyjwt.mjs';
import { CreateEvent } from '../logics/CreateEvent/createEvent.mjs';

// const auth_logic = new AuthLogic();
// const norm_routes = new NormRoutes();
// const verify_jwt = new VerifyJwt();

const new_event = new CreateEvent();
const router = express.Router();

// // For signup
// router.post('/signup', auth_logic.insertSignupUser);

// // For login
// router.post('/login', auth_logic.login);

// // For JWT Verification
// router.post('/verify', verify_jwt.verifyJwt);

// // For Home
// router.get('/', norm_routes.linkpage);


// For Create Event
router.post('/events/create', new_event.create_event);


export {router};