const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

const checkDatabaseConnection = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL database connected successfully.");

        connection.release();
    } catch (error) {
        console.error("MySQL database connection failed.");
        console.error("Please check your database environment variables.");
    }
};

checkDatabaseConnection();

module.exports = pool;