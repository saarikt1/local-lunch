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
      <Container maxWidth="md" style={{ padding: "24px" }}>
        <Box
          display="flex"
          flexDirection="column"
          // alignItems="center"
          // style={{ border: "1px solid cyan" }}
        >
          <Router>
            <Header />
            {/* <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              style={{
                // border: "1px solid olive",
                padding: "10px",
                margin: "10px",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  id="locate-button"
                  variant="contained"
                  color="primary"
                  disableElevation
                  type="button"
                  onClick={() => locateUser(setUserLocation, setNotification)}
                  style={{ marginBottom: "10px" }}
                >
                  Show me my options
                </Button>
              </Link>
              <Link to="/addRestaurant" style={{ textDecoration: "none" }}>
                <Button
                  id="add-restaurant-button"
                  color="secondary"
                  onClick={() => locateUser(setUserLocation, setNotification)}
                >
                  Add a new restaurant
                </Button>
              </Link>
            </Box> */}
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
