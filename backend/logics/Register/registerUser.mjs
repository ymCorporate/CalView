import { GraphQLClient} from 'graphql-request';
import { RegisterEventQuery } from './query.mjs';
// import bodyParser from "body-parser";

const new_user = new RegisterEventQuery();

const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
const adminSecret = '123';

const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        'x-hasura-admin-secret': adminSecret
        // 'Authorization': `Bearer ${generateJwtToken()}`
    },
});



export class CreateUser{
    async create_user(req, res){
        const { email, password, firstName, lastName, company, role } = req.body;
        console.log(email, password, firstName, lastName, company, role);

  try {
    const data = await client.request( new_user.registerUser(),{
        email, password, firstName, lastName, company, role
      });

      console.log(data);

    // res.json(data);
    res.status(200).json({success: true});
    } catch (error) {
        console.error('Failed to create user:', error);
        res.json({ Notsuccess: false });
      }

    }
}