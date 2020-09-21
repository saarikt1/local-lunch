import axios from "axios";

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
        allRestaurants: action.payload,
      };
    case "restaurant/setRestaurantSuggestions":
      return {
        ...state,
        restaurantSuggestions: action.payload,
      };
    case "restaurant/setIsWithDistance":
      return {
        ...state,
        isWithDistance: action.payload,
      };
    default:
      return state;
  }
};

export const initData = () => {
  // Set restaurants
  // Get userLocation
  // Then set distances
  // Flag as ready
  return async (dispatch) => {
    const response = await axios.get("/restaurants");
    dispatch({
      type: "restaurant/setAllRestaurants",
      payload: response.data,
    });
  };
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
