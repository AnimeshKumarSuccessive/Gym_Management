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
    async create(user){
      const {plan, amount} = user;
      const uniqueId = nanoid(8);
      console.log('user', user);
        const newPlan = await session.run(
            `CREATE (p:Plan {id: "${uniqueId}",plan: "${plan}", amount: "${amount}", status: "Paid"}) RETURN p`
        )
        session.close();
        // .then(result => {
        //     result.records.forEach(record => {
        //       console.log(record.get('plan'))
        //     })
        //   })
        //   .catch(error => {
        //     console.log(error)
        //   })
        //   .then(() => session.close())
        return await newPlan.records[0].get(0).properties;
    }

    async update(id, user) {
        const {plan, amount} = user;
        if(!id){
            return 'Please enter an id'
        }
        if(id===8){
            const updatedPlan = await session.run(
                `MATCH (p: Plan {_id: "${id}"}) SET p.plan = "${plan}", p.amount = "${amount}" RETURN p`
            )
            session.close();
    
            return updatedPlan.summary.query;
        }
        else {
            return 'please provide a valid id'
        }
    }

    async remove(id){
        if(!id){
            return 'Please enter an id'
        }
        if(id.length===8){

            const deletePlan = await session.run(
                `MATCH (t:Trainner {id: "${id}"}) DETACH DELETE t return t`
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
