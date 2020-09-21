import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import RestaurantList from "./RestaurantList";
import RestaurantMap from "./RestaurantMap";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../reducers/notificationReducer";
import { setRestaurantSuggestions } from "../../reducers/restaurantReducer";

const RestaurantSuggestions = ({ userLocation }) => {
  const restaurants = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();
  const primarySearchRadiusInMeters = 750;
  const numberOfSuggestions = 3;

  useEffect(() => {
    const createRestaurantSuggestions = () => {
      const filteredByDistance = filterRestaurantsByDistance(
        restaurants.allRestaurants,
        primarySearchRadiusInMeters
      );

      const suffledArray = shuffleArray(filteredByDistance);

      const topItems = suffledArray.splice(0, numberOfSuggestions);

      dispatch(setRestaurantSuggestions(topItems));
    };

    if (
      restaurants.allRestaurants &&
      userLocation &&
      restaurants.isWithDistance
    ) {
      createRestaurantSuggestions();
    }
    // let filteredRestaurants;

    // const limitToRandomSuggestions = (array, numberOfSuggestions) => {
    //   const suffledArray = shuffleArray(array);
    //   dispatch(
    //     setRestaurantSuggestions(suffledArray.splice(0, numberOfSuggestions))
    //   );
    // };

    // if (
    //   restaurants.allRestaurants &&
    //   userLocation &&
    //   restaurants.isWithDistance
    // ) {
    //   filteredRestaurants = filterRestaurantsByDistance(
    //     restaurants.allRestaurants,
    //     primarySearchRadiusInMeters
    //   );
    //   if (filteredRestaurants) {
    //     limitToRandomSuggestions(filteredRestaurants, 3);
    //   } else {
    //     dispatch(
    //       showNotification(
    //         "No restaurants found near your location. Try refreshing the page at a different location.",
    //         "error"
    //       )
    //     );
    //   }
    // }
  }, [restaurants.allRestaurants, userLocation, restaurants.isWithDistance]);

  const filterRestaurantsByDistance = (restaurants, distance) => {
    const filteredRestaurants = restaurants.filter(
      (r) => r.distance < distance
    );

    if (filteredRestaurants.length === 0) {
      dispatch(
        showNotification(
          "No restaurants found near your location. Try refreshing the page at a different location.",
          "error"
        )
      );
    }

    return filteredRestaurants;
  };

  function shuffleArray(array) {
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
        <RestaurantList />
        <RestaurantMap userLocation={userLocation} />
      </Box>
    </>
  );
};

export default RestaurantSuggestions;
