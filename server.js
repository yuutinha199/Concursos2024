const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configuração do body-parser para receber dados no formato 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados PostgreSQL usando variáveis de ambiente
const client = new Client({
  host: process.env.DB_HOST,       // Usando a variável de ambiente DB_HOST
  port: process.env.DB_PORT,       // Usando a variável de ambiente DB_PORT
  user: process.env.DB_USER,       // Usando a variável de ambiente DB_USER
  password: process.env.DB_PASSWORD, // Usando a variável de ambiente DB_PASSWORD
  database: process.env.DB_NAME,    // Usando a variável de ambiente DB_NAME
  ssl: { rejectUnauthorized: false } // Necessário para Neon
});

// Conecta ao banco de dados
client.connect()
  .then(() => console.log("Conectado ao banco de dados"))
  .catch(err => console.error("Erro de conexão:", err));

// Rota para salvar os dados no banco
app.post('/salvar', (req, res) => {
    const { nome, endereco, rg, telefone, email, cpf, data } = req.body;

    if (!nome || !endereco || !rg || !telefone || !email || !cpf || !data) {
        return res.status(400).send("Todos os campos devem ser preenchidos.");
    }

    // Query para inserir os dados na tabela 'usuarios'
    const query = `
      INSERT INTO usuarios (nome, rg, email, cpf, telefone, data_nascimento)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [nome, rg, email, cpf, telefone, data];

    client.query(query, values)
        .then(() => {
            res.send("Dados salvos com sucesso.");
        })
        .catch(err => {
            console.error("Erro ao salvar os dados:", err);
            res.status(500).send("Erro ao salvar os dados.");
        });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
