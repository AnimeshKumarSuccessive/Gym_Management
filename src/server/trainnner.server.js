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

    async create(traineer) {
      console.log('traineer', traineer);
        const uniqueId = nanoid(8);
        const session = driver.session();
        // const { age } = traineer
        const { name, age, role, phone, address, height, weight } = traineer
        const newtrainner = await session.run(
          `CREATE (t:Trainner {id: "${uniqueId}", name: "${name}", age: "${age}", role: "${role}", phone: "${phone}", address: "${address}", height: "${height}", weight: "${weight}"}) RETURN t`
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
        console.log(newtrainner.records[0].get(0).properties);
        return newtrainner.records[0].get(0).properties;

    }

    async update(id, trainner) {
      console.log('id', id, 'trainner', trainner);
      const { name, age, role, phone, address, height, weight } = trainner 
        const result = await session.run(
            `MATCH (t:Trainner {_id: "${id}"}) SET t.name = "${name}", t.age = "${age}", t.role = "${role}", t.phone = "${phone}", t.address = "${address}", t.height = "${height}", t.weight = "${weight}" RETURN t`
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
        return result.summary;
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

export default TrainnerService;
