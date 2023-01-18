import { config } from 'dotenv';
import { nanoid } from "nanoid";
import neo4j from 'neo4j-driver';

config();

const {
    url,
    db_username,
    db_password,
    database,
} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password))
    const session = driver.session({ database }); 
                                       
class userService {
  
    async create(user) {
      console.log('user', user);
      const { name, age, role, phone, address, height, weight } = user;
      const session = driver.session();
        const uniqueId = nanoid(8);
        const newUser = await session.run(
            `CREATE (u:User {_id: "${uniqueId}", name: "${name}", age:"${age}", role: "${role}", phone: "${phone}", address: "${address}", height: "${height}", weight: "${weight}"}) RETURN u`
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

    async update(id, user) {
      console.log('id', id, 'trainner', user);
        const { name, age, role, phone, address, height, weight } = user;
        const result = await session.run(
            `MATCH (u:User {_id: "${id}"}) SET u.name = "${name}", u.age = "${age}", u.role = "${role}", u.phone = "${phone}", u.address = "${address}", u.height = "${height}", u.weight = "${weight}" RETURN u`
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
        return await result.records[0].get(0).properties;
    }

    async remove(id) {
      console.log('id', id);
      const del = await session.run(
          `MATCH (t:Trainner {id: "${id}"}) DETACH DELETE t return t`
      )
      session.close();
      return del.records;
    }
}

export default userService;
