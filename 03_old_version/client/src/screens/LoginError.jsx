import React from "react";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const LoginError = () => {
  console.log("LoginError");
  // let pathname = window.location.pathname;
  // useEffect(() => {
  //   if (pathname === "/login/error") {
  //     window.location.href = pathname;
  //   }
  // }, [pathname]);
  return (
    <Message>
      <div className="message">
        <div className="message__header red">
          <h2>잘못된 접근입니다</h2>
        </div>
        <div className="message__body">
          <Link to="/" className="message__link">
            홈으로 가기
          </Link>
        </div>
      </div>
    </Message>
  );
};

export default LoginError;
