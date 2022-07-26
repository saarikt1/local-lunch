// import axios from "axios";
// import { restaurantReducer } from "./restaurant";
// import configureMockStore from "redux-mock-store";
// import thunk from "redux-thunk";
// import {
//   fetchRestaurants,
//   addDistanceToRestaurants,
//   filterRestaurantsByDistance,
//   setRestaurantSuggestions,
// } from "./restaurant";
// import {
//   FETCH_RESTAURANTS_REQUEST,
//   FETCH_RESTAURANTS_SUCCESS,
//   FETCH_RESTAURANTS_FAILURE,
//   ADD_DISTANCES,
//   INVALIDATE_RESTAURANTS,
//   SET_RESTAURANT_SUGGESTIONS,
// } from "./restaurantTypes";
// import {
//   userLocation,
//   restaurantList,
//   restaurantListWithDistances,
//   restaurantSuggestionsList,
// } from "../testData";
// import { SHOW_NOTIFICATION } from "./notificationTypes";
// import fetch from "jest-fetch-mock";

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// // Reducers

// describe("Restaurant reducer", () => {
//   it("should return initial state", () => {
//     expect(
//       restaurantReducer(undefined, {
//         type: FETCH_RESTAURANTS_SUCCESS,
//         payload: [],
//       })
//     ).toEqual({
//       allRestaurants: [],
//       isFetching: false,
//       isWithDistance: false,
//       didInvalidate: false,
//       restaurantSuggestions: [],
//     });
//   });

//   it(`should handle ${FETCH_RESTAURANTS_REQUEST}`, () => {
//     expect(
//       restaurantReducer(
//         {
//           allRestaurants: [],
//           isFetching: false,
//           isWithDistance: false,
//           didInvalidate: false,
//           restaurantSuggestions: [],
//         },
//         {
//           type: FETCH_RESTAURANTS_REQUEST,
//         }
//       )
//     ).toEqual({
//       allRestaurants: [],
//       isFetching: true,
//       isWithDistance: false,
//       didInvalidate: false,
//       restaurantSuggestions: [],
//     });
//   });

//   it(`should handle ${FETCH_RESTAURANTS_SUCCESS}`, () => {
//     expect(
//       restaurantReducer(
//         {
//           allRestaurants: [],
//           isFetching: true,
//           isWithDistance: false,
//           didInvalidate: false,
//           restaurantSuggestions: [],
//         },
//         {
//           type: FETCH_RESTAURANTS_SUCCESS,
//           payload: restaurantList,
//         }
//       )
//     ).toEqual({
//       allRestaurants: restaurantList,
//       isFetching: false,
//       isWithDistance: false,
//       didInvalidate: false,
//       restaurantSuggestions: [],
//     });
//   });

//   it(`should handle ${FETCH_RESTAURANTS_FAILURE}`, () => {
//     expect(
//       restaurantReducer(
//         {
//           allRestaurants: [],
//           isFetching: true,
//           isWithDistance: false,
//           didInvalidate: false,
//           restaurantSuggestions: [],
//         },
//         {
//           type: FETCH_RESTAURANTS_FAILURE,
//           payload: "Couldn't fetch restaurants",
//         }
//       )
//     ).toEqual({
//       allRestaurants: [],
//       isFetching: false,
//       isWithDistance: false,
//       didInvalidate: false,
//       restaurantSuggestions: [],
//     });
//   });

//   it(`should handle ${ADD_DISTANCES}`, () => {
//     expect(
//       restaurantReducer(
//         {
//           allRestaurants: restaurantList,
//           isFetching: true,
//           isWithDistance: false,
//           didInvalidate: false,
//           restaurantSuggestions: [],
//         },
//         {
//           type: ADD_DISTANCES,
//           payload: restaurantListWithDistances,
//         }
//       )
//     ).toEqual({
//       allRestaurants: restaurantListWithDistances,
//       isFetching: false,
//       isWithDistance: true,
//       didInvalidate: false,
//       restaurantSuggestions: [],
//     });
//   });

//   it(`should handle ${INVALIDATE_RESTAURANTS}`, () => {
//     expect(
//       restaurantReducer(
//         {
//           allRestaurants: restaurantListWithDistances,
//           isFetching: false,
//           isWithDistance: true,
//           didInvalidate: false,
//           restaurantSuggestions: [],
//         },
//         {
//           type: INVALIDATE_RESTAURANTS,
//         }
//       )
//     ).toEqual({
//       allRestaurants: restaurantListWithDistances,
//       isFetching: false,
//       isWithDistance: true,
//       didInvalidate: true,
//       restaurantSuggestions: [],
//     });
//   });

//   it(`should handle ${SET_RESTAURANT_SUGGESTIONS}`, () => {
//     expect(
//       restaurantReducer(
//         {
//           allRestaurants: restaurantListWithDistances,
//           isFetching: false,
//           isWithDistance: true,
//           didInvalidate: false,
//           restaurantSuggestions: [],
//         },
//         {
//           type: SET_RESTAURANT_SUGGESTIONS,
//           payload: restaurantSuggestionsList,
//         }
//       )
//     ).toEqual({
//       allRestaurants: restaurantListWithDistances,
//       restaurantSuggestions: restaurantSuggestionsList,
//       isFetching: false,
//       isWithDistance: true,
//       didInvalidate: false,
//     });
//   });
// });

