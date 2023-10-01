import { LOCATION_CHANGE } from "react-router-redux";
import { all, fork, put, takeEvery } from "@redux-saga/core/effects";
import {
  LOCATION_CHANGE_FAILURE,
  LOCATION_CHANGE_SUCCESS,
} from "../constant/locationConstant";
import { useLocation } from "react-router";

// Normal Login
function* watchLocationChange() {
  function* LocationChange(action) {
    const location = useLocation();
    try {
      console.log(location, "location");
      // yield put({
      //   type: LOCATION_CHANGE_SUCCESS,
      //   payload: data,
      // });
    } catch (error) {
      yield put({
        type: LOCATION_CHANGE_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(LOCATION_CHANGE, LocationChange);
}

export default function* authSaga() {
  yield all([fork(watchLocationChange)]);
}
