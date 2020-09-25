import { showNotification } from "./notification";

const initialState = {
  userLocation: null,
  isLocating: false,
  didInvalidate: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "user/requestLocation":
      return {
        ...state,
        isLocating: true,
        didInvalidate: false,
      };
    case "user/setLocation":
      return {
        ...state,
        isLocating: false,
        didInvalidate: false,
        userLocation: action.coords,
      };
    default:
      return state;
  }
};

const requestLocation = () => {
  return {
    type: "user/requestLocation",
  };
};

const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const setLocation = (position) => {
  return {
    type: "user/setLocation",
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
