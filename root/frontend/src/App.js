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
    }

    function error() {
      status.textContent = "Unable to retrieve your location";
    }

    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <div>
      {/* {console.log(restaurants)} */}
      <h1>This is where you should go for lunch now</h1>
      {restaurants.map((r) => (
        <div key={r.id}>
          <h3>{r.name}</h3>
          <p>{r.address}</p>
          <p>{r.web_page}</p>
        </div>
      ))}
      <button id="find-me" onClick={geoFindMe}>
        Show my location
      </button>
      <br />
      <p id="status"></p>
    </div>
  );
};

export default App;
