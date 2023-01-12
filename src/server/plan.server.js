import { nanoid } from "nanoid";
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
        const uniqueId = nanoid(8)
        const newPlan = await session.run(
            `CREATE (p:Plan {_id: ${uniqueId}} {plan: ${user.plan}} {amount: ${user.amount}}) RETURN u`
        ).then(result => {
            result.records.forEach(record => {
              console.log(record.get('plan'))
            })
          })
          .catch(error => {
            console.log(error)
          })
          .then(() => session.close())

          return await newPlan
    }
}

export default planService;
