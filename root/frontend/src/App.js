import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantSuggestions from "./components/RestaurantSuggestions";
import Map from "./components/Map";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const initRestaurants = async () => {
      const response = await axios.get("/restaurants");
      setRestaurants(response.data);
    };

    initRestaurants();
  }, []);

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
        userLocation={userLocation}
      />
      <Map />
    </div>
  );
};

export default App;
