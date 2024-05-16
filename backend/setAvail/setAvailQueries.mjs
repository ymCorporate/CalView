import { GraphQLClient } from 'graphql-request';
import bodyParser from "body-parser";
import { SetAvailabilitySchema } from './setAvailSchema.mjs';
//import axios from 'axios';
//import gql from 'graphql-tag';


const new_availability = new SetAvailabilitySchema();

const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
const adminSecret = '123';

const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        //'x-hasura-admin-secret': adminSecret
        // 'Authorization': `Bearer ${generateJwtToken()}`
    },
});


// Function to create availability
export class setAvailability {
    set_availability(req, res) {
        for (const [day, slots] of Object.entries(req.body)) {
            slots.forEach(async slot => {  // Note: Added 'async' here
                const { startTime, endTime } = slot;
                console.log(day, startTime, endTime);
                // Here you can call your function to insert the data into Hasura

                try {
                    const response = await client.request(new_availability.queryAvailability(), {
                        day,  // Note: Changed 'weekday' to 'day'
                        startTime,
                        endTime
                    })
                    console.log(response.data);
                } catch (error) {
                    console.error('Failed to create event:', error);
                    //res.status(500).json({success: false});
                    return;
                }
            });
        }

        //res.status(200).json({success: "availability inserted"});
    }
    async delete_availability(req, res) {
        const { day, startTime } = req.body;
        console.log(req.body)
        try {
            const data = await client.request(new_availability.deleteAvailability(), { day, startTime });
            res.json({ success: true });
        } catch (error) {
            console.error('Error occurred while deleting slot:', error);
            res.json({ success: false });
        }
    }
}






