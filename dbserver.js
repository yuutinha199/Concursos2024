const { Client } = require('pg');

// Conexão com o banco de dados PostgreSQL usando variáveis de ambiente
const client = new Client({
  host: process.env.DB_HOST,       // Usando a variável de ambiente DB_HOST
  port: process.env.DB_PORT,       // Usando a variável de ambiente DB_PORT
  user: process.env.DB_USER,       // Usando a variável de ambiente DB_USER
  password: process.env.DB_PASSWORD, // Usando a variável de ambiente DB_PASSWORD
  database: process.env.DB_NAME,    // Usando a variável de ambiente DB_NAME
  ssl: { rejectUnauthorized: false } // Necessário para Neon (ajuste conforme seu banco)
});

// Conectando ao banco de dados
client.connect()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch(err => {
    console.error("Erro de conexão:", err);
  });

// Exporte o cliente para que outros arquivos possam usá-lo
module.exports = client;

