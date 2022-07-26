// import React from "react";
// import { Box } from "@material-ui/core";
// import RestaurantList from "./RestaurantList";
// import RestaurantMap from "./RestaurantMap";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";

// const RestaurantSuggestions = () => {
//   const restaurantSuggestions = useSelector(
//     (state: RootState) => state.restaurants.restaurantSuggestions
//   );
//   const locationState = useSelector((state: RootState) => state.location);

//   return (
//     <>
//       <Box
//         id="restaurant-suggestions"
//         display="flex"
//         flex="1 0 auto"
//         justifyContent="center"
//         flexDirection="row"
//         flexWrap="wrap"
//       >
//         <RestaurantList
//           restaurantSuggestions={restaurantSuggestions}
//           locationState={locationState}
//         />
//         <RestaurantMap restaurantSuggestions={restaurantSuggestions} />
//       </Box>
//     </>
//   );
// };

// export default RestaurantSuggestions;

export {}
