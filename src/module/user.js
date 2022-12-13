import { nanoid } from 'nanoid';
import neo4j from 'neo4j-driver';
import {config} from 'dotenv';

config();

const {
    url,
    db_username,
    db_password,
    database,
} = process.env

const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password));
const session = driver.session({ database });

class UserService {
    async findAll() {
        const result = await session.run(`Match (u:User) return u`)
        return result.records.map(i=>i.get('u').properties)
    }
    async findById(id) {
        const result = await session.run(`MATCH (u:User {_id : '${id}'} ) return u limit 1`)
        return result.records[0].get('u').properties
    }
    
    async create(user) {
        const unique_id = nanoid(8)
        await session.run(`CREATE (u:User {_id : '${unique_id}', name: '${user.name}', mobile: '${user.mobile}', email: '${user.email}', password: '${user.password}'} ) return u`)
        return await findById(unique_id)
    }
    
    async findByIdAndUpdate(id, user) {
        const result = await session.run(`MATCH (u:User {_id : '${id}'}) SET u.name= '${user.name}', u.mobile= '${user.mobile}', u.email= '${user.email}', u.password= '${user.password}' return u`)
        return result.records[0].get('u').properties
    }
    
    async findByIdAndDelete(id) {
        await session.run(`MATCH (u:User {_id : '${id}'}) DELETE u`)
        return await findAll()
    }
}

export default UserService;
