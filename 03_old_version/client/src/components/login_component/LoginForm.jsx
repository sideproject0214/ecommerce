import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NORMAL_LOGIN_REQUEST } from "../../redux/constant/authConstant";
import WindowOpener from "./WindowOpener";
import Alert from "../alert/Alert";

const LoginForm = (props) => {
  const [form, setValue] = useState({
    email: "",
    password: "",
  });
  const { errMsg } = useSelector((state) => state.auth);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
    setIsError(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = form;
    dispatch({
      type: NORMAL_LOGIN_REQUEST,
      payload: { email, password },
    });
  };

  useEffect(() => {
    if (errMsg) {
      setIsError(true);
    }
  }, [errMsg]);

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
            message="이메일 또는 비밀번호가 정확하지 않습니다"
            margin="1rem 0 0 0"
          />
        ) : (
          <p className="forgot-pwd">비밀번호를 잊어버렸나요?</p>
        )}

        <div className="login-divide">
          <span>OR</span>
        </div>

        <WindowOpener
          snsName="네이버 로그인"
          url="/login/naver"
          cName="snsLogin-btn naver-btn"
        />
        <WindowOpener
          snsName="카카오 로그인"
          url="/login/kakao"
          cName="snsLogin-btn kakao-btn"
        />
        <WindowOpener
          snsName="Google 로그인"
          url="/login/google"
          cName="snsLogin-btn google-btn"
        />
      </div>
    </>
  );
};

LoginForm.defaultProps = {
  loginClassName: "form m-left",
};

export default LoginForm;
