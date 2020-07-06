import React from "react";
import { Map, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { Link, Typography } from "@material-ui/core";

function RestaurantMap({ userLocation, restaurants }) {
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
          {restaurants &&
            restaurants.map((r) => (
              <Marker position={[r.latlon.x, r.latlon.y]}>
                <Tooltip permanent>{r.name}</Tooltip>
                <Popup>
                  <Typography variant="h6">{r.name}</Typography>
                  <Link href={r.web_page}>{r.web_page}</Link>
                </Popup>
              </Marker>
            ))}
        </Map>
      </div>
    </React.Fragment>
  );
}

export default RestaurantMap;
