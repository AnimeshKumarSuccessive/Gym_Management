import { config } from 'dotenv';
import neo4j from 'neo4j-driver';
import { nanoid } from "nanoid";


config()

const {
    url,
    db_username,
    db_password,
    database,
} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password))
    const session = driver.session({ database });
class planService {
    async create(plans) {
        console.log('plan', plans);
        const { plan, amount } = plans;
        const session = driver.session();
          const uniqueId = nanoid(8);
          const newUser = await session.run(
              `CREATE (p:Plan {_id: "${uniqueId}", plan: "${plan}", amount:"${amount}", status:"paid"}) RETURN p`
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
  
      async update(id, plans) {
        console.log('id', id, 'plans', plans);
          const { plan, amount } = plans;
          if(!id){
            return 'Please enter an id'
          }
          if(id.length===8){
            const result = await session.run(
                `MATCH (p:Plan {_id: "${id}"}) SET p.plan = "${plan}", p.amount = "${amount}" RETURN p`
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

    async remove(id){
        if(!id){
            return 'Please enter an id'
        }
        if(id.length===8){
            const deletePlan = await session.run(
                `MATCH (p:Plan {_id: "${id}"}) DELETE p`
            )
            session.close();
            return deletePlan.records;
        }
        else{
            return 'please provide a valid id'
        }
    }
}

export default planService;
