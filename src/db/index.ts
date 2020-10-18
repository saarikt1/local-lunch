import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const { Pool } = pg;
let pool;

if (process.env.NODE_ENV === "development") {
  pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: Number(DB_PORT),
  });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

export default {
  query: (text, params) => pool.query(text, params),
};
