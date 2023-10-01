import axios from "axios";
import { call, put, takeEvery, fork, all } from "redux-saga/effects";

import {
  DEFAULT_ADDRESS_FAILURE,
  DEFAULT_ADDRESS_REQUEST,
  DEFAULT_ADDRESS_SUCCESS,
  LATEST_ADDRESS_FAILURE,
  LATEST_ADDRESS_REQUEST,
  LATEST_ADDRESS_SUCCESS,
  RADIO_SET_FAILURE,
  RADIO_SET_REQUEST,
  RADIO_SET_SUCCESS,
  SAVE_ADDRESS_FAILURE,
  SAVE_ADDRESS_REQUEST,
  SAVE_ADDRESS_SUCCESS,
} from "../constant/addressConstant";

// Default Address
const addressAPI = (payload) => {
  return axios.get("/api/address/default", payload);
};

function* defaultAddress() {
  function* defaultAddress(action) {
    console.log(action.payload, "default Address Saga");
    try {
      const { data } = yield call(addressAPI, action.payload);
      console.log(data);

      yield put({
        type: DEFAULT_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: DEFAULT_ADDRESS_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(DEFAULT_ADDRESS_REQUEST, defaultAddress);
}

// Lastest Address
const latestAddressAPI = (payload) => {
  return axios.get("/api/address/latest", payload);
};

function* latestAddress() {
  function* latestAddress(action) {
    console.log(action.payload, "Latest Address Saga");
    try {
      const { data } = yield call(latestAddressAPI, action.payload);
      console.log(data);

      yield put({
        type: LATEST_ADDRESS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: LATEST_ADDRESS_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(LATEST_ADDRESS_REQUEST, latestAddress);
}

// Radio Set

function* radioSet() {
  function* radioSet(action) {
    console.log("radio", action.payload);
    try {
      yield put({
        type: RADIO_SET_SUCCESS,
        payload: action.payload,
      });
    } catch (error) {
      yield put({
        type: RADIO_SET_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(RADIO_SET_REQUEST, radioSet);
}

// Save Address

function* saveAddress() {
  function* saveAddress(action) {
    try {
      yield put({
        type: SAVE_ADDRESS_SUCCESS,
        payload: action.payload,
      });
    } catch (error) {
      yield put({
        type: SAVE_ADDRESS_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(SAVE_ADDRESS_REQUEST, saveAddress);
}

export default function* addressSaga() {
  yield all([
    fork(defaultAddress),
    fork(latestAddress),
    fork(radioSet),
    fork(saveAddress),
  ]);
}
