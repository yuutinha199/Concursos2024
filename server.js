const express = require('express');
const { Client } = require('pg');

const app = express();

// Middleware para processar JSON e dados codificados em URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do banco de dados usando DATABASE_URL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Isso pode ser necessário em produção
  }
});

// Conecta ao banco de dados
client.connect()
  .then(() => console.log('Conectado ao banco de dados com sucesso'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Rota para salvar os dados no banco de dados
app.post('/salvar', (req, res) => {
  const { nome, endereco, rg, telefone, email, cpf, data } = req.body;

  if (!nome || !endereco || !rg || !telefone || !email || !cpf || !data) {
    return res.status(400).send("Todos os campos devem ser preenchidos.");
  }

  const query = `INSERT INTO usuarios (nome, rg, email, cpf, telefone, data_nascimento) VALUES ($1, $2, $3, $4, $5, $6)`;
  const values = [nome, rg, email, cpf, telefone, data];

  client.query(query, values)
    .then(() => res.send("Dados salvos com sucesso."))
    .catch(err => {
      console.error("Erro ao salvar os dados:", err);
      res.status(500).send("Erro ao salvar os dados.");
    });
});

// Expondo o app para o Vercel
module.exports = app;
