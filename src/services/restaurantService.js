import db from "../db/index.ts";
import asyncHandler from "express-async-handler";
import createError from "http-errors";

const getRestaurants = async (_req, res) => {
  const query = "SELECT * FROM restaurants ORDER BY id DESC";
  const { rows } = await db.query(query, null);
  // console.log("Rows: ", rows);

  res.status(200).json(rows);
};

const findRestaurantById = asyncHandler(async (req, res) => {
  const query = "SELECT * FROM restaurants WHERE id = $1";
  const parameters = [req.params.id];
  const { rows } = await db.query(query, parameters);

  res.status(200).json(rows);
});

const createRestaurant = asyncHandler(async (req, res) => {
  const query =
    "INSERT INTO restaurants (name, subtitle, website, latlon) VALUES ($1, $2, $3, $4)";
  const { name, subtitle, website, latlon } = req.body;
  if (!name || !latlon) {
    throw createError(400, "Missing field name or latlon");
  }

  await db.query(query, [name, subtitle, website, latlon]);
  res.status(201).send(`Restaurant ${name} added to db`);
});

export default { getRestaurants, findRestaurantById, createRestaurant };
