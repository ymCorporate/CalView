import { GraphQLClient} from 'graphql-request';
import { CreateEventQuery } from './query.mjs';
// import bodyParser from "body-parser";

const new_event = new CreateEventQuery();

const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
const adminSecret = '123';

const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        'x-hasura-admin-secret': adminSecret
        // 'Authorization': `Bearer ${generateJwtToken()}`
    },
});



export class CreateEvent{
    async create_event(req, res){
        const { eventName, duration, locationType, locationDetail } = req.body;
        console.log(eventName, duration, locationType, locationDetail);

  try {
    const data = await client.request( new_event.CreateEvent(),{
        eventName,
        duration: parseInt(duration),
        locationType,
        locationDetail
      });

      console.log(data);

    // res.json(data);
    res.status(200).json({success:"Inset Done"});
    } catch (error) {
        console.error('Failed to create event:', error);
        res.json({ success: false });
      }

    }
}