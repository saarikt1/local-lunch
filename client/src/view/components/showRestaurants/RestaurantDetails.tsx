import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Link,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    maxWidth: 296,
    minWidth: 250,
    margin: "8px 8px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 4px",
  },
  skeleton: {
    marginLeft: "8px",
    marginBottom: "8px",
  },
});

interface Restaurant {
  restaurant: {
    id: number;
    name: string;
    website: string;
    latlon: {
      x: number;
      y: number;
    };
    subtitle?: string;
    distance: number;
  };
}

const RestaurantDetails = ({ restaurant }: Restaurant) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {restaurant ? restaurant.name : <Skeleton />}
        </Typography>
      </CardContent>
      <CardActions>
        {restaurant ? (
          <Button size="small" color="primary">
            {restaurant.website && (
              <Link href={restaurant.website}>Website</Link>
            )}
          </Button>
        ) : (
          <Skeleton
            variant="rect"
            width={56}
            height={22}
            className={classes.skeleton}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default RestaurantDetails;
