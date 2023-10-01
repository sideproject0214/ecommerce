import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  useLazyGetNaverAuthQuery,
  useLazyGetKakaoAuthQuery,
  useLazyGetGoogleAuthQuery,
} from "../../redux/apiSlices/extendedAuth";

const SnsLoginRedirect = () => {
  const { redirectURI } = useSelector((state) => state.auth);
  const [getNaverAuth] = useLazyGetNaverAuthQuery();
  const [getKakaoAuth] = useLazyGetKakaoAuthQuery();
  const [getGoogleAuth] = useLazyGetGoogleAuthQuery();

  const { pathname } = useLocation();
  const [error, setError] = useState("");

  useEffect(() => {
    switch (pathname) {
      case "/login/naver":
        getNaverAuth();
        if (redirectURI) {
          window.location.href = redirectURI;
        }
        break;
      case "/login/kakao":
        getKakaoAuth();
        console.log(redirectURI, "redirect URI");
        if (redirectURI) {
          window.location.href = redirectURI;
        }
        break;
      case "/login/google":
        getGoogleAuth();
        console.log(redirectURI, "redirect URI");
        if (redirectURI) {
          window.location.href = redirectURI;
        }
        break;

      default:
        console.log(`${pathname}은 올바르지 않은 경로입니다`);
        setError(`로그인 안됨 ${pathname}`);
        break;
    }
  }, [redirectURI, pathname]);

  return <div>{error}</div>;
};

export default SnsLoginRedirect;
