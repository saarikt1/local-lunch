import axios from "axios";
import reducer from "./restaurant";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  FETCH_RESTAURANTS_REQUEST,
  FETCH_RESTAURANTS_SUCCESS,
  FETCH_RESTAURANTS_FAILURE,
  ADD_DISTANCES,
  INVALIDATE_RESTAURANTS,
  SET_RESTAURANT_SUGGESTIONS,
  fetchRestaurants,
  addDistanceToRestaurants,
  filterRestaurantsByDistance,
  setRestaurantSuggestions,
} from "./restaurant";
import {
  userLocation,
  restaurantList,
  restaurantListWithDistances,
  restaurantSuggestionsList,
} from "../testData";
import { SHOW_NOTIFICATION } from "./notification";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock("axios");

// Reducers

describe("Restaurant reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      allRestaurants: null,
      isFetching: false,
      isWithDistance: false,
      didInvalidate: false,
    });
  });

  it(`should handle ${FETCH_RESTAURANTS_REQUEST}`, () => {
    expect(
      reducer(
        {
          allRestaurants: null,
          isFetching: false,
          isWithDistance: false,
          didInvalidate: false,
        },
        {
          type: FETCH_RESTAURANTS_REQUEST,
        }
      )
    ).toEqual({
      allRestaurants: null,
      isFetching: true,
      isWithDistance: false,
      didInvalidate: false,
    });
  });

  it(`should handle ${FETCH_RESTAURANTS_SUCCESS}`, () => {
    expect(
      reducer(
        {
          allRestaurants: null,
          isFetching: true,
          isWithDistance: false,
          didInvalidate: false,
        },
        {
          type: FETCH_RESTAURANTS_SUCCESS,
          payload: restaurantList,
        }
      )
    ).toEqual({
      allRestaurants: restaurantList,
      isFetching: false,
      isWithDistance: false,
      didInvalidate: false,
    });
  });

  it(`should handle ${FETCH_RESTAURANTS_FAILURE}`, () => {
    expect(
      reducer(
        {
          allRestaurants: null,
          isFetching: true,
          isWithDistance: false,
          didInvalidate: false,
        },
        {
          type: FETCH_RESTAURANTS_FAILURE,
        }
      )
    ).toEqual({
      allRestaurants: null,
      isFetching: false,
      isWithDistance: false,
      didInvalidate: false,
    });
  });

  it(`should handle ${ADD_DISTANCES}`, () => {
    expect(
      reducer(
        {
          allRestaurants: restaurantList,
          isFetching: true,
          isWithDistance: false,
          didInvalidate: false,
        },
        {
          type: ADD_DISTANCES,
          payload: restaurantListWithDistances,
        }
      )
    ).toEqual({
      allRestaurants: restaurantListWithDistances,
      isFetching: false,
      isWithDistance: true,
      didInvalidate: false,
    });
  });

  it(`should handle ${INVALIDATE_RESTAURANTS}`, () => {
    expect(
      reducer(
        {
          allRestaurants: restaurantListWithDistances,
          isFetching: false,
          isWithDistance: true,
          didInvalidate: false,
        },
        {
          type: INVALIDATE_RESTAURANTS,
        }
      )
    ).toEqual({
      allRestaurants: restaurantListWithDistances,
      isFetching: false,
      isWithDistance: true,
      didInvalidate: true,
    });
  });

  it(`should handle ${SET_RESTAURANT_SUGGESTIONS}`, () => {
    expect(
      reducer(
        {
          allRestaurants: restaurantListWithDistances,
          isFetching: false,
          isWithDistance: true,
          didInvalidate: false,
        },
        {
          type: SET_RESTAURANT_SUGGESTIONS,
          payload: restaurantSuggestionsList,
        }
      )
    ).toEqual({
      allRestaurants: restaurantListWithDistances,
      restaurantSuggestions: restaurantSuggestionsList,
      isFetching: false,
      isWithDistance: true,
      didInvalidate: false,
    });
  });
});

// Actions

