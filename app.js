import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
import { trainnerRoute, userRoute } from './src/route';
import { config } from 'dotenv';

config();

const app = express(feather());

app.use(express.json());

app.configure(express.rest());  

app.use('/user', userRoute);
app.use('/trainner', trainnerRoute);

app.listen(process.env.PORT ).on('listening', ()=>{
    console.log(`A feather application is started on localhost: ${process.env.PORT }`); 
});