import { GraphQLClient} from "graphql-request";
import jwt from 'jsonwebtoken';
import { Query } from "../graphql_queris/query.mjs";
import bodyParser from "body-parser";

const gph_query = new Query();

const hasuraEndpoint = 'https://willing-gull-77.hasura.app/v1/graphql';
const adminSecret = 'CK8Kys28AWtFWGz78Vk0WGX6BAZCD4GetlpOQvRKxRsWMdVZBOM2H3pFtjp7kIey';

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


export class AuthLogic{


    async insertSignupUser(req, res){
        try{
            // console.log(req.body)
            const {first_name, last_name, email, password, company_name, company_role} = req.body;
            const data = await client.request(gph_query.signupInsertUser(first_name, last_name, email, password, company_name, company_role),{});
            // console.log(data);
            // res.json(data);
            res.status(200).json(
                {
                    "uuid":data.insert_kalenview_one.uuid,
                    "first_name":data.insert_kalenview_one.first_name,
                    "last_name":data.insert_kalenview_one.last_name
                });
        }catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }


    async login(req, res){
        try{
            // console.log(req.body)
            const {email, password} = req.body;
            const data = await client.request(gph_query.loginUser(email, password),{});
            // console.log(data);
            // res.json(data);
            res.status(200).json(
                {
                    "message":"Welcome User",
                    "uuid":data.kalenview_by_pk.uuid,
                    "first_name":data.kalenview_by_pk.first_name,
                    "last_name":data.kalenview_by_pk.last_name
                });
        }catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({error: 'Kindly Sign Up or Check email and password'});
        }
    }


}