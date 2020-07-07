import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import RestaurantSuggestions from "./components/RestaurantSuggestions";
import RestaurantMap from "./components/RestaurantMap";
import { Button, Container, Typography, Box } from "@material-ui/core";

const App = () => {
  const [restaurants, setRestaurants] = useState();
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const initRestaurants = async () => {
      const response = await axios.get("/restaurants");
      setRestaurants(response.data);
    };

    initRestaurants();
  }, []);

  const getUserLocation = async () => {
    function success(position) {
      console.log("User located");
      setUserLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    }

    function error() {
      console.log("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" style={{ border: "1px solid red" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Local lunch
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Here's the help you need to choose where to go for lunch today.
        </Typography>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            disableElevation
            type="button"
            onClick={getUserLocation}
          >
            Show me my options
          </Button>
        </Box>
        {userLocation && (
          <Box style={{ border: "1px solid blue" }}>
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
