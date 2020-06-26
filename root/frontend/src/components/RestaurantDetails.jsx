import React from "react";

function RestaurantDetails({ restaurant }) {
  return (
    <div>
      <h3>{restaurant.name}</h3>
      <a href={restaurant.web_page}>{restaurant.web_page}</a>
      {restaurant.distance && (
        <p>{restaurant.distance}&nbsp;km from your position</p>
      )}
    </div>
  );
}

export default RestaurantDetails;
