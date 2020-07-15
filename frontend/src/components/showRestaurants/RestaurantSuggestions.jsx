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
  const [restaurantSuggestions, setRestaurantSuggestions] = useState(null);

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
      return filteredRestaurants;
    };

    const limitToRandomSuggestions = (array, number) => {
      const suffledArray = shuffle(array);
      setRestaurantSuggestions(suffledArray.splice(0, number));
    };

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    if (userLocation && !isWithDistance) {
      addDistanceToRestaurants();
      const filteredRestaurants = filterByDistance(700);
      limitToRandomSuggestions(filteredRestaurants, 3);
    }
  }, [restaurants, setRestaurants, userLocation, isWithDistance]);

  return (
    <>
      {restaurantSuggestions && (
        <Box
          id="restaurant-suggestions"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          style={{ border: "1px solid blue" }}
        >
          <Box display="flex" flexDirection="column">
            {restaurantSuggestions.map((r) => (
              <Box key={r.id}>
                <RestaurantDetails restaurant={r} />
              </Box>
            ))}
          </Box>
          <RestaurantMap
            userLocation={userLocation}
            restaurantSuggestions={restaurantSuggestions}
          />
        </Box>
      )}
    </>
  );
};

export default RestaurantSuggestions;
