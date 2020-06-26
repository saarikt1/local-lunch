import React, { useState, useEffect } from "react";
import axios from "axios";
import { calculateDistanceBetweenPoints } from "./utils";
import RestaurantSuggestions from "./components/RestaurantSuggestions";
import Map from "./components/Map";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    initRestaurants();
  }, []);

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
        .sort((a, b) => a.distance - b.distance);

      setRestaurants(sortedRestaurants);
      setIsSorted(true);
    };

    if (userLocation && !isSorted) {
      sortRestaurantsByDistance();
    }
  }, [restaurants, userLocation, isSorted]);

  const initRestaurants = async () => {
    const response = await axios.get("/restaurants");
    setRestaurants(response.data);
  };

  const getUserLocation = async () => {
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log(`Your position: ${lat}, ${lon}`);
      setUserLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    }

    function error() {
      console.log("Unable to retrieve your location");
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <div>
      <h1>Here are your lunch choices for today</h1>
      <button type="button" onClick={getUserLocation}>
        Locate me
      </button>
      <RestaurantSuggestions
        restaurants={restaurants}
        setRestaurants={setRestaurants}
      />
      <Map />
    </div>
  );
};

export default App;
