import { seedMySQL} from './seed.js';
import { getMySQLConnection, closeConnection } from './db.js';

const { client, user } = await getMySQLConnection();

if(await user.count() != 0) {
    await user.deleteAll()
    } 
    
await seedMySQL(90_000);
await closeConnection(client);








