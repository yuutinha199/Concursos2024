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

    // Definindo o caminho do arquivo "dados.txt"
    const filePath = path.join(__dirname, 'dados.txt');
    console.log('Caminho do arquivo:', filePath); // Log para verificar o caminho do arquivo

    // Salvando os dados no arquivo "dados.txt"
    fs.appendFile(filePath, dados, (err) => {
        if (err) {
            console.error('Erro ao salvar o arquivo:', err);
            return res.status(500).send('Erro ao salvar o arquivo');
        }
        console.log('Arquivo salvo com sucesso!');
        res.send('Arquivo salvo com sucesso!');
    });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

