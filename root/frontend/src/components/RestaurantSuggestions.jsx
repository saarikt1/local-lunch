import React, { useEffect, useState } from "react";
import RestaurantDetails from "./RestaurantDetails";
import { calculateDistanceBetweenPoints } from "../utils";
import { Box } from "@material-ui/core";

const RestaurantSuggestions = ({
  restaurants,
  setRestaurants,
  userLocation,
}) => {
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    const sortRestaurantsByDistance = () => {
      const sortedRestaurants = restaurants
        .map((r) => {
          r.distance = calculateDistanceBetweenPoints(
            userLocation.lat,
            userLocation.lon,
            r.latlon.x,
            r.latlon.y
          );
          return r;
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setRestaurants(sortedRestaurants);
      setIsSorted(true);
    };

    if (userLocation && !isSorted) {
      sortRestaurantsByDistance();
    }
  }, [restaurants, setRestaurants, userLocation, isSorted]);

  return (
    <Box
      id="restaurant-suggestions"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
    >
      {restaurants.map((r) => (
        <Box flex="0 1 300px" key={r.id}>
          <RestaurantDetails restaurant={r} />
        </Box>
      ))}
    </Box>
  );
};

export default RestaurantSuggestions;
