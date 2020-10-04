import {
  calculateDistanceBetweenPoints,
  shuffleArray,
  calculateBoundingBoxAroundLocation,
} from "./utils";

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
        lon: 24.94801,
      })
    ).toMatchObject({
      x1: 24.49801,
      y1: 59.71592,
      x2: 25.39801,
      y2: 60.61592,
    });
  });

  it("return a properly shuffled array", () => {
    const array = [
      {
        id: "41",
        name: "Taikakattila",
      },
      {
        id: "37",
        name: "Paisano",
      },
      {
        id: "27",
        name: "Väinö Kallio",
      },
    ];

    global.Math.random = () => 0.2;
    const shuffledArray = shuffleArray(array);

    expect(shuffledArray).toContainEqual({ id: "41", name: "Taikakattila" });
    expect(shuffledArray).toContainEqual({ id: "37", name: "Paisano" });
    expect(shuffledArray).toContainEqual({ id: "27", name: "Väinö Kallio" });

    expect(shuffledArray[0]).not.toMatchObject({
      id: "41",
      name: "Taikakattila",
    });

    expect(shuffledArray[1]).not.toMatchObject({
      id: "37",
      name: "Paisano",
    });

    expect(shuffledArray[2]).not.toMatchObject({
      id: "27",
      name: "Väinö Kallio",
    });
  });
});
