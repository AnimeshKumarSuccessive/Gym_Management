import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
// import planService from './src/model/plan.model.js';
import { config } from 'dotenv';
import Authrization from '../middleware/middleware.js';
import planService from '../server/plan.server.js';

config();

const planRoute = express(feather());

planRoute.use(express.json());

planRoute.configure(express.rest());  

planRoute.use('plan', Authrization, new planService());

planRoute.service('plan').on('created', plan => {
    console.log('A new plan has been created', plan);
});

planRoute.service('/plan').on('updated', plan => {
    console.log('A plan has been updated', plan);
});

planRoute.service('/plan').on('removed', removedplan=>{
    console.log('A plan has been deleted', removedplan);
});

export default planRoute;
