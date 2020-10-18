export const FETCH_RESTAURANTS_REQUEST = "[restaurants] Fetch request";
export const FETCH_RESTAURANTS_SUCCESS = "[restaurants] Fetch success";
export const FETCH_RESTAURANTS_FAILURE = "[restaurants] Fetch failure";
export const ADD_DISTANCES = "[restaurants] Distances added";
export const INVALIDATE_RESTAURANTS = "[restaurants] Invalidate data";
export const SET_RESTAURANT_SUGGESTIONS = "[restaurants] Set suggestions";

export interface Restaurant {
  id: string;
  name: string;
  website: string | null;
  latlon: {
    x: number;
    y: number;
  };
  subtitle: string | null;
  distance: number;
}

export interface RestaurantState {
  allRestaurants: Restaurant[];
  isFetching: boolean;
  isWithDistance: boolean;
  didInvalidate: boolean;
  restaurantSuggestions: Restaurant[];
}

interface FetchRestaurantsRequestAction {
  type: typeof FETCH_RESTAURANTS_REQUEST;
}

interface FetchRestaurantsSuccessAction {
  type: typeof FETCH_RESTAURANTS_SUCCESS;
  payload: Restaurant[];
}

interface FetchRestaurantsFailureAction {
  type: typeof FETCH_RESTAURANTS_FAILURE;
  payload: string;
}

interface AddDistancesAction {
  type: typeof ADD_DISTANCES;
  payload: Restaurant[];
}

interface InvalidateRestaurantsAction {
  type: typeof INVALIDATE_RESTAURANTS;
}

interface SetRestaurantSuggestionsAction {
  type: typeof SET_RESTAURANT_SUGGESTIONS;
  payload: Restaurant[];
}

export type RestaurantActionTypes =
  | FetchRestaurantsRequestAction
  | FetchRestaurantsSuccessAction
  | FetchRestaurantsFailureAction
  | AddDistancesAction
  | InvalidateRestaurantsAction
  | SetRestaurantSuggestionsAction;
