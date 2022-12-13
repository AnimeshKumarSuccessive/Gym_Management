const feather = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

class UserService {
    constructor(){
        this.users = [];
    }

    async find(){
        return this.messages;
    }

    async create(data){
        const user = {
            id: this.users.length,
            name: data.name,
            phone: data.phone
        }
        this.users.push(user);

        return user;
    }

    async edit(data){

    }

    async remove(id){
        return Promise.resolve({id});
    }
}

const app = express(feather());

app.use(express.json());    


app.configure(express.rest());  
app.configure(socketio()); 

// Resister message service on the Feather Application
app.use('/users', new UserService());

app.use(express.errorHandler());  //Error Handler found in @featherjs/express

// Log every time a new messages has been created
app.service('users').on('created', user => {
    console.log('A new user has been created', user);
});

app.service('users').on('removed', (removedUser)=>console.log('deleted', removedUser));


app.publish(()=> app.channel('everybody'));

app.listen(3030).on('listening', ()=>{
    console.log('A feather application is started on localhost: 3030'); 
});

app.service('users').create({
    name: 'Animesh Kumar',
    phone: 7004650899
});

app.service('users').create({
    name: 'deepak Gaikwad',
    phone: 7004650899
});

app.service('users').create({
    name: 'Aashlesha chitte',
    phone: 7004650899
});

app.service('users').remove(1);
