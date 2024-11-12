const express = require('express');
const bodyParser = require('body-parser');
const client = require('./dbserver'); // Conexão ao banco de dados

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // Para receber dados como application/x-www-form-urlencoded

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

module.exports = app; // Exporta o app para a Vercel
