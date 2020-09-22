import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";
import restaurantReducer from "./reducers/restaurantReducer";
import userReducer from "./reducers/userReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  notification: notificationReducer,
  restaurants: restaurantReducer,
  user: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
