import { GraphQLClient} from 'graphql-request';
import { RegisterEventQuery } from './query.mjs';
import bcrypt from 'bcrypt';
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
      console.log(req.body.input.input);
        const { email, password, firstName, lastName, company, role } = req.body.input.input;
        console.log(email, password, firstName, lastName, company, role);

  try {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await client.request( new_user.registerUser(),{
        email, hashedPassword, firstName, lastName, company, role
      });

      console.log(data.insert_kalenview_one.uuid);


    // res.json(data.insert_kalenview_one.uuid);
    res.status(200).json({uuid:`${data.insert_kalenview_one.uuid}`});
    } catch (error) {
        console.error('Failed to create user:', error);
        res.json({ Notsuccess: false });
      }

    }
}