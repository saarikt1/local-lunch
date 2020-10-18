import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import RestaurantList from "./RestaurantList";
import { userLocation } from "../../../testData";

describe("<RestaurantList />", () => {
  it("renders all children", () => {
    const locationState = {
      coordinates: userLocation,
      isLocating: false,
      didInvalidate: false,
      error: false,
    };

    const restaurantSuggestions = [
      {
        id: "41",
        name: "Taikakattila",
        website: "http://www.taikakattila.fi/",
        latlon: {
          x: 60.2923294,
          y: 24.988834,
        },
        subtitle: "",
        distance: 12620,
      },
      {
        id: "37",
        name: "Paisano",
        website: "https://www.paisano.fi/",
        latlon: {
          x: 60.1665682,
          y: 24.9460262,
        },
        subtitle: "",
        distance: 1438775,
      },
      {
        id: "27",
        name: "Väinö Kallio",
        website: "https://www.vainokallio.fi/",
        latlon: {
          x: 60.1832531,
          y: 24.9588485,
        },
        subtitle: "",
        distance: 1440752,
      },
    ];

    render(
      <RestaurantList
        restaurantSuggestions={restaurantSuggestions}
        locationState={locationState}
      />
    );

    expect(screen.getByText(/Taikakattila/)).toBeInTheDocument();
    expect(screen.getByText(/Paisano/)).toBeInTheDocument();
    expect(screen.getByText(/Väinö Kallio/)).toBeInTheDocument();
  });
});
