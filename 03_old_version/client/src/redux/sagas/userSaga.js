import axios from "axios";
import { call, put, takeEvery, fork, all } from "redux-saga/effects";
import {
  USERS_LOAD_FAILURE,
  USERS_LOAD_REQUEST,
  USERS_LOAD_SUCCESS,
} from "../constant/userConstant";
import { getAccessToken } from "../../middlewares/tokenMiddleWares";

// Normal Login
function* watchUserLoad() {
  function* usersLoad() {
    const result = yield getAccessToken();
    // console.log(action.payload, "access token");
    console.log(result, "getAccessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${result}`,
      },
    };
    const usersLoadAPI = () => {
      return axios.get("/api/users", config);
    };
    // const usersLoadAPI = (token) => {
    //   return axios.get("/api/users/", {
    //     headers: { authorization: `Bearer ${token}` },
    //   });
    // };
    try {
      console.log("usersLoad First");
      const { data } = yield call(usersLoadAPI);
      console.log(data, "usersload function");
      yield put({
        type: USERS_LOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      yield put({
        type: USERS_LOAD_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(USERS_LOAD_REQUEST, usersLoad);
}

export default function* userSaga() {
  yield all([fork(watchUserLoad)]);
}
