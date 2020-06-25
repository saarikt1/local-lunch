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

export default { getRestaurants, findRestaurantById };
