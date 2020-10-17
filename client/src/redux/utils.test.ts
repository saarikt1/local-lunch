import {
  calculateDistanceBetweenPoints,
  shuffleArray,
  calculateBoundingBoxAroundLocation,
} from "./utils";
import { simpleRestaurantList } from "../testData";

describe("Util functions", () => {
  it("return correct distance between two points", () => {
    expect(
      calculateDistanceBetweenPoints(60.16592, 24.94801, 60.1642929, 24.9453058)
    ).toBe(235);

    expect(
      calculateDistanceBetweenPoints(60.16592, 24.94801, 48.2176097, 16.3585271)
    ).toBe(1438528);
  });

  it("return a correctly sized bounding box around the given location", () => {
    expect(
      calculateBoundingBoxAroundLocation({
        lat: 60.16592,
        lng: 24.94801,
      })
    ).toMatchObject({
      x1: 24.49801,
      y1: 59.71592,
      x2: 25.39801,
      y2: 60.61592,
    });
  });

  it("return a properly shuffled array", () => {
    global.Math.random = () => 0.2;
    const shuffledArray = shuffleArray(simpleRestaurantList);

    expect(shuffledArray).toContainEqual(simpleRestaurantList[0]);
    expect(shuffledArray).toContainEqual(simpleRestaurantList[1]);
    expect(shuffledArray).toContainEqual(simpleRestaurantList[2]);

    expect(shuffledArray[0]).not.toMatchObject(simpleRestaurantList[0]);
    expect(shuffledArray[1]).not.toMatchObject(simpleRestaurantList[1]);
    expect(shuffledArray[2]).not.toMatchObject(simpleRestaurantList[2]);
  });
});
