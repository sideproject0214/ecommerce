import { useEffect } from "react";
import "./LoginSuccess.scss";

const LoginSuccess = () => {
  const nextLocation = localStorage.getItem("prevLocation");
  console.log(nextLocation, "nextLocation");
  useEffect(() => {
    const delay = () => {
      const after = () => {
        window.close();
        if (nextLocation) {
          window.opener.location.replace(nextLocation);
          window.localStorage.removeItem("prevLocation");
        } else {
          window.opener.location.replace("/");
        }
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
