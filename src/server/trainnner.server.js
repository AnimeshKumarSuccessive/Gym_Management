import { config } from 'dotenv';
import { nanoid } from "nanoid";
import neo4j from 'neo4j-driver';

config()

const {
    url,
    db_username,
    db_password,
    database,
} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password))
    const session = driver.session({ database });

class TrainnerService {

  async create(trainer) {
    console.log('trainer', trainer);
    const { name, age, role, phone, address, height, weight } = trainer;
    const session = driver.session();
      const uniqueId = nanoid(8);
      const newUser = await session.run(
          `CREATE (u:Trainer {_id: "${uniqueId}", name: "${name}", age:"${age}", role: "${role}", phone: "${phone}", address: "${address}", height: "${height}", weight: "${weight}"}) RETURN u`
          // `CREATE (t)-[r: user_trainner]->(u)-[rel: user_plan ]->(p) RETURN (u)`
      )
      session.close();
      // .then(result => {
      //     result.records.forEach(record => {
      //       console.log(record.get('_id'))
      //     })
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
      //   .then(() => session.close())
        
      return await newUser.records[0].get(0).properties;
  }

  async update(id, trainer) {
    console.log('id', id, 'trainer', trainer);
      const { name, age, role, phone, address, height, weight } = trainer;
      if(!id){
        return 'Please enter an id'
      }
      if(id.length===8){
        const result = await session.run(
            `MATCH (t:Trainer {_id: "${id}"}) SET t.name = "${name}", t.age = "${age}", t.role = "${role}", t.phone = "${phone}", t.address = "${address}", t.height = "${height}", t.weight = "${weight}" RETURN t`
        )
        session.close();
        // .then(result => {
        //     result.records.forEach(record => {
        //       console.log(record.get('name'))
        //     })
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
        //   .then(() => session.close())
        return await result.records[0].get(0).properties;;
      }
      else {
        return 'please provide valid id'
      }
  }

    async remove(id) {
      console.log('id', id);
      if(!id){
        return 'Please enter an id'
      }
      if(id.length===8){
        const del = await session.run(
            `MATCH (t:Trainer {_id: "${id}"}) DELETE t`
        )
        session.close();
        return del.records;
      }
      else {
        return 'please provide a vaild id'
      }
    }
}

export default TrainnerService;
