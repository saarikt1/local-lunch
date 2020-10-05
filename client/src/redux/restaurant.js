import axios from "axios";
import { calculateDistanceBetweenPoints, shuffleArray } from "./utils";

export const FETCH_RESTAURANTS_REQUEST = "[restaurants] Fetch request";
export const FETCH_RESTAURANTS_SUCCESS = "[restaurants] Fetch success";
export const FETCH_RESTAURANTS_FAILURE = "[restaurants] Fetch failure";
export const ADD_DISTANCES = "[restaurants] Distances added";
export const INVALIDATE_RESTAURANTS = "[restaurants] Invalidate data";

const initialState = {
  allRestaurants: null,
  isFetching: false,
  isWithDistance: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANTS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isWithDistance: false,
        didInvalidate: false,
      };
    case FETCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isWithDistance: false,
        didInvalidate: false,
        allRestaurants: action.payload,
      };
    case FETCH_RESTAURANTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isWithDistance: false,
        didInvalidate: false,
      };
    case ADD_DISTANCES:
      return {
        ...state,
        isFetching: false,
        isWithDistance: true,
        didInvalidate: false,
        allRestaurants: action.payload,
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

export const fetchRestaurants = () => async (dispatch) => {
  dispatch({ type: FETCH_RESTAURANTS_REQUEST });

  try {
    const response = await axios.get("/restaurants");
    dispatch({ type: FETCH_RESTAURANTS_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({
      type: FETCH_RESTAURANTS_FAILURE,
      payload: "Couldn't fetch restaurants",
    });
  }
};

export const addDistanceToRestaurants = () => (dispatch, getState) => {
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

export const filterRestaurantsByDistance = (restaurants, distance) => {
  return restaurants.filter((r) => r.distance < distance);
};

export const getRestaurantSuggestions = (restaurantState) => {
  if (!restaurantState.isWithDistance) {
    return;
  }

  let restaurantSuggestions = [];

  // Distance cutoff
  restaurantSuggestions = filterRestaurantsByDistance(
    restaurantState.allRestaurants,
    750
  );

  // Randomize
  restaurantSuggestions = shuffleArray(restaurantSuggestions);

  // Pick three
  restaurantSuggestions = restaurantSuggestions.splice(0, 3);

  return restaurantSuggestions;
};

export default reducer;
