import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
import trainnerService from './src/model/trainnner.model.js';
import { config } from 'dotenv';

config();

const paymentRoute = () => {
    console.log('paid');
}

export default paymentRoute;
