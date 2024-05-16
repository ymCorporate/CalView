import express from 'express';
import {setAvailability} from '../setAvail/setAvailQueries.mjs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

const avail = new setAvailability();
const router = express.Router();


// For Create Event
// router.post('/events/create', (req, res) => {
//     console.log(req.body)
// });


router.post('/events/create', avail.set_availability);
router.post('/events/delete',avail.delete_availability);
// router.post('/events/delete', (req,res)=>{
//     console.log(req.body)
// });
export {router};