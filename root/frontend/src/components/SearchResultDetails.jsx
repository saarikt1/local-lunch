import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Card, CardContent, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "8px 16px",
  },
});

const SearchResultDetails = ({ searchResult }) => {
  const classes = useStyles();

  const name = searchResult.address.amenity;
  const website = searchResult.extratags.website;
  // const addressLine1 = [
  //   searchResult.address.road,
  //   " ",
  //   searchResult.address.house_number,
  // ].join("");

  // const addressLine2 = [
  //   searchResult.address.postcode,
  //   " ",
  //   searchResult.address.city || searchResult.address.town,
  //   ", ",
  //   searchResult.address.country,
  // ].join("");

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Link href={website}>{website}</Link>
        {/* <Typography variant="body1">
          {addressLine1}
          <br />
          {addressLine2}
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default SearchResultDetails;
