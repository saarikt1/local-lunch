import React, { useEffect, useState, useRef } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip, Circle } from "react-leaflet";
import { Link, Typography, Box } from "@material-ui/core";

const RestaurantMap = ({ userLocation, restaurantSuggestions }) => {
  const initialMapView = [
    [62.9894714, 34.558059],
    [38.1706012, -3.976497],
  ];
  const [boundingBox, setBoundingBox] = useState(initialMapView);
  const map = useRef();

  useEffect(() => {
    map.current.leafletElement.invalidateSize();
  });

  useEffect(() => {
    const calculateBoundingBox = () => {
      if (!restaurantSuggestions) {
        setBoundingBox([
          [userLocation.lat, userLocation.lon],
          [userLocation.lat, userLocation.lon],
        ]);
      } else {
        const northBound = restaurantSuggestions.reduce(
          (max, cur) => Math.max(max, cur.latlon.x),
          userLocation.lat
        );

        const westBound = restaurantSuggestions.reduce(
          (min, cur) => Math.min(min, cur.latlon.y),
          userLocation.lon
        );

        const southBound = restaurantSuggestions.reduce(
          (min, cur) => Math.min(min, cur.latlon.x),
          userLocation.lat
        );

        const eastBound = restaurantSuggestions.reduce(
          (max, cur) => Math.max(max, cur.latlon.y),
          userLocation.lon
        );

        setBoundingBox([
          [northBound, eastBound],
          [southBound, westBound],
        ]);
      }
    };
    if (userLocation) {
      calculateBoundingBox();
    }
  }, [restaurantSuggestions, setBoundingBox, userLocation]);

  return (
    <React.Fragment>
      <Box
        id="map"
        flex="1"
        margin="8px"
        // style={{ border: "1px dashed olive" }}
      >
        <Map
          ref={map}
          useFlyTo="true"
          bounds={boundingBox}
          boundsOptions={{ padding: [35, 35] }}
          scrollWheelZoom={false}
          style={{
            width: "100%",
            minWidth: "250px",
            paddingBottom: "min(75%, 80vh)",
          }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          {userLocation && (
            <Circle center={userLocation} radius={15}>
              <Popup>
                <Typography variant="subtitle1">Your location</Typography>
              </Popup>
            </Circle>
          )}
          {restaurantSuggestions &&
            restaurantSuggestions.map((r) => (
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
