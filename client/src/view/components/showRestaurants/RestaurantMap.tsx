import React, { useEffect, useState, useRef } from "react";
import { Map, TileLayer, Marker, Popup, Tooltip, Circle } from "react-leaflet";
import { Link, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import * as L from "leaflet";
import { RootState } from "../../../redux/store";
import { Restaurant } from "../../../redux/restaurantTypes";

const useStyles = makeStyles({
  map: {
    width: "100%",
    minWidth: "250px",
    paddingBottom: "min(75%, 80vh)",
  },
});

type RestaurantMapProps = {
  restaurantSuggestions: Restaurant[];
};

const RestaurantMap = ({ restaurantSuggestions }: RestaurantMapProps) => {
  const initialMapView = L.latLngBounds(
    L.latLng(62.9894714, 34.558059),
    L.latLng(38.1706012, -3.976497)
  );

  const [boundingBox, setBoundingBox] = useState<L.LatLngBounds>(
    initialMapView
  );
  const map = useRef<any>();
  const classes = useStyles();
  const userCoordinates = useSelector(
    (state: RootState) => state.location.coordinates
  );

  useEffect(() => {
    map.current.leafletElement.invalidateSize();
  });

  useEffect(() => {
    const calculateBoundingBox = () => {
      if (!restaurantSuggestions) {
        setBoundingBox(
          L.latLngBounds(
            L.latLng(userCoordinates.lat, userCoordinates.lng),
            L.latLng(userCoordinates.lat, userCoordinates.lng)
          )
        );
      } else {
        const northBound = restaurantSuggestions.reduce(
          (max, cur) => Math.max(max, cur.latlon.x),
          userCoordinates.lat
        );

        const westBound = restaurantSuggestions.reduce(
          (min, cur) => Math.min(min, cur.latlon.y),
          userCoordinates.lng
        );

        const southBound = restaurantSuggestions.reduce(
          (min, cur) => Math.min(min, cur.latlon.x),
          userCoordinates.lat
        );

        const eastBound = restaurantSuggestions.reduce(
          (max, cur) => Math.max(max, cur.latlon.y),
          userCoordinates.lng
        );

        setBoundingBox(
          L.latLngBounds(
            L.latLng(northBound, eastBound),
            L.latLng(southBound, westBound)
          )
        );
      }
    };
    if (userCoordinates) {
      calculateBoundingBox();
    }
  }, [restaurantSuggestions, setBoundingBox, userCoordinates]);

  return (
    <React.Fragment>
      <Box id="map" flex="1" margin="8px">
        <Map
          ref={map}
          bounds={boundingBox}
          boundsOptions={{ padding: [35, 35] }}
          scrollWheelZoom={false}
          className={classes.map}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          {userCoordinates && (
            <Circle center={userCoordinates} radius={15}>
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
                  {r.website && <Link href={r.website}>{r.website}</Link>}
                </Popup>
              </Marker>
            ))}
        </Map>
      </Box>
    </React.Fragment>
  );
};

export default RestaurantMap;
