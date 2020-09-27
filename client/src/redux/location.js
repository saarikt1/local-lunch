import { showNotification } from "./notification";

const REQUEST_LOCATION = "[location] Geolocation request";
const SET_LOCATION = "[location] Set location";

const initialState = {
  coordinates: null,
  isLocating: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOCATION:
      return {
        ...state,
        isLocating: true,
        didInvalidate: false,
      };
    case SET_LOCATION:
      return {
        ...state,
        isLocating: false,
        didInvalidate: false,
        coordinates: action.coords,
      };
    default:
      return state;
  }
};

const requestLocation = () => {
  return {
    type: REQUEST_LOCATION,
  };
};

const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const setLocation = (position) => {
  return {
    type: SET_LOCATION,
    coords: {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    },
  };
};

export const locateUser = () => async (dispatch) => {
  if (!navigator.geolocation) {
    dispatch(
      showNotification(
        "Geolocation is not supported by your browser",
        "warning"
      )
    );
    throw new Error("Geolocation not supported");
  }
  dispatch(requestLocation());
  try {
    const position = await getCurrentPosition();
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
    throw err;
  }
};

export default reducer;
