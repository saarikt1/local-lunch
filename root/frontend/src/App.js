import React, { useState, useEffect } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import RestaurantSuggestions from "./components/RestaurantSuggestions";
import Header from "./components/Header";
import RestaurantMap from "./components/RestaurantMap";
import { Button, Container, Box } from "@material-ui/core";
import RestaurantForm from "./components/RestaurantForm";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { locateUser } from "./utils";

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

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="md"
        style={{ border: "1px solid red", padding: "30px" }}
      >
        <Router>
          <Header />
          <Box display="flex" flexDirection="row" justifyContent="center">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                id="locate-button"
                variant="contained"
                color="primary"
                disableElevation
                type="button"
                onClick={() => locateUser(setUserLocation)}
                style={{ margin: "20px" }}
              >
                Show me my options
              </Button>
            </Link>
            <Link to="/addRestaurant" style={{ textDecoration: "none" }}>
              <Button
                id="add-restaurant-button"
                variant="contained"
                color="secondary"
                disableElevation
                type="button"
                style={{ margin: "20px" }}
              >
                Add a new restaurant
              </Button>
            </Link>
          </Box>
          <Switch>
            <Route path="/addRestaurant">
              <RestaurantForm />
            </Route>
            <Route path="/">
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
            </Route>
          </Switch>
        </Router>
      </Container>
    </React.Fragment>
  );
};

export default App;
