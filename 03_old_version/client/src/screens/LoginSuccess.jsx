import React, { useEffect } from "react";

const LoginSuccess = () => {
  useEffect(() => {
    const delay = () => {
      const after = () => {
        window.close();
        const nextLocation = localStorage.getItem("prevLocation");
        // console.log(nextLocation);
        if (nextLocation) {
          window.opener.location.replace(nextLocation);
          window.localStorage.removeItem("prevLocation");
        } else {
          window.opener.location.replace("/");
        }

        // window.opener.location.replace("/"); // LoginSuccess 창을 닫고 나면 열린 것은 기존 창이니, 그 창의 주소가 이동함
        // history.push("/"); 이거는 작동안함
      };
      setTimeout(after, 1500);
    };
    delay();
  }, []);
  return (
    <div className="container login-success-container">
      <div className="login-success-body">로그인에 성공하였습니다</div>
    </div>
  );
};

export default LoginSuccess;
