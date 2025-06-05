const db = require('../db');

const buscarClientePorNome = async (req, res) => {
    const { name } = req.body;
  
    if (!name) {
      return res.status(400).json({ error: 'name é obrigatório.' });
    }
  
    let conn;
  
    try {
      conn = await db.pool.getConnection();
  
      // 1. Buscar cliente
      const clientResult = await conn.query('SELECT id, email FROM client WHERE name = ?', [name]);
  
      if (clientResult.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }
  
      const { id: idClient, email } = clientResult[0];
  
      // 2. Buscar idTag na clientTag
      const tagLinkResult = await conn.query('SELECT idTag FROM clientTag WHERE idClient = ?', [idClient]);
  
      if (tagLinkResult.length === 0) {
        return res.status(404).json({ error: 'Nenhuma tag associada a esse cliente.' });
      }
  
      const idTag = tagLinkResult[0].idTag;
  
      // 3. Buscar tagNumber
      const tagResult = await conn.query('SELECT tagNumber FROM tag WHERE id = ?', [idTag]);
  
      if (tagResult.length === 0) {
        return res.status(404).json({ error: 'Tag não encontrada.' });
      }
  
      const { tagNumber } = tagResult[0];
  
      res.json({ idClient, name, email, tagNumber });
  
    } catch (err) {
      console.error('Erro ao buscar cliente por nome:', err);
      res.status(500).json({ error: 'Erro interno ao buscar cliente.' });
    } finally {
      if (conn) conn.release();
    }
  };

const buscarClientePorTag = async (req, res) => {
    const { tagNumber } = req.body;
  
    if (!tagNumber) {
      return res.status(400).json({ error: 'tagNumber é obrigatório.' });
    }
  
    let conn;
  
    try {
      conn = await db.pool.getConnection();
  
      // 1. Buscar o ID da tag
      const tagResult = await conn.query('SELECT id FROM tag WHERE tagNumber = ?', [tagNumber]);
  
      if (tagResult.length === 0) {
        return res.status(404).json({ error: 'Tag não encontrada.' });
      }
  
      const idTag = tagResult[0].id;
  
      // 2. Buscar o ID do cliente relacionado à tag
      const linkResult = await conn.query('SELECT idClient FROM clientTag WHERE idTag = ?', [idTag]);
  
      if (linkResult.length === 0) {
        return res.status(404).json({ error: 'Nenhum cliente associado a essa tag.' });
      }
  
      const idClient = linkResult[0].idClient;
  
      // 3. Buscar dados do cliente
      const clientResult = await conn.query('SELECT name, email FROM client WHERE id = ?', [idClient]);
  
      if (clientResult.length === 0) {
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }
  
      const { name, email } = clientResult[0];
  
      res.json({ idClient, name, email, tagNumber });
  
    } catch (err) {
      console.error('Erro ao buscar tag:', err);
      res.status(500).json({ error: 'Erro interno ao buscar tag.' });
    } finally {
      if (conn) conn.release();
    }
  };

module.exports = { buscarClientePorNome, buscarClientePorTag };