describe("Fetch restaurants", () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it("should call right actions on successful fetch", () => {
    const response = { data: restaurantList };

    axios.get.mockImplementationOnce(() => Promise.resolve(response));

    const expectedActions = [
      {
        type: FETCH_RESTAURANTS_REQUEST,
      },
      {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: response.data,
      },
    ];

    const store = mockStore({
      allRestaurants: null,
      isFetching: false,
      isWithDistance: false,
      didInvalidate: false,
    });

    return store.dispatch(fetchRestaurants()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should give an error on fetch failure", () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    const expectedActions = [
      {
        type: FETCH_RESTAURANTS_REQUEST,
      },
      {
        type: FETCH_RESTAURANTS_FAILURE,
        payload: "Couldn't fetch restaurants",
      },
    ];

    const store = mockStore({
      allRestaurants: null,
      isFetching: false,
      isWithDistance: false,
      didInvalidate: false,
    });

    return store.dispatch(fetchRestaurants()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("addDistanceToRestaurants", () => {
  it("adds the correct distances to the restaurant list", () => {
    const expectedActions = [
      {
        type: ADD_DISTANCES,
        payload: restaurantListWithDistances,
      },
    ];

    const store = mockStore({
      restaurants: {
        allRestaurants: restaurantList,
        isFetching: false,
        isWithDistance: false,
        didInvalidate: false,
      },
      location: {
        coordinates: userLocation,
        isLocating: false,
        didInvalidate: false,
      },
    });

    store.dispatch(addDistanceToRestaurants());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe("filterRestaurantsByDistance", () => {
  it("cuts off the right restaurants with given parameter", () => {
    expect(
      filterRestaurantsByDistance(restaurantListWithDistances, 100)
    ).toEqual([
      {
        id: "33",
        name: "Capperi",
        website: "https://capperi.fi/keskusta/",
        latlon: {
          x: 60.1660073,
          y: 24.9471702,
        },
        subtitle: "Keskusta",
        distance: 47,
      },
    ]);

    expect(
      filterRestaurantsByDistance(restaurantListWithDistances, 150)
    ).toEqual([
      {
        id: "37",
        name: "Paisano",
        website: "https://www.paisano.fi/",
        latlon: {
          x: 60.1665682,
          y: 24.9460262,
        },
        subtitle: "",
        distance: 131,
      },
      {
        id: "33",
        name: "Capperi",
        website: "https://capperi.fi/keskusta/",
        latlon: {
          x: 60.1660073,
          y: 24.9471702,
        },
        subtitle: "Keskusta",
        distance: 47,
      },
      {
        id: "22",
        name: "The Cock",
        website: "https://thecock.fi/",
        latlon: {
          x: 60.1655559,
          y: 24.9498892,
        },
        subtitle: "",
        distance: 112,
      },
    ]);
  });

  it("returns empty list if there are no matches", () => {
    expect(
      filterRestaurantsByDistance(restaurantListWithDistances, 10)
    ).toEqual([]);
  });
});

describe("setRestaurantSuggestions", () => {
  it("should call setRestaurantSuggestions with correct data", () => {
    global.Math.random = () => 0.2;
    const expectedActions = [
      {
        type: SET_RESTAURANT_SUGGESTIONS,
        payload: restaurantSuggestionsList,
      },
    ];

    const store = mockStore({
      restaurants: {
        allRestaurants: restaurantListWithDistances,
        isFetching: false,
        isWithDistance: true,
        didInvalidate: false,
      },
    });

    store.dispatch(setRestaurantSuggestions());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should call showNotification when there are no suggestions", () => {
    const expectedActions = [
      {
        type: SHOW_NOTIFICATION,
        data: {
          msg: "No restaurants found near your location.",
          notificationType: "warning",
          open: true,
        },
      },
      {
        type: SET_RESTAURANT_SUGGESTIONS,
        payload: [],
      },
    ];

    const store = mockStore({
      restaurants: {
        allRestaurants: [],
        isFetching: false,
        isWithDistance: true,
        didInvalidate: false,
      },
    });

    store.dispatch(setRestaurantSuggestions());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
