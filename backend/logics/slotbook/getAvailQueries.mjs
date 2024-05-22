import { GraphQLClient} from 'graphql-request';
import { GetSlotsQuery } from './query.mjs';
// import bodyParser from "body-parser";

const get_slots = new GetSlotsQuery();

const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
//const adminSecret = '123';

const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        //'x-hasura-admin-secret': adminSecret
        // 'Authorization': `Bearer ${generateJwtToken()}`
    },
});



export class GetSlots{
    async get_slots(req, res){
        console.log(req.params)
        const { dayofWeek, eventName } = req.params;
        try {
            const data = await client.request(get_slots.get_slots(),
                {
                    day: dayofWeek.toUpperCase(),
                    eventName
                }
            );
            console.log(data.availability);
            res.json(data.availability);
        }catch (error) {
            console.error('Failed to get slots:', error);
            res.json({ success: false });
        }

    }
}