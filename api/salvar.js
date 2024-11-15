// /api/salvar.js
import { connectToDatabase } from "../../lib/dbserver"; // Importa a função para conectar ao banco Neon

export default async function handler(req, res) {
  // Verifica se o método da requisição é POST
  if (req.method === 'POST') {
    try {
      // Extrai os dados do corpo da requisição (todos os campos do formulário)
      const { nome, data_nascimento, rg, cpf, endereco, telefone, email, escolaridade, cargo, local } = req.body;

      // Verifica se os dados essenciais foram enviados
      if (!nome || !data_nascimento || !rg || !cpf || !email) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos!' });
      }

      // Conectar ao banco de dados Neon
      const client = await connectToDatabase();

      // Insere os dados na tabela 'contacts' (ajustado para todos os campos)
      const result = await client.query(
        'INSERT INTO contacts (nome, data_nascimento, rg, cpf, endereco, telefone, email, escolaridade, cargo, local) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [nome, data_nascimento, rg, cpf, endereco, telefone, email, escolaridade, cargo, local]
      );

      // Retorna a resposta com sucesso e os dados inseridos
      res.status(200).json({
        message: 'Inscrição realizada com sucesso!',
        data: result.rows[0],  // Retorna os dados do registro inserido
      });
    } catch (error) {
      console.error('Erro ao inserir dados no banco:', error);
      res.status(500).json({ error: 'Erro ao processar a requisição' });
    }
  } else {
    // Caso o método não seja POST, retorna erro 405 (Método Não Permitido)
    res.status(405).json({ error: 'Método não permitido' });
  }
}
