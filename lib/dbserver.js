// /lib/dbserver.js
const { Client } = require('pg');

let client;

export async function connectToDatabase() {
  if (client) {
    return client; // Retorna a conexão existente se já estiver conectada
  }

  client = new Client({
    connectionString: process.env.DATABASE_URL, // A URL de conexão do Neon
    ssl: {
      rejectUnauthorized: false, // Necessário para permitir conexões SSL no Vercel
    },
  });

  await client.connect(); // Estabelece a conexão com o banco

  return client; // Retorna o cliente para uso nas rotas
}

