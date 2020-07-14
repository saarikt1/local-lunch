import React from "react";
import { Map, TileLayer, Marker, Popup, Tooltip, Circle } from "react-leaflet";
import { Link, Typography, Box } from "@material-ui/core";

const RestaurantMap = ({ userLocation, filteredRestaurants, isFiltered }) => {
  const calculateBoundingBox = (filteredRestaurants, userLocation) => {
    if (!isFiltered) {
      return null;
    }
    const northBound = filteredRestaurants.reduce(
      (max, cur) => Math.max(max, cur.latlon.x),
      userLocation.lat
    );

    const westBound = filteredRestaurants.reduce(
      (min, cur) => Math.min(min, cur.latlon.y),
      userLocation.lon
    );

    const southBound = filteredRestaurants.reduce(
      (min, cur) => Math.min(min, cur.latlon.x),
      userLocation.lat
    );

    const eastBound = filteredRestaurants.reduce(
      (max, cur) => Math.max(max, cur.latlon.y),
      userLocation.lon
    );

    filteredRestaurants.map((r) => console.log(r.latlon));

    console.log("Bounding box: ", northBound, eastBound, southBound, westBound);

    return [
      [northBound, eastBound],
      [southBound, westBound],
    ];
  };

  return (
    <React.Fragment>
      <Box id="map" flex="1" margin="20px">
        <Map
          bounds={calculateBoundingBox(filteredRestaurants, userLocation)}
          boundsOptions={{ padding: [35, 35] }}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "500px" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          {userLocation && (
            <Circle center={userLocation} radius={15}>
              <Popup>
                <Typography variant="subtitle1">Your location</Typography>
              </Popup>
            </Circle>
          )}
          {filteredRestaurants &&
            filteredRestaurants.map((r) => (
              <Marker key={r.id} position={[r.latlon.x, r.latlon.y]}>
                <Tooltip permanent>{r.name}</Tooltip>
                <Popup>
                  <Typography variant="h6">{r.name}</Typography>
                  <Link href={r.website}>{r.website}</Link>
                </Popup>
              </Marker>
            ))}
        </Map>
      </Box>
    </React.Fragment>
  );
};

export default RestaurantMap;
