// import express from "express";
// import ServerlessHttp from "serverless-http";

// const app = express();

// app.get('/.netlify/functions/api', (req,res)=>{
//     return res.json({"message":"Hello"});
//   });

import express from 'express';
import ServerlessHttp from "serverless-http";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from '../routes/routes.mjs';

const app = express();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // replace with your React app origin
    credentials: true,
  }));
// const PORT = process.env.PORT || 6541;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/.netlify/functions/api' ,router);



const handlers = ServerlessHttp(app);

export const handler = async(event, context)=>{
    const result = await handlers(event, context);
    return result
}