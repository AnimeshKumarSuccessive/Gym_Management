import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
import trainnerService from './src/model/trainnner.model.js';
import { config } from 'dotenv';
import Authrization from '../middleware/middleware.js';

config();

const trainnerRoute = express(feather());

trainnerRoute.use(express.json());

trainnerRoute.configure(express.rest());  

trainnerRoute.use('/trainner', Authrization, new trainnerService());

trainnerRoute.service('/trainner').on('created', trainner => {
    console.log('A new trainner has been created', trainner);
});

trainnerRoute.service('/trainner').on('updated', trainner => {
    console.log('A trainner has been updated', trainner);
});

trainnerRoute.service('/trainner').on('removed', removedtrainner=>{
    console.log('A trainner has been deleted', removedtrainner);
});

export default trainnerRoute;
