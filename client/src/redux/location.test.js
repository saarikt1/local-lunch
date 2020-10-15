import { locationReducer, locateUser } from "./location";
import {
  FETCH_LOCATION_FAILURE,
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
} from "./locationTypes";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { userLocation } from "../testData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Location reducer", () => {
  it("should return initial state", () => {
    expect(locationReducer(undefined, {})).toEqual({
      coordinates: { lat: 60.1797517, lng: 24.9597715 },
      isLocating: false,
      didInvalidate: false,
      error: false,
    });
  });

  it(`should handle ${FETCH_LOCATION_REQUEST}`, () => {
    expect(
      locationReducer(
        {
          coordinates: { lat: 60.1797517, lng: 24.9597715 },
          isLocating: false,
          didInvalidate: false,
          error: false,
        },
        {
          type: FETCH_LOCATION_REQUEST,
        }
      )
    ).toEqual({
      coordinates: { lat: 60.1797517, lng: 24.9597715 },
      isLocating: true,
      didInvalidate: false,
      error: false,
    });
  });

  it(`should handle ${FETCH_LOCATION_SUCCESS}`, () => {
    expect(
      locationReducer(
        {
          coordinates: { lat: 60.1797517, lng: 24.9597715 },
          isLocating: true,
          didInvalidate: false,
          error: false,
        },
        {
          type: FETCH_LOCATION_SUCCESS,
          coords: userLocation,
        }
      )
    ).toEqual({
      isLocating: false,
      didInvalidate: false,
      error: false,
      coordinates: userLocation,
    });
  });

  it(`should handle ${FETCH_LOCATION_FAILURE}`, () => {
    expect(
      locationReducer(
        {
          coordinates: { lat: 60.1797517, lng: 24.9597715 },
          isLocating: true,
          didInvalidate: false,
          error: false,
        },
        {
          type: FETCH_LOCATION_FAILURE,
        }
      )
    ).toEqual({
      coordinates: { lat: 60.1797517, lng: 24.9597715 },
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
              longitude: userLocation.lng,
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
          lng: userLocation.lng,
        },
      },
    ];

    const store = mockStore({
      location: {
        coordinates: { lat: 60.1797517, lng: 24.9597715 },
        isLocating: false,
        didInvalidate: false,
      },
    });

    return store.dispatch(locateUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
