import dotenv from "dotenv";
import express from "express";
import pg from "pg";

dotenv.config();

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const { Pool } = pg;
const router = express.Router();

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

const getRestaurants = (req, res) => {
  pool.query("SELECT * FROM restaurants ORDER BY id", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

router.get("/", (req, res) => {
  res.send("Welcome to Local Lunch!");
});

router.get("/restaurants", getRestaurants);

export default router;
