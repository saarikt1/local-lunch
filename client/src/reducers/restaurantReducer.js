import axios from "axios";
import { locateUser } from "./userReducer";
import { calculateDistanceBetweenPoints } from "../utils";

const initialState = {
  allRestaurants: null,
  restaurantSuggestions: null,
  isFetching: false,
  isWithDistance: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "restaurant/requestRestaurants":
      return {
        ...state,
        isFetching: true,
        isWithDistance: false,
        didInvalidate: false,
      };
    case "restaurant/receiveRestaurants":
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
    case "restaurant/setRestaurantSuggestions":
      return {
        ...state,
        restaurantSuggestions: action.payload,
      };
    case "restaurant/invalidateRestaurants":
      return {
        ...state,
        didInvalidate: true,
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

const receiveRestaurants = (restaurants) => {
  return {
    type: "restaurant/receiveRestaurants",
    payload: restaurants,
  };
};

const loadRestaurants = () => async (dispatch) => {
  const response = await axios.get("/restaurants");
  dispatch(receiveRestaurants(response.data));
};

const addDistanceToRestaurants = () => (dispatch, getState) => {
  const { restaurants, user } = getState();
  const restaurantsWithDistances = restaurants.allRestaurants.map((r) => {
    r.distance = calculateDistanceBetweenPoints(
      user.userLocation.lat,
      user.userLocation.lon,
      r.latlon.x,
      r.latlon.y
    );
    return r;
  });
  dispatch({
    type: "restaurant/addDistances",
    payload: restaurantsWithDistances,
  });
};

// TODO error handling
export const initData = () => {
  return async (dispatch) => {
    dispatch(requestRestaurants());
    await Promise.all([dispatch(locateUser()), dispatch(loadRestaurants())]);
    dispatch(addDistanceToRestaurants());
  };
};

export const setRestaurantSuggestions = (restaurants) => {
  return {
    type: "restaurant/setRestaurantSuggestions",
    payload: restaurants,
  };
};

export default reducer;
