import db from "../db/index.js";

const getRestaurants = (req, res) => {
  db.query("SELECT * FROM restaurants ORDER BY id", null, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

export default { getRestaurants };
