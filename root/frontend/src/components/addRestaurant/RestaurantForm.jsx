import React, { useState } from "react";
import { useFormik } from "formik";
import { Box, Typography } from "@material-ui/core";
import SearchResults from "./SearchResults";
import { calculateBoundingBoxAroundLocation } from "../../utils";
import axios from "axios";

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

  const fillFormWithData = (name, subtitle, website, latlon) => {
    formikAddRestaurant.setFieldValue("name", name);
    formikAddRestaurant.setFieldValue("subtitle", subtitle);
    formikAddRestaurant.setFieldValue("website", website);
    formikAddRestaurant.setFieldValue("latlon", latlon);
  };

  const formikSearchForm = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      fetchSearchResults(JSON.stringify(values.search));
    },
  });

  const formikAddRestaurant = useFormik({
    initialValues: {
      name: "",
      subtitle: "",
      website: "",
      latlon: "",
    },
    onSubmit: async (values) => {
      const params = {
        name: values.name,
        subtitle: values.subtitle,
        website: values.website,
        latlon: `(${values.latlon})`,
      };
      const res = await axios.post("/restaurants", params);
      console.log("res.data: ", res.data);
    },
  });

  return (
    <Box>
      <Typography variant="h5">Add a new restaurant</Typography>
      <form onSubmit={formikSearchForm.handleSubmit}>
        <label htmlFor="search">Search for a restaurant to add</label>
        <input
          id="search"
          name="search"
          type="text"
          onChange={formikSearchForm.handleChange}
          value={formikSearchForm.values.search}
        />
        <button type="submit">Search</button>
      </form>
      <SearchResults
        searchResults={searchResults}
        fillFormWithData={fillFormWithData}
      />

      <Typography variant="h6">Add manually</Typography>
      <form onSubmit={formikAddRestaurant.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formikAddRestaurant.handleChange}
          value={formikAddRestaurant.values.name}
        />
        <br />
        <label htmlFor="subtitle">Specifier</label>
        <input
          id="subtitle"
          name="subtitle"
          type="text"
          onChange={formikAddRestaurant.handleChange}
          value={formikAddRestaurant.values.subtitle}
        />
        <br />
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          onChange={formikAddRestaurant.handleChange}
          value={formikAddRestaurant.values.website}
        />
        <br />
        <label htmlFor="latlon">Coordinates lat, lon</label>
        <input
          id="latlon"
          name="latlon"
          type="text"
          onChange={formikAddRestaurant.handleChange}
          value={formikAddRestaurant.values.latlon}
        />
        <br />
        <button type="submit">Add to database</button>
      </form>
    </Box>
  );
};

export default RestaurantForm;