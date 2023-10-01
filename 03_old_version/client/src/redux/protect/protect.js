// import Cookies from "js-cookie";
import axios from "axios";
import { apiAddress } from "../constant/apiConstant";

export const protect = async (e) => {
  const accessToken = Cookies.get("access");
  const refreshToken = Cookies.get("refresh");

  const refresh = (refreshToken) => {
    const data = axios.post(`${apiAddress}/api/auth/refresh`);
  };

  const hasAccess = async (accessToken, refreshToken) => {};
};
