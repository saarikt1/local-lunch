import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Box, Typography } from "@material-ui/core";
import SearchResults from "./SearchResults";
import { calculateBoundingBoxAroundLocation } from "../../utils";
import axios from "axios";

const RestaurantForm = ({ userLocation }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [initialFormValues, setInitialFormValues] = useState({
    name: "",
    subtitle: "",
    website: "",
    latlon: "",
  });

  const fetchSearchResults = async (searchQuery) => {
    const { x1, y1, x2, y2 } = calculateBoundingBoxAroundLocation(userLocation);

    const response = await fetch(
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
    setInitialFormValues({
      name: name,
      subtitle: subtitle,
      website: website,
      latlon: latlon,
    });
  };

  return (
    <Box>
      <Typography variant="h5">Add a new restaurant</Typography>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={(values, { resetForm }) => {
          fetchSearchResults(JSON.stringify(values.search));
          resetForm({ values: "" });
        }}
      >
        <Form>
          <label htmlFor="search">
            Search for a restaurant from Open Street Map data
          </label>
          <Field name="search" type="text" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      <SearchResults
        searchResults={searchResults}
        fillFormWithData={fillFormWithData}
      />

      <Typography variant="h6">Add manually</Typography>
      <Formik
        enableReinitialize={true}
        initialValues={initialFormValues}
        onSubmit={async (values, { resetForm }) => {
          const params = {
            name: values.name,
            subtitle: values.subtitle,
            website: values.website,
            latlon: `(${values.latlon})`,
          };
          await axios.post("/restaurants", params);
          resetForm({ values: "" });
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />

          <label htmlFor="subtitle">Specifier</label>
          <Field name="subtitle" type="text" />

          <label htmlFor="website">Website</label>
          <Field name="website" type="text" />

          <label htmlFor="latlon">Coordinates lat, lon</label>
          <Field name="latlon" type="text" />
          <button type="submit">Add restaurant</button>
        </Form>
      </Formik>
    </Box>
  );
};

export default RestaurantForm;
