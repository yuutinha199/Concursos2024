const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para servir o arquivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para receber o valor dos campos e salvar em um arquivo .txt
app.post('/salvar', (req, res) => {
    const { nome, endereco, rg, telefone, email, cpf, data } = req.body;

    // Dados formatados para salvar no arquivo
    const dados = `Nome: ${nome}\nEndereço: ${endereco}\nRG: ${rg}\nTelefone: ${telefone}\nE-mail: ${email}\nCPF: ${cpf}\nData: ${data}\n\n`;
	
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

