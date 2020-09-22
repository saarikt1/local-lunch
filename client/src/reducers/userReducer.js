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

// TODO error handling
const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

const requestLocation = () => {
  return {
    type: "user/requestLocation",
  };
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
  dispatch(requestLocation());
  try {
    const position = await getCurrentPosition();
    dispatch(setLocation(position));
  } catch (err) {
    console.error(err);
  }
};

export default reducer;
