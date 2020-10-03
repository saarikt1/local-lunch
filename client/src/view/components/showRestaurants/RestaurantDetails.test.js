import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import RestaurantDetails from "./RestaurantDetails";

describe("<RestaurantDetails />", () => {
  test("renders restaurant name and website link", () => {
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

    expect(screen.getByText(/Taikakattila/)).toBeInTheDocument();
    expect(screen.getByText(/website/i)).toBeInTheDocument();
  });

  test("doesn't render website link if no website", () => {
    const restaurant = {
      id: "41",
      name: "Taikakattila",
      website: null,
      latlon: {
        x: 60.2923294,
        y: 24.988834,
      },
      subtitle: "",
      distance: 12620,
    };

    const component = render(<RestaurantDetails restaurant={restaurant} />);

    expect(screen.getByText(/Taikakattila/)).toBeInTheDocument();
    expect(screen.queryByText(/website/i)).toBeNull();
  });
});
