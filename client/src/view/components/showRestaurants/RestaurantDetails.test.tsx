// import React from "react";
// import "@testing-library/jest-dom/extend-expect";
// import { render } from "@testing-library/react";
// import RestaurantDetails from "./RestaurantDetails";

// describe("<RestaurantDetails />", () => {
//   test("renders restaurant name and website link", () => {
//     const restaurant = {
//       id: "41",
//       name: "Taikakattila",
//       website: "http://www.taikakattila.fi/",
//       latlon: {
//         x: 60.2923294,
//         y: 24.988834,
//       },
//       subtitle: "",
//       distance: 12620,
//     };

//     const { getByText } = render(<RestaurantDetails restaurant={restaurant} />);

//     const linkElement = getByText(/website/i) as HTMLAnchorElement;

//     expect(getByText(/Taikakattila/)).toBeInTheDocument();
//     expect(linkElement).toBeInTheDocument();
//     expect(linkElement.href).toBe("http://www.taikakattila.fi/");
//   });

//   test("doesn't render website link if no website", () => {
//     const restaurant = {
//       id: "41",
//       name: "Taikakattila",
//       website: null,
//       latlon: {
//         x: 60.2923294,
//         y: 24.988834,
//       },
//       subtitle: "",
//       distance: 12620,
//     };

//     const { getByText, queryByText } = render(
//       <RestaurantDetails restaurant={restaurant} />
//     );

//     expect(getByText(/Taikakattila/)).toBeInTheDocument();
//     expect(queryByText(/website/i)).toBeNull();
//   });
// });

export {}
