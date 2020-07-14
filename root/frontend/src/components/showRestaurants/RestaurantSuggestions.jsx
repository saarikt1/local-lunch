import React, { useEffect, useState } from "react";
import RestaurantDetails from "./RestaurantDetails";
import { calculateDistanceBetweenPoints } from "../../utils";
import { Box } from "@material-ui/core";
import RestaurantMap from "./RestaurantMap";

const RestaurantSuggestions = ({
  restaurants,
  setRestaurants,
  userLocation,
}) => {
  const [isWithDistance, setIsWithDistance] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
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
    setIsFiltered,
    setFilteredRestaurants,
  ]);

  return (
    <Box
      id="restaurant-suggestions"
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      style={{ border: "1px solid blue" }}
    >
      <Box display="flex" flexDirection="column">
        {filteredRestaurants.map((r) => (
          <Box key={r.id}>
            <RestaurantDetails restaurant={r} />
          </Box>
        ))}
      </Box>
      <RestaurantMap
        userLocation={userLocation}
        filteredRestaurants={filteredRestaurants}
        isFiltered={isFiltered}
      />
    </Box>
  );
};

export default RestaurantSuggestions;
