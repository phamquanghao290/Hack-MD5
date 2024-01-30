import dotenv from "dotenv";
dotenv.config();
const Pool = {
    database: process.env.DATABASE_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.LOCALHOST,
    port: Number(process.env.PORT),
};

export default Pool;
