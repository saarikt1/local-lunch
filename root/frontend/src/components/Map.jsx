import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";

function RestaurantMap({ userLocation }) {
  return (
    <React.Fragment>
      <div>
        <Map
          center={[60.1797517, 24.9597715]}
          zoom="14"
          style={{ width: "100%", height: "400px" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          {userLocation && <Marker position={userLocation}></Marker>}
        </Map>
      </div>
    </React.Fragment>
  );
}

export default RestaurantMap;
