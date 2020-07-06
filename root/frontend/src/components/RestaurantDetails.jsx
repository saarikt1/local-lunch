import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "8px 16px",
  },
});

function RestaurantDetails({ restaurant }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">{restaurant.name}</Typography>
        <Typography variant="subtitle2">{restaurant.subtitle}</Typography>
        <Link href={restaurant.web_page}>{restaurant.web_page}</Link>
        {restaurant.distance && (
          <p>{restaurant.distance}&nbsp;km from your position</p>
        )}
      </CardContent>
    </Card>
  );
}

export default RestaurantDetails;
