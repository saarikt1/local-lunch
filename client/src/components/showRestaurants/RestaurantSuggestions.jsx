import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../reducers/notificationReducer";
import { setRestaurantSuggestions } from "../../reducers/restaurantReducer";

const RestaurantSuggestions = ({ userLocation }) => {
  const [restaurantsFound, setRestaurantsFound] = useState(true);
  const restaurants = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  const primarySearchRadiusInMeters = 750;
  const secondarySearchRadiusInMeters = 2000;

  useEffect(() => {
    const limitToRandomSuggestions = (array, numberOfSuggestions) => {
      const suffledArray = shuffle(array);
      dispatch(
        setRestaurantSuggestions(suffledArray.splice(0, numberOfSuggestions))
      );
    };

    if (
      restaurants.allRestaurants &&
      userLocation &&
      restaurants.isWithDistance
    ) {
      const filteredRestaurants = filterRestaurantsByDistance(
        restaurants.allRestaurants,
        primarySearchRadiusInMeters
      );
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

  const filterRestaurantsByDistance = (restaurants, distance) => {
    let filteredRestaurants = restaurants.filter((r) => r.distance < distance);

    return filteredRestaurants;
  };

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

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
        {restaurantsFound && <RestaurantList />}
        <RestaurantMap userLocation={userLocation} />
      </Box>
    </>
  );
};

export default RestaurantSuggestions;
