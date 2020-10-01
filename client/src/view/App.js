import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import RestaurantSuggestions from "./components/showRestaurants/RestaurantSuggestions";
import Header from "./components/Header";
import { Container, Box } from "@material-ui/core";
import RestaurantForm from "./components/addRestaurant/RestaurantForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notification from "./components/Notification";
import { initData } from "../redux";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    padding: "24px",
  },
});

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(initData());
  }, [dispatch]);

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
                <RestaurantForm />
              </Route>
              <Route path="/">
                <RestaurantSuggestions />
              </Route>
            </Switch>
          </Router>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default App;
