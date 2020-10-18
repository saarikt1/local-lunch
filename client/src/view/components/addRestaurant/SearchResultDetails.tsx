import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Card, CardContent, Typography, Button } from "@material-ui/core";
import { SearchResult, FormData } from "./RestaurantFormTypes";

const useStyles = makeStyles({
  root: {
    margin: "8px 16px",
  },
});

type SearchResultDetailsProps = {
  searchResult: SearchResult;
  fillFormWithData: FormData;
};

const SearchResultDetails = ({
  searchResult,
  fillFormWithData,
}: SearchResultDetailsProps) => {
  const classes = useStyles();

  const name = searchResult.address.amenity;
  const subtitle = "";
  const website = searchResult.extratags.website || "";
  const latlon = `${searchResult.lat},${searchResult.lng}`;
  const addressLine1 = [
    searchResult.address.road,
    " ",
    searchResult.address.house_number,
  ].join("");

  const addressLine2 = [
    searchResult.address.postcode,
    " ",
    searchResult.address.city || searchResult.address.town,
    ", ",
    searchResult.address.country,
  ].join("");

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Link href={website}>{website}</Link>
        <Typography variant="body1">
          {addressLine1}
          <br />
          {addressLine2}
        </Typography>
        <br />
        <Button
          color="primary"
          onClick={() => fillFormWithData(name, subtitle, website, latlon)}
        >
          Fill the data
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchResultDetails;
