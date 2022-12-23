// const feather = require('@feathersjs/feathers');
// const express = require('@feathersjs/express');
// const userService = require('../model/user.model');

// const app = express(feather);

// app.use(express.json());

// app.configure(express.rest());  

// app.use('/user', new userService());
// app.use(express.urlencoded({ extended:true }))

// app.use(express.errorHandler());

// app.service('/user').on('created', user => {
//     console.log('A new user has been created', user);
// });

// app.listen(process.env.PORT ).on('listening', ()=>{
//     console.log(`A feather application is started on localhost: ${process.env.PORT}`); 
// });

// console.log('userService', app);