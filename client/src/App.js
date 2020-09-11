import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import RestaurantSuggestions from "./components/showRestaurants/RestaurantSuggestions";
import Header from "./components/Header";
import { Container, Box } from "@material-ui/core";
import RestaurantForm from "./components/addRestaurant/RestaurantForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notification from "./components/Notification";
import { calculateDistanceBetweenPoints } from "./utils";
import { showNotification } from "./reducers/notificationReducer";
import {
  setAllRestaurants,
  setIsWithDistance,
} from "./reducers/restaurantReducer";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    padding: "24px",
  },
});

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [isWithDistance, setIsWithDistances] = useState(false);

  const restaurants = useSelector((state) => state.restaurants.allRestaurants);

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    const initRestaurants = async () => {
      const response = await axios.get("/restaurants");
      dispatch(setAllRestaurants(response.data));
    };

    initRestaurants();
  }, []);

  useEffect(() => {
    const locateUser = () => {
      function success(position) {
        const coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        setUserLocation(coordinates);
        setIsWithDistance(false);
      }

      function error(err) {
        console.log(`ERROR(${err.code}): ${err.message}`);
        dispatch(
          showNotification(
            "Location is needed to show the restaurant suggestions.",
            "warning"
          )
        );
        dispatch(
          showNotification(
            "Location is needed to show the restaurant suggestions.",
            "warning"
          )
        );
      }

      if (!navigator.geolocation) {
        dispatch(
          showNotification(
            "Geolocation is not supported by your browser",
            "warning"
          )
        );
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    };

    locateUser();
  }, [dispatch]);

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
      dispatch(setAllRestaurants(restaurantsWithDistances));
      setIsWithDistances(true);
      dispatch(setIsWithDistance(true));
    };

    if (userLocation && restaurants && !isWithDistance) {
      addDistanceToRestaurants();
    }
  }, [userLocation, restaurants, isWithDistance]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Box display="flex" flexDirection="column">
          <Router>
            <Header />
            <Notification />
            <Switch>
              <Route path="/addRestaurant">
                <RestaurantForm userLocation={userLocation} />
              </Route>
              <Route path="/">
                <RestaurantSuggestions
                  restaurants={restaurants}
                  userLocation={userLocation}
                  isWithDistance={isWithDistance}
                />
              </Route>
            </Switch>
          </Router>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default App;
