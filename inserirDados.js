const client = require('./db'); // Importa o cliente de conexão do banco
const dados = require('./consulta'); // Importa os dados de consulta.js

const inserirDados = async () => {
  try {
    // Abre a conexão com o banco de dados
    await client.connect();

    // Insere cada usuário do array 'dados' no banco de dados
    for (const usuario of dados) {
      await client.query(
        `INSERT INTO usuarios (nome, rg, email, cpf, telefone, data_nascimento)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          usuario.nome,
          usuario.rg,
          usuario.email,
          usuario.cpf,
          usuario.telefone,
          usuario.data_nascimento
        ]
      );
    }

    console.log("Dados inseridos com sucesso no banco de dados");
  } catch (err) {
    console.error("Erro ao inserir dados:", err);
  } finally {
    await client.end(); // Fecha a conexão
  }
};

inserirDados();
