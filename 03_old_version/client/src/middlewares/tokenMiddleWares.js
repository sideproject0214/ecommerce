import axios from "axios";
import {
  REFRESH_ACCESSTOKEN_GET_FAILURE,
  REFRESH_ACCESSTOKEN_GET_SUCCESS,
} from "../redux/constant/authConstant";
import store, { history } from "../store";

export const accessTokenRefresh = async () => {
  const { data } = await axios.post("/api/auth/refresh", {});
  console.log(data.msg, "protect");
  if (data.msg) {
    store.dispatch({ type: REFRESH_ACCESSTOKEN_GET_FAILURE, payload: data });
    history.push("/login");

    console.log(store.getState(), "protect");
  } else {
    store.dispatch({ type: REFRESH_ACCESSTOKEN_GET_SUCCESS, payload: data });
    return data;
  }
};

export const getAccessToken = async () => {
  let { accessToken } = store.getState().auth;
  console.log(accessToken, "getAccessToken util");
  if (!accessToken) {
    accessToken = await accessTokenRefresh();
    console.log(accessToken, "accessToken refresh");
    return accessToken;
  } else {
    return accessToken;
  }
};
