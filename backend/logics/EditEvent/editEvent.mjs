import { GraphQLClient} from 'graphql-request';
import { EditEventDetail } from './query.mjs';
import jwt from 'jsonwebtoken';
// import bodyParser from "body-parser";

const edit_event = new EditEventDetail();

const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
const adminSecret = '123';

const generateJwtToken = () => {
    const claims = {
        "sub": "1234567890",
        "name": "Debesh Pramanick",
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": [
            "admin",
            "user"
          ],
          "x-hasura-default-role": "admin"
        // "x-hasura-default-role": "user"
        }
      }

    return jwt.sign(claims, '5kOnr5vYmLggihää0X9TGrQBC4PoFPgt', { expiresIn: '1h' });
};

const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        'x-hasura-admin-secret': adminSecret
        // 'Authorization': `Bearer ${generateJwtToken()}`
    },
});



export class EditParticularEventDetails{
    async edit_particular_event(req, res){

        const { eventName } = req.params;
        const { event_name, duration, location_type, location_detail } = req.body;

        const variables = {
            eventName,
            event_name,
            duration,
            location_type,
            location_detail,
          };
        try{
            // console.log(req.body)
            
            console.log(req.body);
            const data = await client.request(edit_event.EditEvent(), variables);
            console.log(data);
            res.json(data);
            // res.status(200).json(data.kalenview_create_events_by_pk);
        }catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({error: 'Kindly Sign Up or Check email and password'});
        }
    }
}