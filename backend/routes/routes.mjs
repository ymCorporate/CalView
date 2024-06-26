import express from 'express';
// import { AuthLogic } from '../authintication/signup_login.mjs';
// import { NormRoutes } from '../normRoutes/linkpage.mjs';
// import { VerifyJwt } from '../verifyJWT/verifyjwt.mjs';
import bodyParser from 'body-parser';

import { CreateEvent } from '../logics/CreateEvent/createEvent.mjs';
import { GetEvent } from '../logics/GetEvents/getEvents.mjs';
import { LoginUser } from '../logics/Login/login.mjs';
import { VerifyJWToken } from '../logics/VerifyJWT/verifyJWT.mjs';
import { ParticularEventDetails } from '../logics/EventDetails/eventDetail.mjs';
import { EditParticularEventDetails } from '../logics/EditEvent/editEvent.mjs';

//import { setAvailability } from '../logics/Availability/setAvailQueries.mjs';

//import {GetSlots} from "../logics/slotbook/getAvailQueries.mjs";


// const auth_logic = new AuthLogic();
// const norm_routes = new NormRoutes();
// const verify_jwt = new VerifyJwt();

const new_event = new CreateEvent();
const get_event = new GetEvent();
const login_user = new LoginUser();
const jwt_verify = new VerifyJWToken();
const particular_event = new ParticularEventDetails();
const edit_Event = new EditParticularEventDetails();

//const availability = new setAvailability();
//const getSlot = new GetSlots();

const router = express.Router();


// For signup
router.post('/register', insert_user.create_user);

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

//router.post('/events/availability/create/:eventName', availability.set_availability);

//delete availability
//router.post(`/events/availability/delete/:eventName`, availability.delete_availability);
// router.post(`events/availability/delete/:eventName`,(req,res)=>{
//     console.log(req.body)
// });

//For get availability
//router.get('/events/slots/:dayofWeek/:eventName', getSlot.get_slots);
//console.log(getAvailability);


//router.get('/events/availability/:eventName', availability.get_availability);

export {router};