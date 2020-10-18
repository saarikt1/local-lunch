import axios from "axios";
import { showNotification } from "./notification";
import { calculateDistanceBetweenPoints, shuffleArray } from "./utils";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";
import { Action } from "redux";
import {
  FETCH_RESTAURANTS_FAILURE,
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  ADD_DISTANCES,
  INVALIDATE_RESTAURANTS,
  SET_RESTAURANT_SUGGESTIONS,
  Restaurant,
  RestaurantState,
  RestaurantActionTypes,
} from "./restaurantTypes";

const initialState: RestaurantState = {
  allRestaurants: [],
  isFetching: false,
  isWithDistance: false,
  didInvalidate: false,
  restaurantSuggestions: [],
};

export const restaurantReducer = (
  state = initialState,
  action: RestaurantActionTypes
): RestaurantState => {
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
    case SET_RESTAURANT_SUGGESTIONS:
      return {
        ...state,
        restaurantSuggestions: action.payload,
      };
    default:
      return state;
  }
};

export const fetchRestaurants = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch({ type: FETCH_RESTAURANTS_REQUEST });

  try {
    const response = await axios.get("/restaurants");
    response.data.forEach((element: Restaurant) => {
      element.distance = 0;
    });
    dispatch({ type: FETCH_RESTAURANTS_SUCCESS, payload: response.data });
    return response;
  } catch (err) {
    dispatch({
      type: FETCH_RESTAURANTS_FAILURE,
      payload: "Couldn't fetch restaurants",
    });
  }
};

export const addDistanceToRestaurants = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => (dispatch, getState) => {
  const { restaurants, location } = getState();
  const restaurantsWithDistances = restaurants.allRestaurants.map(
    (r: Restaurant) => {
      r.distance = calculateDistanceBetweenPoints(
        location.coordinates.lat,
        location.coordinates.lng,
        r.latlon.x,
        r.latlon.y
      );
      return r;
    }
  );
  dispatch({
    type: ADD_DISTANCES,
    payload: restaurantsWithDistances,
  });
};

export const filterRestaurantsByDistance = (
  restaurants: Restaurant[],
  distance: number
): Restaurant[] => {
  return restaurants.filter((r) => r.distance < distance);
};

export const setRestaurantSuggestions = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => (dispatch, getState) => {
  const { restaurants } = getState();

  let restaurantSuggestions = [];

  // Distance cutoff
  restaurantSuggestions = filterRestaurantsByDistance(
    restaurants.allRestaurants,
    750
  );

  // Randomize
  restaurantSuggestions = shuffleArray(restaurantSuggestions);

  // Pick three
  restaurantSuggestions = restaurantSuggestions.splice(0, 3);
  if (restaurantSuggestions.length === 0) {
    dispatch(
      showNotification("No restaurants found near your location.", "warning")
    );
  }
  dispatch({
    type: SET_RESTAURANT_SUGGESTIONS,
    payload: restaurantSuggestions,
  });
};
