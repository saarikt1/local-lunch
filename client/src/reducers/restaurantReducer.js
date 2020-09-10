const initialState = {
  allRestaurants: null,
  restaurantSuggestions: null,
  isWithDistance: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "restaurant/setAllRestaurants":
      return {
        ...state,
        allRestaurants: action.payload.restaurants,
      };
    case "restaurant/setRestaurantSuggestions":
      return {
        ...state,
        restaurantSuggestions: action.payload.restaurants,
      };
    case "restaurant/setIsWithDistance":
      return {
        ...state,
        isWithDistance: action.payload.isWithDistance,
      };
    default:
      return state;
  }
};

export const setIsWithDistance = (isWithDistance) => {
  return {
    type: "restaurant/setIsWithDistance",
    payload: isWithDistance,
  };
};

export const setAllRestaurants = (restaurants) => {
  return {
    type: "restaurant/setAllRestaurants",
    payload: restaurants,
  };
};

export const setRestaurantSuggestions = (restaurants) => {
  return {
    type: "restaurant/setRestaurantSuggestions",
    payload: restaurants,
  };
};

export default reducer;
