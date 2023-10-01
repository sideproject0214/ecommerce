import React from "react";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import store, { history } from "./store";
import dotenv from "dotenv";
import MyRouter from "./routes/Router";

import "./assets/index.scss";
import ScrollOnTop from "./routes/ScrollOnTop";

dotenv.config();

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ScrollOnTop />
        <MyRouter />
      </Router>
    </Provider>
  );
};

export default App;
