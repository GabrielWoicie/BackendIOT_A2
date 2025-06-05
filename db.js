const mariadb = require('mariadb');

require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});

async function connectToDatabase() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log("Connected to the database!");
        return connection;
    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err;
    }
}

module.exports = { connectToDatabase, pool };