import React from "react";
import ReactDOM from "react-dom";
import App from "./view/App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "fontsource-roboto/latin-300-normal.css";
import "fontsource-roboto/latin-400-normal.css";
import "fontsource-roboto/latin-500-normal.css";
import "fontsource-roboto/latin-700-normal.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
