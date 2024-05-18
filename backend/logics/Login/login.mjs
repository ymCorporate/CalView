import { GraphQLClient} from 'graphql-request';
import { LoginQuery } from './query.mjs';
import jwt from 'jsonwebtoken';
// import bodyParser from "body-parser";

const login = new LoginQuery();

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



export class LoginUser{
    async login(req, res){
        try{
            // console.log(req.body)
            const {email, password} = req.body;
            const data = await client.request(login.loginUser(email, password),{});
            const token = generateJwtToken();
            // console.log(data);
            // res.json(data);
            res.status(200).json(
                {
                    "message":"Welcome User",
                    "uuid":data.kalenview_by_pk.uuid,
                    "first_name":data.kalenview_by_pk.first_name,
                    "last_name":data.kalenview_by_pk.last_name,
                    "token": token // Include the JWT in the response
                });
        }catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({error: 'Kindly Sign Up or Check email and password'});
        }
    }
}