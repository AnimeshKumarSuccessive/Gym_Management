import { nanoid } from 'nanoid';
import { session } from '../model/database.model';                                           

class trainnerService {
    async create(trainner) {
        const uniqueId = nanoid(8)
        const newtrainner = await session.run(
            `CREATE (u:Trainner {_id: ${uniqueId}} {name: ${trainner.name}}, {phone: ${trainner.phone}}) RETURN u`
        ).then(result => {
            result.records.forEach(record => {
              console.log(record.get('name'))
            })
          })
          .catch(error => {
            console.log(error)
          })
          .then(() => session.close())
          
        return await newtrainner;
    }

    async update(id, trainner) {
        const result = await session.run(
            `MATCH (u:Trainner {_id: ${id}} SET u.name: ${trainner.name}, u.phone: ${trainner.phone}) RETURN u`
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
            `MATCH (u:Trainner) {_id: ${id}} DETACH DELETE u return u`
        ).then(() => session.close())
        return del;
    }
}

export default trainnerService;
