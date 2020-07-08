import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import RestaurantSuggestions from "./components/RestaurantSuggestions";
import RestaurantMap from "./components/RestaurantMap";
import { Button, Container, Typography, Box } from "@material-ui/core";
import RestaurantForm from "./components/RestaurantForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getUserLocation } from "./utils";

const App = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const initRestaurants = async () => {
      const response = await axios.get("/restaurants");
      setRestaurants(response.data);
    };

    initRestaurants();
  }, []);

  const initUserLocation = async () => {
    const position = await getUserLocation();

    const coordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };
    console.log("User location: ", coordinates);
    setUserLocation(coordinates);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="md"
        style={{ border: "1px solid red", padding: "30px" }}
      >
        <Typography id="page-header" variant="h4" align="center" gutterBottom>
          Local Lunch
        </Typography>
        <Typography
          id="subtitle"
          variant="subtitle1"
          align="center"
          gutterBottom
        >
          Here's the help you need to choose where to go for lunch today.
        </Typography>
        <RestaurantForm />
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Button
            id="locate-button"
            variant="contained"
            color="primary"
            disableElevation
            type="button"
            onClick={initUserLocation}
            style={{ margin: "20px" }}
          >
            Show me my options
          </Button>
          <Button
            id="add-restaurant-button"
            variant="contained"
            color="secondary"
            disableElevation
            type="button"
            onClick={initUserLocation}
            style={{ margin: "20px" }}
          >
            Add a new restaurant
          </Button>
        </Box>
        {userLocation && (
          <Box
            display="flex"
            flexDirection="row"
            style={{ border: "1px solid blue" }}
          >
            <RestaurantSuggestions
              restaurants={restaurants}
              setRestaurants={setRestaurants}
              userLocation={userLocation}
            />
            <RestaurantMap
              userLocation={userLocation}
              restaurants={restaurants}
            />
          </Box>
        )}
      </Container>
    </React.Fragment>
  );
};

export default App;
