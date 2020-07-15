import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;
const { Pool } = pg;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export default {
  query: (text, params) => pool.query(text, params),
};
