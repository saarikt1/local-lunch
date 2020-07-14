import React, { useEffect, useState } from "react";
import RestaurantDetails from "./RestaurantDetails";
import { calculateDistanceBetweenPoints } from "../utils";
import { Box } from "@material-ui/core";

const RestaurantSuggestions = ({
  restaurants,
  setRestaurants,
  filteredRestaurants,
  setFilteredRestaurants,
  userLocation,
}) => {
  const [isWithDistance, setIsWithDistance] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    // const sortRestaurantsByDistance = () => {
    //   const sortedRestaurants = restaurants.map((r) => {
    //     r.distance = calculateDistanceBetweenPoints(
    //       userLocation.lat,
    //       userLocation.lon,
    //       r.latlon.x,
    //       r.latlon.y
    //     );
    //     return r;
    //   });
    //   // .sort((a, b) => a.distance - b.distance);
    //   // .slice(0, 3);

    //   setRestaurants(sortedRestaurants);
    //   setIsWithDistance(true);

    const addDistanceToRestaurants = () => {
      const restaurantsWithDistances = restaurants.map((r) => {
        r.distance = calculateDistanceBetweenPoints(
          userLocation.lat,
          userLocation.lon,
          r.latlon.x,
          r.latlon.y
        );
        return r;
      });

      setRestaurants(restaurantsWithDistances);
      setIsWithDistance(true);
    };

    const filterByDistance = (distance) => {
      const filteredRestaurants = restaurants.filter(
        (r) => r.distance < distance / 1000
      );
      setFilteredRestaurants(filteredRestaurants);
      setIsFiltered(true);
    };

    if (userLocation && !isWithDistance && !isFiltered) {
      addDistanceToRestaurants();
      filterByDistance(700);
    }
  }, [
    restaurants,
    setRestaurants,
    userLocation,
    isWithDistance,
    isFiltered,
    setFilteredRestaurants,
  ]);

  return (
    <Box
      id="restaurant-suggestions"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
    >
      {filteredRestaurants.map((r) => (
        <Box key={r.id}>
          <RestaurantDetails restaurant={r} />
        </Box>
      ))}
    </Box>
  );
};

export default RestaurantSuggestions;
