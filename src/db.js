import { mysql } from 'mysql'


async function getMySQLConnection() {
    const client = mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'root',
        database: 'userLoadTest'
      });

      try{
        await client.connect();
        return {
            client,
            users: {
                async createTable() {
                    const query = 
                        `CREATE TABLE user (
                            id int,
                            lastName varchar(255),
                            firstName varchar(255),
                            address varchar(255),
                            city varchar(255)
                        );`

                    await client.query(query);
                    
                },
                async insertMany(users) {
                    const query = `INSERT INTO user (id, lastName, firstName, address, city) VALUES ?`;
                    await client.query(query, users);
                },
                async deleteAll() {
                    const query = `DELETE FROM user;`
                    await client.query(query);
                },
            }
        }
      }catch(error){
        console.error('Erro conectando ao MySQL:', error);
        throw error;
      }

}
