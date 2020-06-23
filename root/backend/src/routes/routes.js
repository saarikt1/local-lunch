import express from "express";
import restaurantService from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Local Lunch!");
});

router.get("/restaurants", restaurantService.getRestaurants);

router.get("/restaurants/:id", restaurantService.findRestaurantById);

export default router;
