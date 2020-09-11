import React, { useEffect, useState } from "react";
import RestaurantDetails from "./RestaurantDetails";
import { Box } from "@material-ui/core";
import RestaurantMap from "./RestaurantMap";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../reducers/notificationReducer";
import { setRestaurantSuggestions } from "../../reducers/restaurantReducer";

const RestaurantSuggestions = ({ userLocation }) => {
  const [restaurantsFound, setRestaurantsFound] = useState(true);
  const searchRadiusInMeters = 750;
  const secondarySearchRadiusInMeters = 2000;
  const restaurants = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    let isTooFewResults = false;

    const filterByDistance = (distance) => {
      let filteredRestaurants = restaurants.allRestaurants.filter(
        (r) => r.distance < distance / 1000
      );

      if (!isTooFewResults && filteredRestaurants.length < 2) {
        isTooFewResults = true;
        return filterByDistance(secondarySearchRadiusInMeters);
      }

      if (filteredRestaurants.length === 0) {
        return null;
      }
      return filteredRestaurants;
    };

    const limitToRandomSuggestions = (array, number) => {
      const suffledArray = shuffle(array);
      dispatch(setRestaurantSuggestions(suffledArray.splice(0, number)));
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

    if (
      restaurants.allRestaurants &&
      userLocation &&
      restaurants.isWithDistance
    ) {
      const filteredRestaurants = filterByDistance(searchRadiusInMeters);
      if (filteredRestaurants) {
        limitToRandomSuggestions(filteredRestaurants, 3);
      } else {
        dispatch(
          showNotification(
            "No restaurants found near your location. Try refreshing the page at a different location.",
            "error"
          )
        );
        setRestaurantsFound(false);
      }
    }
  }, [
    restaurants.allRestaurants,
    userLocation,
    restaurants.isWithDistance,
    dispatch,
  ]);

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
        {restaurantsFound && (
          <Box display="flex" flexDirection="column">
            {(restaurants.restaurantSuggestions
              ? restaurants.restaurantSuggestions
              : Array.from(new Array(3))
            ).map((r, index) => (
              <Box key={index}>
                <RestaurantDetails restaurant={r} />
              </Box>
            ))}
          </Box>
        )}
        <RestaurantMap
          userLocation={userLocation}
          restaurantSuggestions={restaurants.restaurantSuggestions}
        />
      </Box>
    </>
  );
};

export default RestaurantSuggestions;
