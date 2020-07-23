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
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth: 300,
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
          {restaurant ? restaurant.name : <Skeleton />}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {restaurant ? (
            <>
              Takeaway{bull}Big groups{bull}Fast service{bull}Buffet
            </>
          ) : (
            <Skeleton width="60%" />
          )}
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
            style={{ marginLeft: "8px", marginBottom: "8px" }}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default RestaurantDetails;
