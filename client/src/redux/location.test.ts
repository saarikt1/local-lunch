// import { locationReducer, locateUser } from './location'
// import {
//   FETCH_LOCATION_FAILURE,
//   FETCH_LOCATION_REQUEST,
//   FETCH_LOCATION_SUCCESS,
// } from './locationTypes'
// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import { userLocation } from '../testData'

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)

// describe('Location reducer', () => {
//   it('should return initial state', () => {
//     expect(
//       locationReducer(undefined, {
//         type: FETCH_LOCATION_SUCCESS,
//         coords: userLocation,
//       })
//     ).toEqual({
//       coordinates: userLocation,
//       isLocating: false,
//       didInvalidate: false,
//       error: false,
//     })
//   })

//   it(`should handle ${FETCH_LOCATION_REQUEST}`, () => {
//     expect(
//       locationReducer(
//         {
//           coordinates: userLocation,
//           isLocating: false,
//           didInvalidate: false,
//           error: false,
//         },
//         {
//           type: FETCH_LOCATION_REQUEST,
//         }
//       )
//     ).toEqual({
//       coordinates: userLocation,
//       isLocating: true,
//       didInvalidate: false,
//       error: false,
//     })
//   })

//   it(`should handle ${FETCH_LOCATION_SUCCESS}`, () => {
//     expect(
//       locationReducer(
//         {
//           coordinates: userLocation,
//           isLocating: true,
//           didInvalidate: false,
//           error: false,
//         },
//         {
//           type: FETCH_LOCATION_SUCCESS,
//           coords: userLocation,
//         }
//       )
//     ).toEqual({
//       isLocating: false,
//       didInvalidate: false,
//       error: false,
//       coordinates: userLocation,
//     })
//   })

//   it(`should handle ${FETCH_LOCATION_FAILURE}`, () => {
//     expect(
//       locationReducer(
//         {
//           coordinates: userLocation,
//           isLocating: true,
//           didInvalidate: false,
//           error: false,
//         },
//         {
//           type: FETCH_LOCATION_FAILURE,
//         }
//       )
//     ).toEqual({
//       coordinates: userLocation,
//       isLocating: false,
//       didInvalidate: false,
//       error: true,
//     })
//   })
// })

// describe('locateUser', () => {
//   it('sets the user location on success', () => {
//     const mockGeolocation = {
//       getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
//         Promise.resolve(
//           success({
//             coords: {
//               latitude: userLocation.lat,
//               longitude: userLocation.lng,
//             },
//           })
//         )
//       ),
//     }
//     Object.defineProperty(global.navigator, 'geolocation', {
//       value: mockGeolocation,
//     })

//     const expectedActions = [
//       {
//         type: FETCH_LOCATION_REQUEST,
//       },
//       {
//         type: FETCH_LOCATION_SUCCESS,
//         coords: {
//           lat: userLocation.lat,
//           lng: userLocation.lng,
//         },
//       },
//     ]

//     const store = mockStore({
//       location: {
//         coordinates: userLocation,
//         isLocating: false,
//         didInvalidate: false,
//       },
//     })

//     return store.dispatch<any>(locateUser()).then(() => {
//       expect(store.getActions()).toEqual(expectedActions)
//     })
//   })
// })

export {}
