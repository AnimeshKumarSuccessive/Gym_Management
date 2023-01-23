import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
// import userService from './src/model/trainnner.model.js';
import neo4j from 'neo4j-driver';

import { config } from 'dotenv';
import Authrization from '../middleware/middleware.js';
import userService from '../server/user.server.js';
import { nanoid } from 'nanoid';

config();

const {
    url,
    db_username,
    db_password,
    database,
} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password))
    const session = driver.session({ database });

const userRoute = express(feather()); 

// userRoute.use('/user',  new userService().create);

// userRoute.service('/user').on('created', user => {
//     console.log('A new user has been created', user);
// });
userRoute.route('/user').post(async(req,res)=>{
    console.log('lets see');
    const uniqueId = nanoid(8)
    const user = {...req.body, uniqueId};

    console.log('aaaaaaaaaa', user);
    // const newUser = session.run(
    //     `CREATE (u:User {_id: ${uniqueId}} {name: ${user.name}}, {role: ${user.role}}, {phone: ${user.phone}},{ u.address: ${user.address}}, {u.height: ${user.height}}, {u.weight: ${user.weight}}) RETURN u`
    // )
    // console.log('newUser', newUser);
    // .then(result => {
    //     result.records.forEach(record => {
    //       console.log(record.get('name'))
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
    //   .then(() => session.close())
    //   console.log('newUser', newUser);
    res.json({user})
    // return await newUser;
})

userRoute.route('/user/:id').put(async(req,res)=>{
  console.log('lets see');
  const id = req.params.id;
  const user = req.body;
  // const uniqueId = nanoid(8)
  console.log('aaaaaaaaaa', user);
  // const newUser = session.run(
  //     `CREATE (u:User {_id: ${uniqueId}} {name: ${user.name}}, {role: ${user.role}}, {phone: ${user.phone}},{ u.address: ${user.address}}, {u.height: ${user.height}}, {u.weight: ${user.weight}}) RETURN u`
  // )
  // console.log('newUser', newUser);
  // .then(result => {
  //     result.records.forEach(record => {
  //       console.log(record.get('name'))
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  //   .then(() => session.close())
  //   console.log('newUser', newUser);
  res.json({user})
  // return await newUser;
})

userRoute.route('/user/:id').delete(async(req,res)=>{
  console.log('lets see');
  const id = req.params.id;
  const user = req.body;
  // const uniqueId = nanoid(8)
  console.log('aaaaaaaaaa', user);
  user.remove().then(()=>{
    console.log('deleted successfully');
  })
  .catch((err)=>{console.log('err', err)});
  // const newUser = session.run(
  //     `CREATE (u:User {_id: ${uniqueId}} {name: ${user.name}}, {role: ${user.role}}, {phone: ${user.phone}},{ u.address: ${user.address}}, {u.height: ${user.height}}, {u.weight: ${user.weight}}) RETURN u`
  // )
  // console.log('newUser', newUser);
  // .then(result => {
  //     result.records.forEach(record => {
  //       console.log(record.get('name'))
  //     })
  //   })
  //   .catch(error => {
  //     console.log(error)
  //   })
  //   .then(() => session.close())
  //   console.log('newUser', newUser);
  res.json({user})
  // return await newUser;
})

export default userRoute;