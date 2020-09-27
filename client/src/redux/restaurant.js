import axios from "axios";
import { locateUser } from "./location";
import { calculateDistanceBetweenPoints } from "./utils";

// Action types

const REQUEST_RESTAURANTS = "[restaurants] API request";
const RECEIVE_RESTAURANTS = "[restaurants] Fetch success";
const ADD_DISTANCES = "[restaurants] Distances added";
const SET_RESTAURANTSUGGESTIONS = "[restaurants] Set suggestions";
const INVALIDATE_RESTAURANTS = "[restaurants] Invalidate data";

const initialState = {
  allRestaurants: null,
  restaurantSuggestions: null,
  isFetching: false,
  isWithDistance: false,
  didInvalidate: false,
};

// Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_RESTAURANTS:
      return {
        ...state,
        isFetching: true,
        isWithDistance: false,
        didInvalidate: false,
      };
    case RECEIVE_RESTAURANTS:
      return {
        ...state,
        isFetching: false,
        isWithDistance: false,
        didInvalidate: false,
        allRestaurants: action.payload,
      };
    case ADD_DISTANCES:
      return {
        ...state,
        isFetching: false,
        isWithDistance: true,
        didInvalidate: false,
        allRestaurants: action.payload,
      };
    case SET_RESTAURANTSUGGESTIONS:
      return {
        ...state,
        restaurantSuggestions: action.payload,
      };
    case INVALIDATE_RESTAURANTS:
      return {
        ...state,
        didInvalidate: true,
      };
    default:
      return state;
  }
};

// Actions

const requestRestaurants = () => {
  return {
    type: REQUEST_RESTAURANTS,
  };
};

const receiveRestaurants = (restaurants) => {
  return {
    type: RECEIVE_RESTAURANTS,
    payload: restaurants,
  };
};

const loadRestaurants = () => async (dispatch) => {
  try {
    const response = await axios.get("/restaurants");
    dispatch(receiveRestaurants(response.data));
    return response;
  } catch (err) {
    throw new Error("Couldn't get restaurants.");
  }
};

const addDistanceToRestaurants = () => (dispatch, getState) => {
  const { restaurants, location } = getState();
  const restaurantsWithDistances = restaurants.allRestaurants.map((r) => {
    r.distance = calculateDistanceBetweenPoints(
      location.coordinates.lat,
      location.coordinates.lon,
      r.latlon.x,
      r.latlon.y
    );
    return r;
  });
  dispatch({
    type: ADD_DISTANCES,
    payload: restaurantsWithDistances,
  });
};

export const setRestaurantSuggestions = (restaurants) => {
  return {
    type: SET_RESTAURANTSUGGESTIONS,
    payload: restaurants,
  };
};

// Operations

export const initData = () => {
  return async (dispatch) => {
    dispatch(requestRestaurants());
    try {
      await Promise.all([dispatch(locateUser()), dispatch(loadRestaurants())]);
      dispatch(addDistanceToRestaurants());
    } catch (err) {
      console.error(err);
    }
  };
};

export default reducer;
