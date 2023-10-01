import axios from "axios";
import { call, put, takeEvery, fork, all } from "redux-saga/effects";

import {
  NORMAL_LOGIN_REQUEST,
  NORMAL_LOGIN_SUCCESS,
  NORMAL_LOGIN_FAILURE,
  NAVER_API_SUCCESS,
  NAVER_API_FAILURE,
  NAVER_API_REQUEST,
  LOGIN_CHECK_REQUEST,
  LOGIN_CHECK_SUCCESS,
  LOGIN_CHECK_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  KAKAO_API_SUCCESS,
  KAKAO_API_FAILURE,
  KAKAO_API_REQUEST,
  GOOGLE_API_SUCCESS,
  GOOGLE_API_FAILURE,
  GOOGLE_API_REQUEST,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  EMAIL_TOKEN_AUTH_SUCCESS,
  EMAIL_TOKEN_AUTH_FAILURE,
  EMAIL_TOKEN_AUTH_REQUEST,
  LOGIN_ERROR_CLEAR_REQUEST,
  LOGIN_ERROR_CLEAR_SUCCESS,
  LOGIN_ERROR_CLEAR_FAILURE,
} from "../constant/authConstant";
import { jsonConfig } from "../../config/headerConfig";

// import dotenv from "dotenv";
// dotenv.config();

// Normal Login
function* watchNormalLogin() {
  const normalLoginAPI = (payload) => {
    return axios.post("/api/auth/login", payload, jsonConfig);
  };

  function* normalLogin(action) {
    try {
      const { data } = yield call(normalLoginAPI, action.payload);
      console.log(data, "normal login");

      yield put({
        type: NORMAL_LOGIN_SUCCESS,
        payload: data,
      });

      window.location.replace(process.env.REACT_APP_FRONT_ADDRESS);
    } catch (error) {
      yield put({
        type: NORMAL_LOGIN_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(NORMAL_LOGIN_REQUEST, normalLogin);
}

/************************************************************************************************ */

// NAVER_LOGIN
const naverCallbackAPI = async () => {
  return await axios.get("/api/auth/naver");
};

function* naverAuth() {
  try {
    // const { data } = yield call(naverAuthAPI);
    // console.log("rediret Data", data);
    const { data } = yield call(naverCallbackAPI);
    yield put({ type: NAVER_API_SUCCESS, payload: data });
    console.log("naverCallbackAPI", data);
    // 자바스크립트로 특정url 접속시 다른 url로 이동시킨다. window.location.href
  } catch (error) {
    console.log(error);
    yield put({
      type: NAVER_API_FAILURE,
      payload: error,
    });
  }
}

function* watchNaverAPI() {
  yield takeEvery(NAVER_API_REQUEST, naverAuth);
}

// KAKAO_LOGIN
const kakaoCallbackAPI = async () => {
  return await axios.get("/api/auth/kakao");
};

function* kakaoAuth() {
  try {
    // const { data } = yield call(kakaoAuthAPI);
    // console.log("rediret Data", data);
    const { data } = yield call(kakaoCallbackAPI);
    yield put({ type: KAKAO_API_SUCCESS, payload: data });
    console.log("kakaoCallbackAPI", data);
    // 자바스크립트로 특정url 접속시 다른 url로 이동시킨다. window.location.href
  } catch (error) {
    console.log(error);
    yield put({
      type: KAKAO_API_FAILURE,
      payload: error,
    });
  }
}

function* watchKakaoAPI() {
  yield takeEvery(KAKAO_API_REQUEST, kakaoAuth);
}
// GOOGLE_LOGIN
const googleCallbackAPI = async () => {
  return await axios.get("/api/auth/google");
};

function* googleAuth() {
  try {
    const { data } = yield call(googleCallbackAPI);
    yield put({ type: GOOGLE_API_SUCCESS, payload: data });
    console.log("googleCallbackAPI", data);
    // 자바스크립트로 특정url 접속시 다른 url로 이동시킨다. window.location.href
  } catch (error) {
    console.log(error);
    yield put({
      type: GOOGLE_API_FAILURE,
      payload: error,
    });
  }
}

function* watchGoogleAPI() {
  yield takeEvery(GOOGLE_API_REQUEST, googleAuth);
}

// LOGIN_CHECK
function* watchLoginCheck() {
  const LoginCheckAPI = () => {
    return axios.get("/api/auth/logincheck");
  };

  function* LoginCheck() {
    try {
      const { data } = yield call(LoginCheckAPI);
      // console.log(data, "LoginCheck");

      yield put({
        type: LOGIN_CHECK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: LOGIN_CHECK_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(LOGIN_CHECK_REQUEST, LoginCheck);
}

// LOGOUT
function* watchLogout() {
  const LogoutAPI = () => {
    // return axios.get("/api/auth/logout", { withCredentials: true });
    return axios.get("/api/auth/logout");
  };

  function* Logout(action) {
    try {
      const { data } = yield call(LogoutAPI, action.payload);
      console.log(data, "Logout");

      yield put({
        type: LOGOUT_SUCCESS,
        payload: data,
      });
      // yield put(push("/"));
    } catch (error) {
      yield put({
        type: LOGOUT_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(LOGOUT_REQUEST, Logout);
}

// SIGNUP
const SignUpApi = (payload) => {
  // return axios.get("/api/auth/logout", { withCredentials: true });
  return axios.post("/api/auth/signup", payload, jsonConfig);
};

function* SignUp(action) {
  try {
    const { data } = yield call(SignUpApi, action.payload);
    console.log(data, "signUp");

    yield put({
      type: SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: SIGNUP_FAILURE,
      payload: error,
    });
  }
}

function* watchSignUp() {
  yield takeEvery(SIGNUP_REQUEST, SignUp);
}

// Email Token Auth
const EmailTokenApi = (payload) => {
  // return axios.get("/api/auth/logout", { withCredentials: true });
  return axios.get("/api/auth/verify", {
    params: { token: payload },
  });
};

function* EmailTokenAuth(action) {
  console.log(action.payload, "Email Token");
  const { data } = yield call(EmailTokenApi, action.payload);
  console.log(data, "Email-Token");

  if (data) {
    yield put({
      type: EMAIL_TOKEN_AUTH_SUCCESS,
      payload: data,
    });
    yield setTimeout(() => {
      window.location.replace(process.env.REACT_APP_FRONT_ADDRESS);
    }, 2500);
  } else {
    yield put({
      type: EMAIL_TOKEN_AUTH_FAILURE,
      payload: data,
    });
    yield setTimeout(() => {
      window.location.replace(process.env.REACT_APP_FRONT_ADDRESS);
    }, 2500);
  }
}

function* watchEmailToken() {
  yield takeEvery(EMAIL_TOKEN_AUTH_REQUEST, EmailTokenAuth);
}

// Login Error Clear
function* LoginErrorClear() {
  try {
    yield put({
      type: LOGIN_ERROR_CLEAR_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: LOGIN_ERROR_CLEAR_FAILURE,
    });
  }
}

function* watchLoginErrorClear() {
  yield takeEvery(LOGIN_ERROR_CLEAR_REQUEST, LoginErrorClear);
}

export default function* authSaga() {
  yield all([
    fork(watchNormalLogin),
    fork(watchNaverAPI),
    fork(watchKakaoAPI),
    fork(watchLoginCheck),
    fork(watchSignUp),
    fork(watchLogout),
    fork(watchGoogleAPI),
    fork(watchEmailToken),

    fork(watchLoginErrorClear),
  ]);
}
