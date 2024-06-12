import { seedMySQL} from './seed.js';
import { getMySQLConnection, closeConnection } from './db.js';

console.log('Hello World!')

const { client, user } = await getMySQLConnection();

if(await user.count() === 0) {
    await seedMySQL(4);
    await closeConnection(client);
}








