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
class trainerService {
    // async findAll() {
    //     const result = await session.run(`Match (u:trainer) return u`)
    //     return result.records.map(i=>i.get('u').properties)
    // }
    // async findById(id) {
    //     const result = await session.run(`MATCH (u:trainer {_id : '${id}'} ) return u limit 1`)
    //     return result.records[0].get('u').properties
    // }
    
    async create(trainer) {
        const unique_id = nanoid(8)
        const newtrainer = await session.run(`CREATE (u:trainer {_id : '${unique_id}', name: '${trainer.name}', mobile: '${trainer.mobile}', email: '${trainer.email}', password: '${trainer.password}'} ) return u`)
        return await newtrainer;
    }
    
    async findByIdAndUpdate(id, trainer) {
        const result = await session.run(`MATCH (u:trainer {_id : '${id}'}) SET u.name= '${trainer.name}', u.mobile= '${trainer.mobile}', u.email= '${trainer.email}', u.password= '${trainer.password}' return u`)
        return result
    }
    
    async findByIdAndDelete(id) {
        const deletetrainer = await session.run(`MATCH (u:trainer {_id : '${id}'}) WHERE u.deleted_by IS NULL return u`)
        return await deletetrainer;
    }
}

export default trainerService;
