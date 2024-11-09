const { Client } = require('pg');

// Substitua pelas credenciais fornecidas pelo Neon
const client = new Client({
  host: '@ep-odd-cell-a52wcl0k.us-east-2.aws.neon.tech',     // Exemplo: db.neon.tech
  port: 5432,                    // Porto padrão do PostgreSQL
  user: 'Base_owner',           // Seu usuário
  password: '2xSkXJGgMuV4',         // Sua senha
  database: 'Base',         // Nome do banco de dados
});

client.connect()
  .then(() => console.log("Conectado ao banco de dados"))
  .catch(err => console.error("Erro de conexão:", err));

module.exports = client;
