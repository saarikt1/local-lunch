import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

// const { Client } = pg;

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// client.connect();

// export default {
//   query: (text, params) => client.query(text, params),
// };

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const { Pool } = pg;
let pool;

if (process.env.NODE_ENV === "development") {
  console.log("We are in development mode right now!");

  pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
  });
} else {
  console.log("We are in production mode right now!", process.env.DATABASE_URL);

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
}

export default {
  query: (text, params) => pool.query(text, params),
};
