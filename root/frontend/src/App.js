import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    initRestaurants();
  }, []);

  const initRestaurants = async () => {
    const response = await axios.get("/restaurants");
    setRestaurants(response.data);
  };

  function geoFindMe() {
    const status = document.querySelector("#status");

    function success(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;

      status.textContent = `Your position: ${lat}, ${long}`;
      return position;
    }

    function error() {
      status.textContent = "Unable to retrieve your location";
      return null;
    }

    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

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
    var distance = earthRadius * c;
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div>
      {/* {console.log(restaurants)} */}
      <h1>This is where you should go for lunch now</h1>
      {/* <button id="find-me" onClick={geoFindMe}>
        Show my location
      </button> */}
      <p id="status"></p>
      {restaurants.map((r) => (
        <div key={r.id}>
          <h3>{r.name}</h3>
          <p>{r.address}</p>
          <p>{r.web_page}</p>
          <p>
            {r.latlon.x}, {r.latlon.y}
          </p>
          <p>
            Distance:&nbsp;
            {calculateDistanceBetweenPoints(
              48.1979175,
              16.3692964,
              r.latlon.x,
              r.latlon.y
            )}
            &nbsp;km
          </p>
          {geoFindMe()}
        </div>
      ))}
    </div>
  );
};

export default App;
