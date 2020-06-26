import React from "react";
import RestaurantDetails from "./RestaurantDetails";

function RestaurantSuggestions({ restaurants }) {
  return (
    <div>
      {restaurants.map((r) => (
        <div key={r.id}>
          <RestaurantDetails restaurant={r} />
        </div>
      ))}
    </div>
  );
}

export default RestaurantSuggestions;
