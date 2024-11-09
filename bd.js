const { Client } = require('pg');

const client = new Client({
  host: 'ep-odd-cell-a52wcl0k.us-east-2.aws.neon.tech',  // Host do banco de dados
  port: 5432,                                            // Porta padrão do PostgreSQL
  user: 'Base_owner',                                    // Usuário do banco de dados
  password: '2xSkXJGgMuV4',                              // Senha do banco de dados
  database: 'Base',                                      // Nome do banco de dados
  ssl: { rejectUnauthorized: false }                     // SSL habilitado, ignorando validação do certificado
});

client.connect()
  .then(() => console.log("Conectado ao banco de dados"))
  .catch(err => console.error("Erro de conexão:", err));

module.exports = client;

