import axios from "axios";

const initialState = {
  allRestaurants: null,
  restaurantSuggestions: null,
  isFetching: false,
  isWithDistance: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "restaurant/invalidateRestaurants":
      return {
        ...state,
        didInvalidate: true,
      };
    case "restaurant/requestRestaurants":
      return {
        ...state,
        isFetching: true,
        isWithDistance: false,
        didInvalidate: false,
      };
    case "restaurants/receiveRestaurants":
      return {
        ...state,
        isFetching: false,
        isWithDistance: false,
        didInvalidate: false,
        allRestaurants: action.payload,
      };
    case "restaurant/addDistances":
      return {
        ...state,
        isFetching: false,
        isWithDistance: true,
        didInvalidate: false,
        allRestaurants: action.payload,
      };
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

const requestRestaurants = () => {
  return {
    type: "restaurant/requestRestaurants",
  };
};

const loadRestaurants = () => async (dispatch) => {
  const response = await axios.get("/restaurants");
  dispatch(setAllRestaurants(response.data));
};

// Set restaurants
// Get userLocation
// Then set distances
// Flag as ready
export const initData = () => {
  return async (dispatch) => {
    dispatch(requestRestaurants());
    // Here comes promise.all
    dispatch(loadRestaurants());
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
