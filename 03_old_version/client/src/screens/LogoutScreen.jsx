import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainLoading } from "../components/Loading";
import { LOGOUT_REQUEST } from "../redux/constant/authConstant";
import { history } from "../store";

const LogoutScreen = () => {
  const dispatch = useDispatch();
  const { redirectURI, profile } = useSelector((state) => state.auth);
  console.log(redirectURI, profile.length);

  useEffect(() => {
    if (profile.length === 0) {
      history.push("/");
    } else {
      if (!redirectURI) {
        dispatch({ type: LOGOUT_REQUEST });
      } else {
        // const delay = () => {
        //   const after = () => {
        //     window.location.href = redirectURI;
        //   };
        //   setTimeout(after, 3000);
        // };
        // delay();
        window.location.href = redirectURI;
      }
    }
  }, [dispatch, redirectURI, profile]);
  return (
    <>
      <MainLoading />
    </>
  );
};

export default LogoutScreen;
