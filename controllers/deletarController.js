const db = require('../db');

const deletarPorTag = async (req, res) => {
  const { tagNumber } = req.body;

  if (!tagNumber) {
    return res.status(400).json({ error: 'tagNumber é obrigatório.' });
  }

  let conn;

  try {
    conn = await db.pool.getConnection();
    await conn.beginTransaction();

    // 1. Buscar id da tag
    const tagResult = await conn.query('SELECT id FROM tag WHERE tagNumber = ?', [tagNumber]);
    if (tagResult.length === 0) {
      return res.status(404).json({ error: 'Tag não encontrada.' });
    }
    const idTag = tagResult[0].id;

    // 2. Buscar id do cliente associado
    const clientTagResult = await conn.query('SELECT idClient FROM clientTag WHERE idTag = ?', [idTag]);
    if (clientTagResult.length === 0) {
      return res.status(404).json({ error: 'Cliente associado não encontrado.' });
    }
    const idClient = clientTagResult[0].idClient;

    // 3. Deletar relacionamento clientTag
    await conn.query('DELETE FROM clientTag WHERE idTag = ?', [idTag]);

    // 4. Deletar tag
    await conn.query('DELETE FROM tag WHERE id = ?', [idTag]);

    // 5. Deletar client
    await conn.query('DELETE FROM client WHERE id = ?', [idClient]);

    await conn.commit();
    res.json({ message: 'Cliente e tag deletados com sucesso.' });

  } catch (error) {
    if (conn) await conn.rollback();
    console.error('Erro ao deletar:', error);
    res.status(500).json({ error: 'Erro ao deletar cliente e tag.' });
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { deletarPorTag };
