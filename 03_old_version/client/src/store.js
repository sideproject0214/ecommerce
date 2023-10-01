import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./redux/reducers/index";
import rootSaga from "./redux/sagas";
import { createReduxHistoryContext } from "redux-first-history";

import { createBrowserHistory } from "history";

export const { createReduxHistory, routerReducer, routerMiddleware } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middlewares = [sagaMiddleware, routerMiddleware];
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancer =
  process.env.NODE_ENV === "production" ? compose : devtools || compose;

const store = createStore(
  createRootReducer(),
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);

export const history = createReduxHistory(store);

sagaMiddleware.run(rootSaga);

export default store;
