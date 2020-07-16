import dotenv from "dotenv";
import { client } from "pg";

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

// const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;
// const { Pool } = pg;

// console.log("DATABASE_URL: ", process.env.DATABASE_URL);

// const pool = new Pool({
//   user: DB_USER,
//   host: DB_HOST,
//   database: DB_DATABASE,
//   password: DB_PASSWORD,
//   port: DB_PORT,
// });

// export default {
//   query: (text, params) => pool.query(text, params),
// };

export default {
  query: (text, params) => client.query(text, params),
};
