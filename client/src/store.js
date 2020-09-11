import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";
import restaurantReducer from "./reducers/restaurantReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  restaurants: restaurantReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
