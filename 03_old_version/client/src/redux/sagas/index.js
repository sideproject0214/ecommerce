import { all, fork } from "redux-saga/effects";
import { apiAddress } from "../constant/apiConstant";
import axios from "axios";
import productSaga from "./productSaga";
import authSaga from "./authSaga";
import cartSaga from "./cartSaga";
import paySaga from "./paySaga";
import addressSaga from "./addressSaga";
import adminSaga from "./adminSaga";
import myPageSaga from "./mypageSaga";

// import dotenv from "dotenv";
// dotenv.config();

axios.default.baseURL = apiAddress;
axios.defaults.withCredentials = false;

// console.log(process.env.REACT_APP_BASIC_SERVER_URL, "sagas index");

export default function* rootSaga() {
  yield all([
    fork(productSaga),
    fork(authSaga),
    // fork(userSaga),
    fork(cartSaga),
    fork(paySaga),
    fork(addressSaga),
    fork(adminSaga),
    fork(myPageSaga),
    // fork(alertSaga),
  ]);
}
