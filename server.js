const express = require('express');
const bodyParser = require('body-parser');
const client = require('./bd'); // Importa a conexão com o banco do arquivo bd.js
const path = require('path'); // Para resolver o caminho para a pasta 'public'

const app = express();
const port = 3000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do body-parser para receber dados no formato 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a raiz '/'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve o index.html da pasta 'public'
});

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

