import { config } from 'dotenv';
import { nanoid } from 'nanoid';
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
                                            

class userService {
    async create(user) {
        const uniqueId = nanoid(8)
        const newUser = await session.run(
            `CREATE (u:User {_id: ${uniqueId}} {name: ${user.name}}, {phone: ${user.phone}}) RETURN u`
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
            `MATCH (u:User {_id: ${id}} SET u.name: ${user.name}, u.phone: ${user.phone}, u.address: ${user.address}, u.height: ${user.height}, u.weight: ${user.weight}) RETURN u`
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
        return del;
    }
}

export default userService;
