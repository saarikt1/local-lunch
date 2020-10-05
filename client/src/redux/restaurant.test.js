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
  fetchRestaurants,
  addDistanceToRestaurants,
  filterRestaurantsByDistance,
  getRestaurantSuggestions,
} from "./restaurant";
import {
  userLocation,
  restaurantList,
  restaurantListWithDistances,
} from "../testData";

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

describe("getRestaurantSuggestions", () => {
  it("returns three random options from inside the search radius", () => {
    const state = {
      restaurants: {
        allRestaurants: restaurantList,
        isFetching: false,
        isWithDistance: true,
        didInvalidate: false,
      },
    };

    global.Math.random = () => 0.2;
    const restaurantSuggestions = getRestaurantSuggestions(state, 300);
    expect(restaurantSuggestions).toEqual([
      {
        id: "21",
        name: "Ravintola Bank",
        website: "https://www.ravintolabank.fi/",
        latlon: {
          x: 60.1661896,
          y: 24.950987,
        },
        subtitle: "",
        distance: 167,
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
  it("returns undefined if restaurantList is without distances", () => {
    const state = {
      restaurants: {
        allRestaurants: restaurantList,
        isFetching: false,
        isWithDistance: false,
        didInvalidate: false,
      },
    };

    const restaurantSuggestions = getRestaurantSuggestions(state);
    expect(restaurantSuggestions).toBeUndefined();
  });
});
