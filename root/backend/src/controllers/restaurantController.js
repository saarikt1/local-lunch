import db from "../db/index.js";

const getRestaurants = async (req, res) => {
  const query = "SELECT * FROM restaurants ORDER BY id DESC";
  const { rows } = await db.query(query, null);

  res.status(200).json(rows);
};

const findRestaurantById = async (req, res) => {
  const query = "SELECT * FROM restaurants WHERE id = $1";
  const parameters = [req.params.id];
  const { rows } = await db.query(query, parameters);

  res.status(200).json(rows);
};

const createRestaurant = async (req, res) => {
  const query =
    "INSERT INTO restaurants (name, subtitle, web_page, latlon) VALUES ($1, $2, $3, $4)";
  const { name, subtitle, website, latlon } = req.body;
  try {
    await db.query(query, [name, subtitle, website, latlon]);
    res.status(201).send(`Restaurant ${name} added to db`);
  } catch (err) {
    throw err;
  }
};

export default { getRestaurants, findRestaurantById, createRestaurant };
