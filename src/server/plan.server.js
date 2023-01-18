import { config } from 'dotenv';
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
class planService {
    async create(user){
      const {plan, amount} = user;
      console.log('user', user);
        const newPlan = await session.run(
            `CREATE (p:Plan {plan: "${plan}", amount: "${amount}", status: "Paid"}) RETURN p`
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
}

export default planService;
