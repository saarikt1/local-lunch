import React from "react";
import { Box } from "@material-ui/core";
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";
import { getRestaurantSuggestions } from "../../../redux/restaurant";
import { useSelector } from "react-redux";

const RestaurantSuggestions = () => {
  const restaurantState = useSelector((state) => state.restaurants);
  const locationState = useSelector((state) => state.location);
  let restaurantSuggestions = [];
  restaurantSuggestions = getRestaurantSuggestions(restaurantState);

  return (
    <>
      <Box
        id="restaurant-suggestions"
        display="flex"
        flex="1 0 auto"
        justifyContent="center"
        flexDirection="row"
        flexWrap="wrap"
      >
        <RestaurantList
          restaurantSuggestions={restaurantSuggestions}
          locationState={locationState}
        />
        <RestaurantMap restaurantSuggestions={restaurantSuggestions} />
      </Box>
    </>
  );
};

export default RestaurantSuggestions;
