import Router from "express-promise-router";
import restaurantService from "../controllers/restaurantController.js";

const router = new Router();

router.get("/", (req, res) => {
  res.send("Welcome to Local Lunch!");
});

router.get("/restaurants", restaurantService.getRestaurants);
router.get("/restaurants/:id", restaurantService.findRestaurantById);
router.post("/restaurants", restaurantService.createRestaurant);

export default router;
