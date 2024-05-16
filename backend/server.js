import express from 'express';
import cors from 'cors';
import { router } from './routes/routes.mjs';

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4321;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(PORT, ()=>{
    console.log(`URL: http://localhost:${PORT}`);
});