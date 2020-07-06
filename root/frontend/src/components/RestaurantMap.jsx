import React from "react";
import { Map, TileLayer, Marker, Popup, Tooltip, Circle } from "react-leaflet";
import { Link, Typography, Box } from "@material-ui/core";

function RestaurantMap({ userLocation, restaurants }) {
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" margin="20px">
        <Map
          bounds={[
            [48.2145267, 16.3623032],
            [48.2121581, 16.3667853],
          ]}
          boundsOptions={{ padding: [50, 50] }}
          scrollWheelZoom={false}
          style={{ width: "90%", height: "400px" }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          />
          {userLocation && <Circle center={userLocation} radius={20}></Circle>}
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
}

export default RestaurantMap;
