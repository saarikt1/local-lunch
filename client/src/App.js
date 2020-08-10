import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import RestaurantSuggestions from "./components/showRestaurants/RestaurantSuggestions";
import Header from "./components/Header";
import { Container, Box } from "@material-ui/core";
import RestaurantForm from "./components/addRestaurant/RestaurantForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notification from "./components/Notification";
import { calculateDistanceBetweenPoints } from "./utils";

const App = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isWithDistance, setIsWithDistance] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const initRestaurants = async () => {
      const response = await axios.get("/restaurants");
      setRestaurants(response.data);
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

        setNotification(null);
        setUserLocation(coordinates);
        setIsWithDistance(false);
      }

      function error() {
        setNotification({
          message: "Location is needed to show the restaurant suggestions.",
          type: "error",
        });
      }

      if (!navigator.geolocation) {
        setNotification({
          message: "Geolocation is not supported by your browser",
          type: "error",
        });
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    };

    locateUser();
  }, []);

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

    if (userLocation && restaurants && !isWithDistance) {
      addDistanceToRestaurants();
    }
  }, [userLocation, restaurants, isWithDistance]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={{ padding: "24px" }}>
        <Box display="flex" flexDirection="column">
          <Router>
            <Header />
            <Switch>
              <Route path="/addRestaurant">
                <RestaurantForm userLocation={userLocation} />
              </Route>
              <Route path="/">
                <Notification notification={notification} />
                <RestaurantSuggestions
                  restaurants={restaurants}
                  setRestaurants={setRestaurants}
                  userLocation={userLocation}
                  isWithDistance={isWithDistance}
                  setNotification={setNotification}
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
