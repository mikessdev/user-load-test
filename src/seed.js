import { faker } from '@faker-js/faker';
import { getMySQLConnection, closeConnection } from './db.js';


export async function seedMySQL(amount) {
    const { user } = await getMySQLConnection();
    
    await user.createTable();

    const users = [];

    for (let i = 0; i < amount; i++) {
        const person = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            address: faker.location.streetAddress(),
            city: faker.location.city()
        }
        users.push(person);
    }

    await user.insertMany(users);

    console.log('Done inserting. Was inseting', await users.count(), 'users');

    closeConnection();

}
