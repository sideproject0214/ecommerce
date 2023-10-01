import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import { apiSlice } from "./redux/apiSlices";
import postReducer from "./redux/slices/postSlice";
import alertReducer from "./redux/slices/alertSlice"; //ch3
import authReducer from "./redux/slices/authSlice"; //ch3
import payReducer from "./redux/slices/paySlice"; // ch5
import addressReducer from "./redux/slices/addressSlice"; // ch5

export const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    posts: postReducer,
    alert: alertReducer, //ch3
    auth: authReducer, //ch3
    pay: payReducer, //ch5
    address: addressReducer, //ch5
    // 아래는 apiSlice에서 정의한 reducerPath인 'api'가 나오게 된다.
    [apiSlice.reducerPath]: apiSlice.reducer,
  }),
  devtools: process.env.NODE_ENV !== "production",
  initialState: {},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, routerMiddleware),
});

export const history = createReduxHistory(store);
