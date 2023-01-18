import  feather from '@feathersjs/feathers';
import express from '@feathersjs/express';
import { config } from 'dotenv';
import neo4j from 'neo4j-driver';
import { userRoute, trainnerRoute, planRoute} from './route/index.js';
import Authrization from './middleware/middleware.js';
// import { planService,
//     StatusServer,
//     TrainnerService,
//     userService } from './server/index';
import StatusServer from './server/status.server.js';
import planService from './server/plan.server.js';
import TrainnerService from './server/trainnner.server.js';
import userService from './server/user.server.js';

config();

const {
    url,
    db_username,
    db_password,
    database,
} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password))
    const session = driver.session({ database });

const app = express(feather());

app.use(express.json());

app.configure(express.rest()); 

app.use('/user', new userService());
app.use('/trainner', new TrainnerService());
app.use('/plan', new planService());
app.use('/status', new StatusServer());
app.use('/neo4j', {
    async find(params) {
      const session = driver.session();
      const result = await session.run('MATCH (n:Person) RETURN n');
      session.close();
      return result.records.map(record => record.get(0).properties);
    },
    async create(data, params) {
      console.log('data', data);
      const session = driver.session();
      const {name, age} = data;
      const result = await session.run(`CREATE (n:Person {name: "${name}", age: ${age}}) RETURN n`);
      session.close();
      return result.records[0].get(0).properties;
    },
  });

app.get('/healthcheck', async(req,res) => {
    res.send({
        status: 'ok',
        service: 'ETL',
    })
});

app.listen(process.env.PORT || 3050 ).on('listening', ()=>{
    console.log(`A feather application is started on localhost: ${process.env.PORT }`); 
});
