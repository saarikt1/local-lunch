import React, { useEffect } from "react";

const RestaurantForm = () => {
  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    let response = await fetch(
      "https://nominatim.openstreetmap.org/?addressdetails=1&q=tornitupa&format=json&limit=3&countrycodes=fi&extratags=1"
    );
    let data = await response.json();
    console.log(data[0].display_name);
  };

  return <div>Here is the restaurant form</div>;
};

export default RestaurantForm;
