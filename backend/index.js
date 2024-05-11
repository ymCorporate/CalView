import express from 'express';
import { router } from './routes/routes.mjs';

const app = express();
const PORT = process.env.PORT || 6541;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(PORT, ()=>{
    console.log(`URL: http://localhost:${PORT}`);
});