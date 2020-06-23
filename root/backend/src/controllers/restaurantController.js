import db from "../db/index.js";

const getRestaurants = (req, res) => {
  const query = "SELECT * FROM restaurants ORDER BY id";

  db.query(query, null, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const findRestaurantById = (req, res) => {
  const query = "SELECT * FROM restaurants WHERE id = $1";
  const parameters = [req.params.id];

  db.query(query, parameters, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

export default { getRestaurants, findRestaurantById };
