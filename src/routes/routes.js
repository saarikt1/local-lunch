import Router from "express-promise-router";
import restaurantService from "../services/restaurantService.js";

const router = new Router();

router.get("/restaurants", restaurantService.getRestaurants);
router.get("/restaurants/:id", restaurantService.findRestaurantById);
router.post("/restaurants", restaurantService.createRestaurant);

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

export default router;
