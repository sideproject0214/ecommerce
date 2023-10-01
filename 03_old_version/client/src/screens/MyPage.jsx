import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/alert/Alert";

import { ADD_ALERTSIDE } from "../redux/constant/alertConstant";
import { MYPAGE_PASSWORD_CHANGE_REQUEST } from "../redux/constant/myPageConstant";

const MyPage = () => {
  const { loading, msg, msgState } = useSelector((state) => state.mypage);
  const [form, setValue] = useState({
    currentPw: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (message) {
      setMessage("");
    }
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
    // setIsError(false);
  };

  console.log(form, "mypage form");

  const onSubmit = (e) => {
    e.preventDefault();

    const { currentPw, password, confirmPassword } = form;

    if (!currentPw || !password || !confirmPassword) {
      setMessage("모든 필드를 채워주세요");
    } else {
      if (password !== confirmPassword) {
        setMessage("비밀번호가 일치하지 않습니다");
      } else {
        dispatch({
          type: MYPAGE_PASSWORD_CHANGE_REQUEST,
          payload: form,
        });
      }
    }
  };

  useEffect(() => {
    if (msg === "PW CHANGE SUCCESS") {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: "성공적으로 변경했습니다",
          type: "SUCCESS",
        },
      });
    } else if (msg === "CurrentPw do not match") {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: "현재 비밀번호가 일치하지 않습니다",
          type: "ERROR",
        },
      });
    }
  }, [dispatch, msg]);

  return (
    <div className="container">
      <div className="mypage-box">
        <form onSubmit={onSubmit} className="mypage-box__form">
          <h2>비밀번호 변경</h2>
          <label>
            <span>현재 비밀번호</span>
            <input
              type="text"
              name="currentPw"
              value={form.currentPw}
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
            ) : msgState ? (
              <div className="check__ani">
                <i className="fas fa-check"></i>
              </div>
            ) : (
              "제출하기"
            )}
          </button>

          <div className="check__ani"></div>
          {/* {isError ? <Alert message="가입된 이메일 입니다" /> : ""} */}
        </form>
      </div>
    </div>
  );
};

export default MyPage;
