import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();
const Pool = mysql.createPool({
    database: process.env.DATABASE_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.LOCALHOST,
    port: Number(process.env.PORT),
});

const db = Pool.promise();
export default db;
