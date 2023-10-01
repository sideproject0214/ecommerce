import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../../redux/constant/authConstant";
import Alert from "../alert/Alert";

const SignUpForm = (props) => {
  const { loading, emailSend, errMsg } = useSelector((state) => state.auth);
  const [form, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (message) {
      setMessage("");
    }
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
    setIsError(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;
    const newUser = { name, email, password };

    console.log(newUser, "newUser");

    if (!name || !email || !password || !confirmPassword) {
      setMessage("모든 필드를 채워주세요");
    } else {
      if (password !== confirmPassword) {
        setMessage("비밀번호가 일치하지 않습니다");
      } else {
        dispatch({
          type: SIGNUP_REQUEST,
          payload: newUser,
        });
      }
    }
  };

  useEffect(() => {
    if (errMsg) {
      setIsError(true);
    }
  }, [errMsg]);
  // console.log(form);
  return (
    <>
      <form className={props.SignUpClassName} onSubmit={onSubmit}>
        <h2>회원가입</h2>
        <label>
          <span>이름</span>
          <input
            type="text"
            name="name"
            value={form.name}
            autoComplete="username"
            onChange={onChange}
          />
        </label>
        <label>
          <span>이메일</span>
          <input
            type="email"
            name="email"
            value={form.email}
            autoComplete="email"
            onChange={onChange}
          />
        </label>
        <label>
          <span>비밀번호</span>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            value={form.password}
            onChange={onChange}
          />
        </label>
        <label>
          <span>비밀번호 확인</span>
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={onChange}
          />
        </label>
        {message ? <Alert message={message} /> : ""}
        <button className="submit">
          {loading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : emailSend ? (
            <div className="check__ani">
              <i className="fas fa-check"></i>
            </div>
          ) : (
            "회원 가입"
          )}
        </button>

        <div className="check__ani"></div>
        {isError ? <Alert message="가입된 이메일 입니다" /> : ""}
      </form>
    </>
  );
};

SignUpForm.defaultProps = {
  SignUpClassName: "form m-right",
};

export default SignUpForm;
