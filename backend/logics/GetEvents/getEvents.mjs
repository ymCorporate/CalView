import { GraphQLClient} from 'graphql-request';
import { GetEventsQuery } from './query.mjs';
// import bodyParser from "body-parser";

const get_events = new GetEventsQuery();

const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
const adminSecret = '123';

const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        'x-hasura-admin-secret': adminSecret
        // 'Authorization': `Bearer ${generateJwtToken()}`
    },
});



export class GetEvent{
    async get_events(req, res){
        

  try {
    const data = await client.request(get_events.GetEvents(),{});
    //console.log(data);
    res.json(data.kalenview_create_events);
    // res.status(200).json({success:true});
    } catch (error) {
        console.error('Failed to get event:', error);
        res.json({ success: false });
      }

    }
}