import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
import trainnerService from './src/model/trainnner.model.js';
import { config } from 'dotenv';

config();

const planRoute = express(feather());

planRoute.use(express.json());

planRoute.configure(express.rest());  

planRoute.use('/trainner', new trainnerService());

planRoute.service('/trainner').on('created', trainner => {
    console.log('A new trainner has been created', trainner);
});

planRoute.service('/trainner').on('updated', trainner => {
    console.log('A trainner has been updated', trainner);
});

planRoute.service('/trainner').on('removed', removedtrainner=>{
    console.log('A trainner has been deleted', removedtrainner);
});

export default planRoute;
