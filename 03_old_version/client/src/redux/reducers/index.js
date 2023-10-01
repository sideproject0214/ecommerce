import { combineReducers } from "redux";

import productReducer from "./productReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import payReducer from "./payReducer";
import addressReducer from "./addressReducer";
import alertReducer from "./alertReducer";
import adminReducer from "./adminReducer";
import { routerReducer } from "../../store";
import myPageReducer from "./myPageReducer";

const createRootReducer = () =>
  combineReducers({
    router: routerReducer,
    product: productReducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
    pay: payReducer,
    address: addressReducer,
    alert: alertReducer,
    admin: adminReducer,
    mypage: myPageReducer,
  });

export default createRootReducer;
