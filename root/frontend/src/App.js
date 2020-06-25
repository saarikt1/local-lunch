import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    initRestaurants();
  }, []);

  useEffect(() => {
    addDistanceToRestaurants();
  }, [userLocation]);

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

  const addDistanceToRestaurants = () => {
    const restaurantsWithDistances = restaurants.map((r) => {
      r.distance = calculateDistanceBetweenPoints(
        userLocation.lat,
        userLocation.lon,
        r.latlon.x,
        r.latlon.y
      );
      return r;
    });

    setRestaurants(restaurantsWithDistances);
  };

  function calculateDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
    var earthRadius = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = (earthRadius * c).toFixed(2);
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div>
      <h1>This is where you should go for lunch now</h1>
      <button type="button" onClick={getUserLocation}>
        Locate me
      </button>
      <div>
        {restaurants.map((r) => (
          <div key={r.id}>
            <h3>{r.name}</h3>
            <p>{r.address}</p>
            <p>{r.web_page}</p>
            <p>
              {r.latlon.x}, {r.latlon.y}
            </p>
            {r.distance && <p>Distance:&nbsp;{r.distance}&nbsp;km</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
