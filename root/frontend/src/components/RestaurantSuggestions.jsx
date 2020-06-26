import React, { useEffect, useState } from "react";
import RestaurantDetails from "./RestaurantDetails";
import { calculateDistanceBetweenPoints } from "../utils";

function RestaurantSuggestions({ restaurants, setRestaurants, userLocation }) {
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    const sortRestaurantsByDistance = () => {
      const sortedRestaurants = restaurants
        .map((r) => {
          r.distance = calculateDistanceBetweenPoints(
            userLocation.lat,
            userLocation.lon,
            r.latlon.x,
            r.latlon.y
          );
          return r;
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      setRestaurants(sortedRestaurants);
      setIsSorted(true);
    };

    if (userLocation && !isSorted) {
      sortRestaurantsByDistance();
    }
  }, [restaurants, setRestaurants, userLocation, isSorted]);

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
