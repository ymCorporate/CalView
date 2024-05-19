import express from 'express';
// import { AuthLogic } from '../authintication/signup_login.mjs';
// import { NormRoutes } from '../normRoutes/linkpage.mjs';
// import { VerifyJwt } from '../verifyJWT/verifyjwt.mjs';

import { CreateEvent } from '../logics/CreateEvent/createEvent.mjs';
import { GetEvent } from '../logics/GetEvents/getEvents.mjs';
import { LoginUser } from '../logics/Login/login.mjs';
import { VerifyJWToken } from '../logics/VerifyJWT/verifyJWT.mjs';
import { ParticularEventDetails } from '../logics/EventDetails/eventDetail.mjs';
import { EditParticularEventDetails } from '../logics/EditEvent/editEvent.mjs';
import { setAvailability } from '../logics/Availability/setAvailQueries.mjs';

// const auth_logic = new AuthLogic();
// const norm_routes = new NormRoutes();
// const verify_jwt = new VerifyJwt();

const new_event = new CreateEvent();
const get_event = new GetEvent();
const login_user = new LoginUser();
const jwt_verify = new VerifyJWToken();
const particular_event = new ParticularEventDetails();
const edit_Event = new EditParticularEventDetails();
const availability = new setAvailability();
const router = express.Router();


// // For signup
// router.post('/signup', auth_logic.insertSignupUser);

// For login
router.post('/login', login_user.login);

// For JWT Verification
router.post('/verify', jwt_verify.verifyJWT);

// // For Home
// router.get('/', norm_routes.linkpage);


// For Create Event
router.post('/events/create', new_event.create_event);

// For Get Event
router.get('/events', get_event.get_events);

// For Get Event Details
router.get('/events/:eventName', particular_event.get_particular_event);

// For Edit Event Details
router.put('/events/:eventName', edit_Event.edit_particular_event);

// For Set Availability
router.post('/events/availability/create/:eventName', availability.set_availability);


export {router};