import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
import userService from './src/model/trainnner.model.js';
import { config } from 'dotenv';

config();

const userRoute = express(feather()); 

userRoute.use('/user', new userService());

userRoute.service('/user').on('created', user => {
    console.log('A new user has been created', user);
});

userRoute.service('/user').on('updated', user => {
    console.log('A user has been updated', user);
});

userRoute.service('/user').on('removed', removedUser=>{
    console.log('A user has been deleted', removedUser);
});

export default userRoute;