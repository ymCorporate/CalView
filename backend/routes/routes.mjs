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
import { CreateUser } from '../logics/Register/registerUser.mjs';
import { GetSlots } from '../logics/SelectSlot/slotSelect.mjs';


import { Mailer } from '../logics/Mailer/mailer.mjs';

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
const insert_user = new CreateUser();
const getSlot = new GetSlots();

const router = express.Router();

const mail_message = new Mailer();


// For Mail
router.post('/event/mail', mail_message.send_real_mail);

// For signup
router.post('/registeruser', insert_user.create_user);
// router.post('/registeruser', (req,res)=>{
//     console.log(req.body);
//     res.json({
//         uuid:"74108520963"
//       })});

// For login
router.post('/login', login_user.login);

// For JWT Verification
router.post('/verify', jwt_verify.verifyJWT);

// // // For Home
// // router.get('/', norm_routes.linkpage);


// For Create Event
router.post('/events/create', new_event.create_event);

// // For Get Event
// router.get('/events', get_event.get_events);

// // For Get Event Deatils
// router.get('/events/:eventName', particular_event.get_particular_event);

// // For Edit Event Details
// router.put('/events/:eventName', edit_Event.edit_particular_event);

// // For Set Availability
// router.post('/events/availability/create/:eventName', availability.set_availability);
// router.post('/events/availability/delete/:eventName', availability.delete_availability);

// // For Get Slots

// router.get('/events/slots/:dayofWeek/:eventName', getSlot.get_slots);


// router.get('/hello', (req,res)=>{
//     res.json({"message":"Hello"});
// });

// router.post('/geteventsdata', (req,res)=>{
//     // console.log(req.body);
//     res.json({
//         duration:30,
//         event_name:"dd",
//         location_detail:"dd",
//         location_type:"dd"
//       })
// });

export {router};