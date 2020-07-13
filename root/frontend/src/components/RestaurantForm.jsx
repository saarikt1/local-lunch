import React, { useState } from "react";
import { useFormik } from "formik";
import { Box } from "@material-ui/core";
import SearchResults from "./SearchResults";
import { calculateBoundingBoxAroundLocation } from "../utils";

const RestaurantForm = ({ userLocation }) => {
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async (searchQuery) => {
    const { x1, y1, x2, y2 } = calculateBoundingBoxAroundLocation(userLocation);
    console.log("Bounding box: ", x1, y1, x2, y2);

    let response = await fetch(
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${searchQuery}&format=json&limit=5&viewbox=${x1},${y1},${x2},${y2}&extratags=1&bounded=1`
    );
    let data = await response.json();
    if (data.length) {
      console.log(data);
      setSearchResults(data);
    } else {
      alert("No search results found");
    }
  };

  const formikSearch = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      fetchSearchResults(JSON.stringify(values.search));
    },
  });

  return (
    <Box>
      <h3>Add a new restaurant</h3>
      <form onSubmit={formikSearch.handleSubmit}>
        <label htmlFor="search">Search for a restaurant to add</label>
        <input
          id="search"
          name="search"
          type="text"
          onChange={formikSearch.handleChange}
          value={formikSearch.values.search}
        />
        <button type="submit">Search</button>
      </form>
      <SearchResults searchResults={searchResults} />
    </Box>
  );
};

export default RestaurantForm;
