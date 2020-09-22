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
    case "user/receiveLocation":
      return {
        ...state,
        isLocating: false,
        didInvalidate: false,
        userLocation: action.payload,
      };
  }
};
