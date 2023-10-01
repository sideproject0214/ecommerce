import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertSide from "../components/alert/AlertSide";
import LoginForm from "../components/login_component/LoginForm";
import LoginSide from "../components/login_component/LoginSide";
import SignUpForm from "../components/login_component/SignUpForm";
import { LOGIN_ERROR_CLEAR_REQUEST } from "../redux/constant/authConstant";

const LoginScreen = () => {
  const [signup, setSignup] = useState(false);
  const { emailName, emailHost } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onClickSignup = () => {
    setSignup(!signup);
    dispatch({
      type: LOGIN_ERROR_CLEAR_REQUEST,
    });
  };

  return (
    <>
      {emailName ? (
        <AlertSide emailName={emailName} emailHost={emailHost} />
      ) : (
        ""
      )}
      <div className="login-contatiner">
        <div className="cont">
          {signup ? <SignUpForm /> : <LoginForm />}
          <LoginSide signup={signup} onClickSignup={onClickSignup} />
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
