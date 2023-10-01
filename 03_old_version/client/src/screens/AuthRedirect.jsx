import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { EMAIL_TOKEN_AUTH_REQUEST } from "../redux/constant/authConstant";

const AuthRedirect = () => {
  const { emailAuth } = useSelector((state) => state.auth);
  const token = window.location.href.split("/").pop();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: EMAIL_TOKEN_AUTH_REQUEST, payload: token });
  }, [dispatch, token]);

  return (
    <>
      <div className="container">
        <Message
          backgroundColor={emailAuth ? "rgb(212, 237, 218)" : "#f8d7da"}
          width="80%"
          height="5rem"
          borderRadius="0.25rem"
          border="1px solid transparent"
        >
          {emailAuth ? (
            <div className="auth__msg" style={{ fontColor: "#155724" }}>
              이메일이 인증 되었습니다
            </div>
          ) : (
            <div className="auth__msg" style={{ fontColor: "#721c24" }}>
              유효하지 않은 이메일 인증입니다
            </div>
          )}
        </Message>
      </div>
    </>
  );
};

export default AuthRedirect;
