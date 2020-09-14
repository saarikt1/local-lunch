import React from "react";
import RestaurantDetails from "./RestaurantDetails";
import { Box } from "@material-ui/core";

const RestaurantList = ({ restaurantSuggestions }) => {
  return (
    <Box display="flex" flexDirection="column">
      {(restaurantSuggestions
        ? restaurantSuggestions
        : Array.from(new Array(3))
      ).map((r, index) => (
        <Box key={index}>
          <RestaurantDetails restaurant={r} />
        </Box>
      ))}
    </Box>
  );
};

export default RestaurantList;
