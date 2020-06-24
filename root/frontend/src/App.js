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
    </div>
  );
};

export default App;
