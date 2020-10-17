import { Coordinates } from "./locationTypes";
import { Restaurant } from "./restaurantTypes";

export const calculateDistanceBetweenPoints = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
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
  const distanceInMeters = Number((earthRadius * c).toFixed(3)) * 1000;
  return distanceInMeters;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const calculateBoundingBoxAroundLocation = (
  userLocation: Coordinates
) => {
  // Roughly 50 km
  const offsetFromLocation = 0.45;

  const x1 = userLocation.lng - offsetFromLocation;
  const y1 = userLocation.lat - offsetFromLocation;
  const x2 = userLocation.lng + offsetFromLocation;
  const y2 = userLocation.lat + offsetFromLocation;

  return { x1, y1, x2, y2 };
};

export const shuffleArray = (array: Restaurant[]): Restaurant[] => {
  let currentIndex: number = array.length,
    temporaryValue: Restaurant,
    randomIndex: number;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};
