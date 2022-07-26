// import { locateUser } from './location'
// import { ThunkAction } from 'redux-thunk'
// import { RootState } from './store'
// import { Action } from 'redux'
// import {
//   fetchRestaurants,
//   setRestaurantSuggestions,
//   addDistanceToRestaurants,
// } from './restaurant'

// export const initData = (): ThunkAction<
//   void,
//   RootState,
//   unknown,
//   Action<string>
// > => {
//   return async (dispatch) => {
//     try {
//       await Promise.all([dispatch(locateUser()), dispatch(fetchRestaurants())])
//       dispatch(addDistanceToRestaurants())
//       dispatch(setRestaurantSuggestions())
//     } catch (err) {
//       // console.error("Error initializing data: ", err.message);
//     }
//   }
// }

export {}
