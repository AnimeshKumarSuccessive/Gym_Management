import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';

import { config } from 'dotenv';
import { userRoute, trainnerRoute, planRoute} from './route/index.js';

config();

const app = express(feather());

app.use(express.json());

app.configure(express.rest()); 

app.use('/user', userRoute);
app.use('/trainner', trainnerRoute);
app.use('/plan', planRoute);

app.get('/healthcheck', async(req,res) => {
    res.send({
        status: 'ok',
        service: 'ETL',
    })
});

app.listen(process.env.PORT || 3050 ).on('listening', ()=>{
    console.log(`A feather application is started on localhost: ${process.env.PORT }`); 
});