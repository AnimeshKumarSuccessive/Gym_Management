import { nanoid } from "nanoid";
class userPlan {
    async create(user){
        const uniqueId = nanoid(8)
        const newPlan = await session.run(
            `CREATE (p:Plan {_id: ${uniqueId}} {plan: ${user.plan}} {amount: ${user.amount}} ) RETURN u`
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

export default userPlan;
