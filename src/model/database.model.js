import { config } from 'dotenv';
import neo4j from 'neo4j-driver';

config()

const {
    url,
    db_username,
    db_password,
    database,
} = process.env

const dataBase = () => {
    const driver = neo4j.driver(url, neo4j.auth.basic(db_username, db_password))
    const session = driver.session({ database });
    console.log(session);
}

export default { dataBase };
