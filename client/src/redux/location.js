import { showNotification } from "./notification";

export const FETCH_LOCATION_REQUEST = "[location] Fetch request";
export const FETCH_LOCATION_SUCCESS = "[location] Fetch success";
export const FETCH_LOCATION_FAILURE = "[location] Fetch failure";

const initialState = {
  coordinates: null,
  isLocating: false,
  didInvalidate: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return {
        ...state,
        isLocating: true,
        didInvalidate: false,
        error: null,
      };
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        isLocating: false,
        didInvalidate: false,
        error: null,
        coordinates: action.coords,
      };
    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        isLocating: false,
        didInvalidate: false,
        error: true,
      };
    default:
      return state;
  }
};

const setLocation = (position) => {
  return {
    type: FETCH_LOCATION_SUCCESS,
    coords: {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    },
  };
};

const getPositionPromise = () => {
  const options = {
    enableHighAccuracy: false,
    maximumAge: 30000,
    timeout: 5000,
  };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const locateUser = () => async (dispatch) => {
  dispatch({ type: FETCH_LOCATION_REQUEST });
  try {
    if (!navigator.geolocation) {
      dispatch(
        showNotification(
          "Geolocation is not supported by your browser",
          "warning"
        )
      );
      throw new Error("Geolocation not supported");
    }
    const position = await getPositionPromise();
    if (position.coords.accuracy > 1000) {
      dispatch(
        showNotification(
          "Couldn't get an accurate location. Maybe try with a different browser.",
          "warning"
        )
      );
      throw new Error("Poor accuracy for location");
    } else {
      dispatch(setLocation(position));
    }
    return position;
  } catch (err) {
    dispatch({ type: FETCH_LOCATION_FAILURE });
    if (err.code === 2) {
      dispatch(showNotification("Couldn't get location.", "warning"));
      throw new Error("Location unavailable");
    }
    throw err;
  }
};

export default reducer;
