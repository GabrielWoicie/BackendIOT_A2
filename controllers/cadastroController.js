const db = require('../db');

const cadastroController = async (req, res) => {
    const { name, email, tagNumber } = req.body;
    let conn;

    if (!name || !email || !tagNumber) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        conn = await db.pool.getConnection(); // obtém uma conexão do pool
        await conn.beginTransaction(); // inicia a transação

        // Inserir cliente
        const clientResult = await conn.query(
            'INSERT INTO client (name, email) VALUES (?, ?)',
            [name, email]
        );
        const idClient = clientResult.insertId;

        // Inserir tag
        const tagResult = await conn.query(
            'INSERT INTO tag (tagNumber) VALUES (?)',
            [tagNumber]
        );
        const idTag = tagResult.insertId;

        // Vincular nas clientTag
        await conn.query(
            'INSERT INTO clientTag (idClient, idTag) VALUES (?, ?)',
            [idClient, idTag]
        );

        await conn.commit(); // confirma a transação
        res.status(201).json({ message: 'Cadastro realizado com sucesso.' });

    } catch (error) {
        if (conn) await conn.rollback(); // reverte em caso de erro
        console.error('Erro no cadastro:', error);
        res.status(500).json({ error: 'Erro ao realizar o cadastro.' });
    } finally {
        if (conn) conn.release(); // libera a conexão de volta para o pool
    }
};

module.exports = { cadastroController };
