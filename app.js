import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
import UserService from './src/module/user.js';
const app = express(feather());

app.use(express.json());

app.configure(express.rest());  

app.use('/', new UserService());

app.use(express.urlencoded({ extended:true }))

app.use(express.errorHandler());

app.service('/').findAll();

app.service('/').findById();

app.service('/').on('created', user => {
    console.log('A new user has been created', user);
});

app.service('/').on('updated', user => {
    console.log('A user has been updated', user);
})

app.service('/').on('removed', (removedUser)=>{
    console.log('A user has been deleted', removedUser);
});

app.listen(process.env.PORT ).on('listening', ()=>{
    console.log(`A feather application is started on localhost: ${process.env.PORT}`); 
});
