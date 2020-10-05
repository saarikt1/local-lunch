import reducer, {
  locateUser,
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
} from "./location";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { userLocation } from "../testData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Location reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      coordinates: null,
      isLocating: false,
      didInvalidate: false,
      error: null,
    });
  });

  it(`should handle ${FETCH_LOCATION_REQUEST}`, () => {
    expect(
      reducer(
        {
          coordinates: null,
          isLocating: false,
          didInvalidate: false,
          error: null,
        },
        {
          type: FETCH_LOCATION_REQUEST,
        }
      )
    ).toEqual({
      coordinates: null,
      isLocating: true,
      didInvalidate: false,
      error: null,
    });
  });

  it(`should handle ${FETCH_LOCATION_SUCCESS}`, () => {
    expect(
      reducer(
        {
          coordinates: null,
          isLocating: true,
          didInvalidate: false,
          error: null,
        },
        {
          type: FETCH_LOCATION_SUCCESS,
          coords: userLocation,
        }
      )
    ).toEqual({
      coordinates: null,
      isLocating: false,
      didInvalidate: false,
      error: null,
      coordinates: userLocation,
    });
  });

  it(`should handle ${FETCH_LOCATION_FAILURE}`, () => {
    expect(
      reducer(
        {
          coordinates: null,
          isLocating: true,
          didInvalidate: false,
          error: null,
        },
        {
          type: FETCH_LOCATION_FAILURE,
        }
      )
    ).toEqual({
      coordinates: null,
      isLocating: false,
      didInvalidate: false,
      error: true,
    });
  });
});

describe("locateUser", () => {
  it("sets the user location on success", () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
        Promise.resolve(
          success({
            coords: {
              latitude: userLocation.lat,
              longitude: userLocation.lon,
            },
          })
        )
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    const expectedActions = [
      {
        type: FETCH_LOCATION_REQUEST,
      },
      {
        type: FETCH_LOCATION_SUCCESS,
        coords: {
          lat: userLocation.lat,
          lon: userLocation.lon,
        },
      },
    ];

    const store = mockStore({
      location: {
        coordinates: null,
        isLocating: false,
        didInvalidate: false,
      },
    });

    return store.dispatch(locateUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
