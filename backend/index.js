import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { router } from './routes/routes.mjs';

const app = express();
express.urlencoded()
//app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // replace with your React app origin
    credentials: true,
  }));
const PORT = process.env.PORT || 6541;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(PORT, ()=>{
    console.log(`URL: http://localhost:${PORT}`);
});