import Router from "express-promise-router";
import restaurantService from "../services/restaurantService.js";

const router = new Router();

router.get("/restaurants", restaurantService.getRestaurants);
router.get("/restaurants/:id", restaurantService.findRestaurantById);
router.post("/restaurants", restaurantService.createRestaurant);

export default router;
