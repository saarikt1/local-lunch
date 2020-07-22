import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: "8px 16px",
  },
  media: {
    height: 140,
  },
  bullet: {
    display: "inline-block",
    margin: "0 4px",
  },
});

const RestaurantDetails = ({ restaurant }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {restaurant.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Takeaway{bull}Big groups{bull}Fast service{bull}Buffet
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <Link href={restaurant.website}>Website</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default RestaurantDetails;
