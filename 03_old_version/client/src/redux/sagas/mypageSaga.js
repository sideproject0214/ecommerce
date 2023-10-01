import axios from "axios";
import { call, put, takeEvery, fork, all } from "redux-saga/effects";
import {
  MYPAGE_PASSWORD_CHANGE_FAILURE,
  MYPAGE_PASSWORD_CHANGE_REQUEST,
  MYPAGE_PASSWORD_CHANGE_SUCCESS,
} from "../constant/myPageConstant";

// MyPage Password Change

function* watchMypagePasswordChange() {
  const MypagePasswordChangeAPI = (payload) => {
    console.log(payload, "mypage");
    // return axios.get("/api/auth/logout", { withCredentials: true });
    return axios.put("/api/mypage/pwchange", payload);
  };

  function* MypagePasswordChange(action) {
    const { data } = yield call(MypagePasswordChangeAPI, action.payload);
    console.log(data, "data");
    try {
      yield put({
        type: MYPAGE_PASSWORD_CHANGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: MYPAGE_PASSWORD_CHANGE_FAILURE,
      });
    }
  }
  yield takeEvery(MYPAGE_PASSWORD_CHANGE_REQUEST, MypagePasswordChange);
}

export default function* myPageSaga() {
  yield all([fork(watchMypagePasswordChange)]);
}
