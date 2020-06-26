import React from "react";
import { Link } from "@material-ui/core";

function RestaurantDetails({ restaurant }) {
  return (
    <div>
      <h3>{restaurant.name}</h3>
      <Link href={restaurant.web_page}>{restaurant.web_page}</Link>
      {restaurant.distance && (
        <p>{restaurant.distance}&nbsp;km from your position</p>
      )}
    </div>
  );
}

export default RestaurantDetails;