// // Actions

// describe("Fetch restaurants", () => {
//   afterEach(() => {
//     fetch.resetMocks();
//   });

//   it("should call right actions on successful fetch", () => {
//     const response = { data: restaurantList };

//     mockedAxios.get.mockImplementationOnce(() => Promise.resolve(response));

//     const expectedActions = [
//       {
//         type: FETCH_RESTAURANTS_REQUEST,
//       },
//       {
//         type: FETCH_RESTAURANTS_SUCCESS,
//         payload: response.data,
//       },
//     ];

//     const store = mockStore({
//       allRestaurants: [],
//       isFetching: false,
//       isWithDistance: false,
//       didInvalidate: false,
//     });

//     return store.dispatch<any>(fetchRestaurants()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });

//   it("should give an error on fetch failure", () => {
//     const errorMessage = "Network Error";

//     mockedAxios.get.mockImplementationOnce(() =>
//       Promise.reject(new Error(errorMessage))
//     );

//     const expectedActions = [
//       {
//         type: FETCH_RESTAURANTS_REQUEST,
//       },
//       {
//         type: FETCH_RESTAURANTS_FAILURE,
//         payload: "Couldn't fetch restaurants",
//       },
//     ];

//     const store = mockStore({
//       allRestaurants: [],
//       isFetching: false,
//       isWithDistance: false,
//       didInvalidate: false,
//     });

//     return store.dispatch<any>(fetchRestaurants()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions);
//     });
//   });
// });

// describe("addDistanceToRestaurants", () => {
//   it("adds the correct distances to the restaurant list", () => {
//     const expectedActions = [
//       {
//         type: ADD_DISTANCES,
//         payload: restaurantListWithDistances,
//       },
//     ];

//     const store = mockStore({
//       restaurants: {
//         allRestaurants: restaurantList,
//         isFetching: false,
//         isWithDistance: false,
//         didInvalidate: false,
//       },
//       location: {
//         coordinates: userLocation,
//         isLocating: false,
//         didInvalidate: false,
//       },
//     });

//     store.dispatch<any>(addDistanceToRestaurants());
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });

// describe("filterRestaurantsByDistance", () => {
//   it("cuts off the right restaurants with given parameter", () => {
//     expect(
//       filterRestaurantsByDistance(restaurantListWithDistances, 100)
//     ).toEqual([
//       {
//         id: "33",
//         name: "Capperi",
//         website: "https://capperi.fi/keskusta/",
//         latlon: {
//           x: 60.1660073,
//           y: 24.9471702,
//         },
//         subtitle: "Keskusta",
//         distance: 47,
//       },
//     ]);

//     expect(
//       filterRestaurantsByDistance(restaurantListWithDistances, 150)
//     ).toEqual([
//       {
//         id: "37",
//         name: "Paisano",
//         website: "https://www.paisano.fi/",
//         latlon: {
//           x: 60.1665682,
//           y: 24.9460262,
//         },
//         subtitle: "",
//         distance: 131,
//       },
//       {
//         id: "33",
//         name: "Capperi",
//         website: "https://capperi.fi/keskusta/",
//         latlon: {
//           x: 60.1660073,
//           y: 24.9471702,
//         },
//         subtitle: "Keskusta",
//         distance: 47,
//       },
//       {
//         id: "22",
//         name: "The Cock",
//         website: "https://thecock.fi/",
//         latlon: {
//           x: 60.1655559,
//           y: 24.9498892,
//         },
//         subtitle: "",
//         distance: 112,
//       },
//     ]);
//   });

//   it("returns empty list if there are no matches", () => {
//     expect(
//       filterRestaurantsByDistance(restaurantListWithDistances, 10)
//     ).toEqual([]);
//   });
// });

// describe("setRestaurantSuggestions", () => {
//   it("should call setRestaurantSuggestions with correct data", () => {
//     global.Math.random = () => 0.2;
//     const expectedActions = [
//       {
//         type: SET_RESTAURANT_SUGGESTIONS,
//         payload: restaurantSuggestionsList,
//       },
//     ];

//     const store = mockStore({
//       restaurants: {
//         allRestaurants: restaurantListWithDistances,
//         isFetching: false,
//         isWithDistance: true,
//         didInvalidate: false,
//       },
//     });

//     store.dispatch<any>(setRestaurantSuggestions());
//     expect(store.getActions()).toEqual(expectedActions);
//   });

//   it("should call showNotification when there are no suggestions", () => {
//     const expectedActions = [
//       {
//         type: SHOW_NOTIFICATION,
//         data: {
//           msg: "No restaurants found near your location.",
//           notificationType: "warning",
//           open: true,
//         },
//       },
//       {
//         type: SET_RESTAURANT_SUGGESTIONS,
//         payload: [],
//       },
//     ];

//     const store = mockStore({
//       restaurants: {
//         allRestaurants: [],
//         isFetching: false,
//         isWithDistance: true,
//         didInvalidate: false,
//       },
//     });

//     store.dispatch<any>(setRestaurantSuggestions());
//     expect(store.getActions()).toEqual(expectedActions);
//   });
// });

export {}
