export const FETCH_LOCATION_REQUEST = "[location] Fetch request";
export const FETCH_LOCATION_SUCCESS = "[location] Fetch success";
export const FETCH_LOCATION_FAILURE = "[location] Fetch failure";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationState {
  coordinates: Coordinates;
  isLocating: boolean;
  didInvalidate: boolean;
  error: boolean | string;
}

interface FetchLocationRequestAction {
  type: typeof FETCH_LOCATION_REQUEST;
}

export interface FetchLocationSuccessAction {
  type: typeof FETCH_LOCATION_SUCCESS;
  coords: Coordinates;
}

interface FetchLocationFailureAction {
  type: typeof FETCH_LOCATION_FAILURE;
}

export type LocationActionTypes =
  | FetchLocationRequestAction
  | FetchLocationSuccessAction
  | FetchLocationFailureAction;
