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
  const [restaurantSuggestions, setRestaurantSuggestions] = useState([]);
  const [isSuggestions, setIsSuggestions] = useState(false);

  useEffect(() => {
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

    if (restaurants && userLocation && !isWithDistance) {
      // addDistanceToRestaurants();
      const filteredRestaurants = filterByDistance(700);
      limitToRandomSuggestions(filteredRestaurants, 3);
    }
  }, [restaurants, setRestaurants, userLocation, isWithDistance]);

  return (
    <>
      <Box
        id="restaurant-suggestions"
        display="flex"
        flex="1 0 auto"
        flexDirection="row"
        flexWrap="wrap"
        // style={{ border: "2px solid blue" }}
      >
        <Box display="flex" flexDirection="column">
          {restaurantSuggestions ? (
            restaurantSuggestions.map((r, index) => (
              <Box key={index}>
                <RestaurantDetails restaurant={r} />
              </Box>
            ))
          ) : (
            <div>No restaurant suggestions yet.</div>
          )}
        </Box>
        {/* <RestaurantMap
          userLocation={userLocation}
          restaurantSuggestions={restaurantSuggestions}
        /> */}
      </Box>
    </>
  );
};

export default RestaurantSuggestions;
