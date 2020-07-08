export const calculateDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
  var earthRadius = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = (earthRadius * c).toFixed(2);
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const locateUser = (setUserLocation) => {
  function success(position) {
    const coordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    console.log("User location: ", coordinates);
    setUserLocation(coordinates);
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
  }
};
