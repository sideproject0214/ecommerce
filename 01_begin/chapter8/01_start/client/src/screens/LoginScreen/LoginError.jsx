import Message from "../../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./LoginError.scss";

const LoginError = () => {
  console.log("LoginError");
  const navigate = useNavigate();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c - 1), 1000);
    const timerId = setTimeout(() => navigate("/"), 4000);
    return () => {
      clearInterval(id), clearTimeout(timerId);
    };
  }, []);

  return (
    <Message>
      <div className="message">
        <div className="message__header red">
          <h2>잘못된 접근입니다</h2>
        </div>
        <div className="message__header__body">
          <Link to="/" className="message__link">
            홈으로 가기
          </Link>
        </div>
        <div className="login__error">
          {count > 0 ? (
            <p>
              👋 <span className="login__error__span">{count}초</span> 후에
              홈으로 이동합니다
            </p>
          ) : (
            <p className="login__error__start">START</p>
          )}
        </div>
      </div>
    </Message>
  );
};

export default LoginError;
