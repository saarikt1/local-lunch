export const calculateDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInMeters = (earthRadius * c).toFixed(3) * 1000;
  return distanceInMeters;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const calculateBoundingBoxAroundLocation = (userLocation) => {
  // Roughly 50 km
  const offsetFromLocation = 0.45;

  const x1 = userLocation.lon - offsetFromLocation;
  const y1 = userLocation.lat - offsetFromLocation;
  const x2 = userLocation.lon + offsetFromLocation;
  const y2 = userLocation.lat + offsetFromLocation;

  return { x1, y1, x2, y2 };
};
