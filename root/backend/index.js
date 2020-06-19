const express = require("express");
const cors = require("cors");
const pg = require("pg");

require("dotenv").config();

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();

app.use(cors());

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

app.get("/", (req, res) => {
  res.send("Well, hello there!");
});

app.get("/users", getUsers);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
