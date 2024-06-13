import mysql from 'mysql2/promise'



export async function openConnection () {
    try {
        const client = await mysql.createConnection({
            host: 'localhost',
            user: 'user',
            password: 'root',
            database: 'mydatabase'
          });

          console.log('Conectado ao MySQL 🎲');
          return client;
        
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error);
    }
    

}

export async function closeConnection (client) {
    return await client.end((err) => {
        if (err) {
          console.error('Erro ao encerrar a conexão:', err.stack);
          return;
        }
        console.log('Conexão encerrada. 😶‍🌫️');
      });
}


export async function getMySQLConnection() {
    try{
        const client = await openConnection()
        return {
            client,
            user: {
                async createTable() {
                    try {
                        const query = 
                            `CREATE TABLE user (
                                id int AUTO_INCREMENT,
                                lastName varchar(255),
                                firstName varchar(255),
                                address varchar(255),
                                city varchar(255),
                                PRIMARY KEY (id)
                            );`
                        const tables = await client.query('SHOW TABLES LIKE "user"')
                        if(tables.length === 0) {
                            console.log('Criando tabela user');
                            client.query(query);
                            return;
                        }
                        console.log('Tabela user já existe');
                        
                    } catch (error) {
                        console.error('Erro ao criar tabela:', error);
                    }
                    
                },
                async insertMany(users) {
                    try {

                        let insert = 'insert into user\n (firstName, lastName, address, city)\n values\n'
                        const quote = (string) => `${string ? `"${string.replaceAll('"', '\\"')}"` : null}`

                        for (let i = 0; i < users.length; i++) {
                            const {firstName, lastName, address, city} = users[i];

                            insert += `\n ${ i == 0 ? '' : ', '} (${quote(firstName)}, ${quote(lastName)}, ${quote(address)}, ${quote(city)})` 
                          
                        }

                        console.log('tamanho da string', insert.length);

                        await client.query(insert);
                                 
                    } catch (error) {
                        console.error('Erro ao inserir usuários:', error);
                    }
                },
                async deleteAll() {
                    const query = `DELETE FROM user;`
                    try {
                        await client.query(query);
                    } catch (error) {
                        console.error('Erro ao deletar usuários:', error);
                    }
                },
                async count() {
                    const query = `SELECT COUNT(*) FROM user;`
                    
                    try {
                        const result = await client.query(query);
                        return result[0][0]['COUNT(*)']
                    } catch (error) {
                        console.error('Erro ao contar usuários:', error);
                        
                    }
                }
            }
        }
      }catch(error){
        console.error('Erro conectando ao MySQL:', error);
        throw error;
      }

}
