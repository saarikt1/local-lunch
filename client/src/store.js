import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";
import restaurantReducer from "./reducers/restaurantReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  notification: notificationReducer,
  restaurants: restaurantReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
