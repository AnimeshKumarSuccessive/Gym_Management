import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
import userService from './src/model/trainnner.model.js';
import trainnerService from './src/model/trainnner.model.js';
import { config } from 'dotenv';

config();

const app = express(feather());

app.use(express.json());

app.configure(express.rest());  

app.use('/user', new userService());
app.use('/trainner', new trainnerService());


app.use(express.urlencoded({ extended:true }))

app.use(express.notFound());
app.use(express.errorHandler());

app.service('/user').on('created', user => {
    console.log('A new user has been created', user);
});

app.service('/trainner').on('created', user => {
    console.log('A new trainner has been created', user);
});

app.service('/user').on('updated', user => {
    console.log('A user has been updated', user);
});

app.service('/trainner').on('updated', user => {
    console.log('A trainner has been updated', user);
});

app.service('/user').on('removed', removedUser=>{
    console.log('A user has been deleted', removedUser);
});

app.service('/trainner').on('removed', removedUser=>{
    console.log('A trainner has been deleted', removedUser);
});

app.listen(process.env.PORT ).on('listening', ()=>{
    console.log(`A feather application is started on localhost: ${process.env.PORT }`); 
});