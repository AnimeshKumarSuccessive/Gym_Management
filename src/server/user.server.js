import { config } from 'dotenv';
import neo4j from 'neo4j-driver';

config()
                                       
class userService {
  
    async create(user) {
        const uniqueId = nanoid(8)
        const newUser = await session.run(
            `CREATE (u:User {_id: ${uniqueId}} {name: ${user.name}}, {role: ${user.role}}, {phone: ${user.phone}},{ u.address: ${user.address}}, {u.height: ${user.height}}, {u.weight: ${user.weight}}) RETURN u`
        ).then(result => {
            result.records.forEach(record => {
              console.log(record.get('name'))
            })
          })
          .catch(error => {
            console.log(error)
          })
          .then(() => session.close())
          
        return await newUser;
    }

    async update(id, user) {
        const result = await session.run(
            `MATCH (u:User {_id: ${id}} SET {u.name: ${user.name}}, {role: ${user.role}}, {u.phone: ${user.phone}},{ u.address: ${user.address}}, {u.height: ${user.height}}, {u.weight: ${user.weight}}) RETURN u`
        ).then(result => {
            result.records.forEach(record => {
              console.log(record.get('name'))
            })
          })
          .catch(error => {
            console.log(error)
          })
          .then(() => session.close())
        return await result;
    }

    async softDelete(id) {
        const del = await session.run(
            `MATCH (u:User) {_id: ${id}} DETACH DELETE u return u`
        ).then(() => session.close())
        .catch((e)=> console.log('user not found', e));
        return del;
    }
}

export default userService;
