import React from "react";
import { Map, TileLayer } from "react-leaflet";

function RestaurantMap(props) {
  return (
    <React.Fragment>
      <div>
        <h2>Here will be a map</h2>
        <Map
          center={[60.1797517, 24.9597715]}
          zoom="14"
          style={{ height: "300px" }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Map>
      </div>
    </React.Fragment>
  );
}

export default RestaurantMap;
