import { GraphQLClient} from 'graphql-request';
import { LoginQuery } from './query.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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

// http://host.docker.internal:8888


export class LoginUser{
    async login(req, res){
        try{
            // console.log(req.body)
            const {email, password} = req.body.input.input;

            


            const data = await client.request(login.loginUser(),{email});

            if (data.user.length === 0) {
                // User not found
                return res.status(401).json({ message: false });
            }

            const user = data.user[0];
            console.log("This is user data: ", user);

            // Compare the entered password with the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            console.log("Password Match: ", passwordMatch)
            if (!passwordMatch) {
                // Passwords do not match
                return res.status(401).json({ message: false });
            }

            const token = generateJwtToken();
            console.log("Data for the same: ",data);
            // res.json(data);
            res.json(
                {
                    "message": true,
                    "uuid": user.uuid,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "token": token // Include the JWT in the response
                });
        }catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({error: 'Kindly Sign Up or Check email and password'});
        }
    }
}