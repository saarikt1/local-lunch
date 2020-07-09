import React, { useState } from "react";
import { useFormik } from "formik";
import { Box } from "@material-ui/core";
import SearchResults from "./SearchResults";

const RestaurantForm = () => {
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async (searchQuery) => {
    let response = await fetch(
      `https://nominatim.openstreetmap.org/?addressdetails=1&q=${searchQuery}&format=json&limit=3&countrycodes=fi&extratags=1`
    );
    let data = await response.json();
    if (data.length) {
      console.log(data);
      setSearchResults(data);
    } else {
      alert("No search results found");
    }
  };

  const formik = useFormik({
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
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="search">Search for a restaurant to add</label>
        <input
          id="search"
          name="search"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.search}
        />
        <button type="submit">Search</button>
      </form>
      <SearchResults searchResults={searchResults} />
    </Box>
  );
};

export default RestaurantForm;
