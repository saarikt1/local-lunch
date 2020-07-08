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

  {
    /* <Switch>
    <Route path="/add-restaurant">{}</Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch> */
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="md"
        style={{ border: "1px solid red", padding: "30px" }}
      >
        <Header />
        <Box display="flex" flexDirection="row" justifyContent="center">
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
          <Button
            id="add-restaurant-button"
            variant="contained"
            color="secondary"
            disableElevation
            type="button"
            // onClick={initUserLocation}
            style={{ margin: "20px" }}
          >
            Add a new restaurant
          </Button>
        </Box>
        <Router>
          <RestaurantForm />
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
        </Router>
      </Container>
    </React.Fragment>
  );
};

function Home() {
  // return <h2>Home</h2>;
}

export default App;
