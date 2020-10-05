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
} from "./restaurant";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
jest.mock("axios");

const restaurantList = [
  {
    id: "41",
    name: "Taikakattila",
    website: "http://www.taikakattila.fi/",
    latlon: {
      x: 60.2923294,
      y: 24.988834,
    },
    subtitle: "",
  },
  {
    id: "37",
    name: "Paisano",
    website: "https://www.paisano.fi/",
    latlon: {
      x: 60.1665682,
      y: 24.9460262,
    },
    subtitle: "",
  },
  {
    id: "27",
    name: "Väinö Kallio",
    website: "https://www.vainokallio.fi/",
    latlon: {
      x: 60.1832531,
      y: 24.9588485,
    },
    subtitle: "",
  },
];

const restaurantListWithDistances = [
  {
    id: "41",
    name: "Taikakattila",
    website: "http://www.taikakattila.fi/",
    latlon: {
      x: 60.2923294,
      y: 24.988834,
    },
    subtitle: "",
    distance: 12620,
  },
  {
    id: "37",
    name: "Paisano",
    website: "https://www.paisano.fi/",
    latlon: {
      x: 60.1665682,
      y: 24.9460262,
    },
    subtitle: "",
    distance: 1438775,
  },
  {
    id: "27",
    name: "Väinö Kallio",
    website: "https://www.vainokallio.fi/",
    latlon: {
      x: 60.1832531,
      y: 24.9588485,
    },
    subtitle: "",
    distance: 1440752,
  },
];

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
