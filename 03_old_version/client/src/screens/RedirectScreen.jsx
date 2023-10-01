import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  GOOGLE_API_REQUEST,
  KAKAO_API_REQUEST,
  NAVER_API_REQUEST,
} from "../redux/constant/authConstant";

const Son = () => {
  const dispatch = useDispatch();
  const { redirectURI } = useSelector((state) => state.auth);

  let pathname = window.location.pathname;

  useEffect(() => {
    switch (pathname) {
      case "/login/naver":
        dispatch({ type: NAVER_API_REQUEST });
        if (redirectURI) {
          window.location.href = redirectURI;
        }
        break;
      case "/login/kakao":
        dispatch({ type: KAKAO_API_REQUEST });
        console.log(redirectURI, "redirect URI");
        if (redirectURI) {
          window.location.href = redirectURI;
        }
        break;
      case "/login/google":
        dispatch({ type: GOOGLE_API_REQUEST });
        console.log(redirectURI, "redirect URI");
        if (redirectURI) {
          window.location.href = redirectURI;
        }
        break;

      default:
        console.log(`${pathname}은 올바르지 않은 경로입니다`);
    }
  }, [dispatch, redirectURI, pathname]);

  return <div></div>;
};

export default Son;
