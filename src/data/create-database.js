require('dotenv').config();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function createDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query('CREATE DATABASE expenses_db');
    console.log('Database created successfully!');
  } catch (error) {
    console.log(`Error creating database: ${error}`);
  } finally {
    pool.end();
  }
}

createDatabase();
