import { locateUser } from "./location";
import {
  fetchRestaurants,
  setRestaurantSuggestions,
  addDistanceToRestaurants,
} from "./restaurant";

export const initData = () => {
  return async (dispatch) => {
    try {
      await Promise.all([dispatch(locateUser()), dispatch(fetchRestaurants())]);
      dispatch(addDistanceToRestaurants());
      dispatch(setRestaurantSuggestions());
    } catch (err) {
      console.error("Error initializing data: ", err.message);
    }
  };
};
