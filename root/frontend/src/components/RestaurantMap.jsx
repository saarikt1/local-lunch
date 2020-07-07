import React from "react";
import { Map, TileLayer, Marker, Popup, Tooltip, Circle } from "react-leaflet";
import { Link, Typography, Box } from "@material-ui/core";

const RestaurantMap = ({ userLocation, restaurants }) => {
  const calculateBoundingBox = (restaurants, userLocation) => {
    const northBound = restaurants.reduce(
      (max, cur) => Math.max(max, cur.latlon.x),
      userLocation.lat
    );

    const westBound = restaurants.reduce(
      (min, cur) => Math.min(min, cur.latlon.y),
      userLocation.lon
    );

    const southBound = restaurants.reduce(
      (min, cur) => Math.min(min, cur.latlon.x),
      userLocation.lat
    );

    const eastBound = restaurants.reduce(
      (max, cur) => Math.max(max, cur.latlon.y),
      userLocation.lon
    );

    // console.log(northBound, eastBound, southBound, westBound);

    return [
      [northBound, eastBound],
      [southBound, westBound],
    ];
  };

  return (
    <React.Fragment>
      <Box id="map" display="flex" justifyContent="center" margin="20px">
        <Map
          bounds={calculateBoundingBox(restaurants, userLocation)}
          boundsOptions={{ padding: [35, 35] }}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "400px" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          {userLocation && (
            <Circle center={userLocation} radius={20}>
              <Popup>
                <Typography variant="subtitle1">Your location</Typography>
              </Popup>
            </Circle>
          )}
          {restaurants &&
            restaurants.map((r) => (
              <Marker key={r.id} position={[r.latlon.x, r.latlon.y]}>
                <Tooltip permanent>{r.name}</Tooltip>
                <Popup>
                  <Typography variant="h6">{r.name}</Typography>
                  <Link href={r.web_page}>{r.web_page}</Link>
                </Popup>
              </Marker>
            ))}
        </Map>
      </Box>
    </React.Fragment>
  );
};

export default RestaurantMap;
