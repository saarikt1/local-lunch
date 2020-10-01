import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import RestaurantDetails from "./RestaurantDetails";

test("renders content", () => {
  const restaurant = {
    id: "41",
    name: "Taikakattila",
    website: "http://www.taikakattila.fi/",
    latlon: {
      x: 60.2923294,
      y: 24.988834,
    },
    subtitle: "",
    distance: 12620,
  };

  const component = render(<RestaurantDetails restaurant={restaurant} />);

  expect(component.container).toHaveTextContent("Taikakattila");
  expect(component.container).toHaveTextContent("Website");
  // expect(component.container).toHaveTextContent("http://www.taikakattila.fi/");
});
