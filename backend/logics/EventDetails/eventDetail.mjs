import { GraphQLClient} from 'graphql-request';
import { GetEventDetail } from './query.mjs';
import jwt from 'jsonwebtoken';
// import bodyParser from "body-parser";

const event_details = new GetEventDetail();

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



export class ParticularEventDetails{
    async get_particular_event(req, res){
        try{
            // console.log(req.body)
            const {eventName} = req.params;
            // console.log(req.params);
            const data = await client.request(event_details.GetEvent(),{eventName});
            // console.log(data);
            // res.json(data);
            res.status(200).json(data.kalenview_create_events_by_pk);
        }catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({error: 'Kindly Sign Up or Check email and password'});
        }
    }
}