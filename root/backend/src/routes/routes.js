import express from "express";
import restaurantService from "../services/restaurantService.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Local Lunch!");
});

router.get("/restaurants", restaurantService.getRestaurants);

export default router;
