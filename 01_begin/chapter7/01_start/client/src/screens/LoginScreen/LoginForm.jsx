import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import WindowOpener from "./WindowOpener";
import Alert from "../../components/Alert";
import { usePostNormalLoginMutation } from "../../redux/apiSlices/extendedAuth";

const LoginForm = (props) => {
  const [
    postNormalLogin,
    { data, isLoading, isSuccess, isError: errBoolean, error },
  ] = usePostNormalLoginMutation();

  const [form, setValue] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
    setIsError(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    postNormalLogin(form);
  };

  useEffect(() => {
    if (errBoolean) {
      setIsError(true);
    }
  }, [errBoolean]);

  return (
    <>
      <div className={props.loginClassName}>
        <Link to="/">
          <h2>SSaple</h2>
        </Link>
        <form action="" onSubmit={submitHandler}>
          <label>
            <span>이메일</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
            />
          </label>
          <label>
            <span>비밀번호</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
            />
          </label>

          <button className="submit" type="submit">
            로그인
          </button>
        </form>
        {isError ? (
          <Alert
            message={error?.data?.msg}
            // message="이메일 또는 비밀번호가 정확하지 않습니다"
            margin="1rem 0 0 0"
          />
        ) : (
          <Link to="/login/pwchange">
            <p className="forgot-pwd">비밀번호를 잊어버렸나요?</p>
          </Link>
        )}

        <div className="login-divide">
          <span>OR</span>
        </div>
        <WindowOpener
          snsName="네이버 로그인"
          url="/login/naver"
          cName="snsLogin-btn naver-btn"
          name="snsLogin"
        />
        <WindowOpener
          snsName="카카오 로그인"
          url="/login/kakao"
          cName="snsLogin-btn kakao-btn"
          name="snsLogin"
        />
        <WindowOpener
          snsName="Google 로그인"
          url="/login/google"
          cName="snsLogin-btn google-btn"
          name="snsLogin"
        />
      </div>
    </>
  );
};

LoginForm.defaultProps = {
  loginClassName: "form m-left",
};

export default LoginForm;
