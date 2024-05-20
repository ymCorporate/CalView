import { GraphQLClient } from 'graphql-request';
import { GetAvailabilitySchema } from './query.mjs';

const new_availability = new GetAvailabilitySchema();

const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
//const adminSecret = '123';

const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        //'x-hasura-admin-secret': adminSecret
    },
});

export class getAvailability {
    async get_availability(req, res) {
        const { day } = req.params;
        const eventName = 'abc';
        try {
            const data = await client.request(new_availability.getAvailability(), { day, eventName });
            res.json({ success: true, data });
        } catch (error) {
            console.error('Error occurred while fetching availability:', error);
            res.json({ success: false });
        }
    }
}




