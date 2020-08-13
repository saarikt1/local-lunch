import Router from "express-promise-router";
import restaurantService from "../services/restaurantService.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = new Router();

router.get("/restaurants", restaurantService.getRestaurants);
router.get("/restaurants/:id", restaurantService.findRestaurantById);
router.post("/restaurants", restaurantService.createRestaurant);

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
  console.log("Path:", path.join(__dirname, "../../build", "index.html"));
});

export default router;
