import React from "react";
import RestaurantDetails from "./RestaurantDetails";
import { Box } from "@material-ui/core";
import { useSelector } from "react-redux";

const RestaurantList = () => {
  const restaurantSuggestions = useSelector(
    (state) => state.restaurants.restaurantSuggestions
  );
  const emptyArray = Array.from(new Array(3));

  return (
    <Box display="flex" flexDirection="column">
      {(restaurantSuggestions || emptyArray).map((r, index) => (
        <Box key={index}>
          <RestaurantDetails restaurant={r} />
        </Box>
      ))}
    </Box>
  );
};

export default RestaurantList;
