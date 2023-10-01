import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Modal from "../../components/Modal";
import WhiteLoader from "../../components/WhiteLoader";
import { FRONT_ADDRESS } from "../../config/variables";
import {
  useGetPwAddressCheckQuery,
  usePutMakeChangePasswordMutation,
} from "../../redux/apiSlices/extendedAuth";
import { addAlertSide } from "../../redux/slices/alertSlice";

const PwChangeScreen = () => {
  const navigate = useNavigate();
  const pwEmailAddress = window.location.href.split("/").pop();
  const dispatch = useDispatch();
  const { data: CheckData, isLoading } =
    useGetPwAddressCheckQuery(pwEmailAddress);

  const [putMakeChangePassword, { pwMessage, isLoading: changeLoading }] =
    usePutMakeChangePasswordMutation({
      selectFromResult: ({ data, isSuccess, isLoading }) => ({
        pwMessage: data,
        isSuccess,
        isLoading,
      }),
    });

  // console.log(data, error, "useLazyChangePasswordQuery");
  const [form, setValue] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    if (message) {
      setMessage("");
    }
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log(form, "mypage form");

  const onSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = form;

    if (!password || !confirmPassword) {
      setMessage("모든 필드를 채워주세요");
    } else {
      if (password !== confirmPassword) {
        setMessage("새 비밀번호가 일치하지 않습니다");
      } else {
        putMakeChangePassword({ password, pwEmailAddress });
      }
    }
  };

  useEffect(() => {
    if (pwMessage === "PW CHANGE SUCCESS") {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "성공적으로 변경했습니다",
          type: "SUCCESS",
        })
      );
      setTimeout(() => window.location.replace(`${FRONT_ADDRESS}/login`), 2500);
    }
  }, [dispatch, pwMessage]);

  const InvalidAddress = () => {
    setTimeout(() => navigate("/login"), 2500);
    return (
      <div className="container">
        <Message
          backgroundColor={"#f8d7da"}
          width="80%"
          height="5rem"
          borderRadius="0.25rem"
          border="1px solid transparent"
        >
          <div className="auth__msg" style={{ fontColor: "#721c24" }}>
            유효하지 않은 이메일 인증입니다
          </div>
        </Message>
      </div>
    );
  };

  // 아래를 위 처럼 컴포넌트로 만들면 입력시마다 새로 고침이 됨
  const ChangePassword = (
    <div className="container">
      <div className="mypage-box">
        <form onSubmit={onSubmit} className="mypage-box__form">
          <Link to="/">
            <h1>SSaple</h1>
          </Link>
          <h2>비밀번호 변경</h2>

          <label>
            <span>새 비밀번호</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={form.password}
              onChange={onChange}
            />
          </label>
          <label>
            <span>새 비밀번호 확인</span>
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
            {changeLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : pwMessage ? (
              <div className="check__ani">
                <i className="fa-solid fa-check"></i>
              </div>
            ) : (
              "제출하기"
            )}
          </button>

          {/* <div className="check__ani"></div> */}
          {/* {isError ? <Alert message="가입된 이메일 입니다" /> : ""} */}
        </form>
      </div>
    </div>
  );

  // 테스트를 위해 changModal 과 InvalidAddress 순서 바꿈
  return isLoading ? (
    <Modal>
      <WhiteLoader />
    </Modal>
  ) : CheckData === "InValid EmailAddress" ? (
    <InvalidAddress />
  ) : (
    ChangePassword
  );
};

export default PwChangeScreen;
