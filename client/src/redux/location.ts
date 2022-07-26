// import { showNotification } from "./notification";
// import { ThunkAction } from "redux-thunk";
// import { RootState } from "./store";
// import { Action } from "redux";
// import {
//   FETCH_LOCATION_REQUEST,
//   FETCH_LOCATION_SUCCESS,
//   FETCH_LOCATION_FAILURE,
//   LocationActionTypes,
//   LocationState,
//   FetchLocationSuccessAction,
// } from "./locationTypes";

// const initialState: LocationState = {
//   coordinates: { lat: 60.16592, lng: 24.94801 },
//   isLocating: false,
//   didInvalidate: false,
//   error: false,
// };

// export const locationReducer = (
//   state = initialState,
//   action: LocationActionTypes
// ): LocationState => {
//   switch (action.type) {
//     case FETCH_LOCATION_REQUEST:
//       return {
//         ...state,
//         isLocating: true,
//         didInvalidate: false,
//         error: false,
//       };
//     case FETCH_LOCATION_SUCCESS:
//       return {
//         ...state,
//         isLocating: false,
//         didInvalidate: false,
//         error: false,
//         coordinates: action.coords,
//       };
//     case FETCH_LOCATION_FAILURE:
//       return {
//         ...state,
//         isLocating: false,
//         didInvalidate: false,
//         error: true,
//       };
//     default:
//       return state;
//   }
// };

// const setLocation = (position: Position): FetchLocationSuccessAction => {
//   return {
//     type: FETCH_LOCATION_SUCCESS,
//     coords: {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     },
//   };
// };

// const getPositionPromise = (): Promise<Position> => {
//   const options = {
//     enableHighAccuracy: false,
//     maximumAge: 30000,
//     timeout: 5000,
//   };
//   return new Promise<Position>((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject, options);
//   });
// };

// export const locateUser = (): ThunkAction<
//   void,
//   RootState,
//   unknown,
//   Action<string>
// > => async (dispatch) => {
//   dispatch({ type: FETCH_LOCATION_REQUEST });
//   try {
//     if (!navigator.geolocation) {
//       dispatch(
//         showNotification(
//           "Geolocation is not supported by your browser",
//           "warning"
//         )
//       );
//       throw new Error("Geolocation not supported");
//     }
//     const position = await getPositionPromise();
//     if (position.coords.accuracy > 1000) {
//       dispatch(
//         showNotification(
//           "Couldn't get an accurate location. Maybe try with a different browser.",
//           "warning"
//         )
//       );
//       throw new Error("Poor accuracy for location");
//     } else {
//       dispatch(setLocation(position));
//     }
//     return position;
//   } catch (err) {
//     dispatch({ type: FETCH_LOCATION_FAILURE });
//     if (err.code === 2) {
//       dispatch(showNotification("Couldn't get location.", "warning"));
//       throw new Error("Location unavailable");
//     }
//     throw err;
//   }
// };

export {}
