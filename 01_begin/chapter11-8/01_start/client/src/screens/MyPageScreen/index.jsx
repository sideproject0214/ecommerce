import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetinitialPwCheckQuery,
  usePutChangeMyPasswordMutation,
} from "../../redux/apiSlices/extendedAuth";
import { addAlertSide } from "../../redux/slices/alertSlice";
import "./MyPageScreen.scss";
import { Helmet } from "react-helmet";

const MyPageScreen = () => {
  const [form, setValue] = useState({
    currentPw: "",
    password: "",
    confirmPassword: "",
  });
  const { initialMsg } = useGetinitialPwCheckQuery("getinitialPwCheck", {
    selectFromResult: ({ data }) => ({
      initialMsg: data?.msg,
    }),
  });

  console.log(initialMsg, "MyPage Screen");
  // const { myPwMessage } = useSelector((state) => state.auth);

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const [putChangeMyPassword, { myPwMessage, isLoading, isSuccess }] =
    usePutChangeMyPasswordMutation({
      selectFromResult: ({ data, isSuccess, isLoading }) => ({
        myPwMessage: data?.msg,
        isSuccess,
        isLoading,
      }),
    });

  const [reset, setReset] = useState(false);

  console.log(myPwMessage, "mypageSrceeen myPwMessage");

  const onChange = (e) => {
    if (message) {
      setMessage("");
    }
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
    setReset(false);
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
        putChangeMyPassword(form);
      }
    }
  };

  useEffect(() => {
    if (myPwMessage === "PW CHANGE SUCCESS") {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "성공적으로 변경했습니다",
          type: "SUCCESS",
        })
      );
      setValue({
        currentPw: "",
        password: "",
        confirmPassword: "",
      });
      setReset(true);
    } else if (myPwMessage === "CurrentPw do not match") {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "현재 비밀번호가 일치하지 않습니다",
          type: "ERROR",
        })
      );
      setValue({
        currentPw: "",
        password: "",
        confirmPassword: "",
      });
      setReset(true);
    }
  }, [dispatch, myPwMessage]);

  console.log(reset, "reset Value");
  return (
    <>
      <Helmet>
        <meta name="사플쇼핑" content="남자 옷, 여자 옷" />
        <title>마이 페이지 | Ecommerce</title>
      </Helmet>
      <div className="container">
        <div className="mypage-box">
          <form onSubmit={onSubmit} className="mypage-box__form">
            <h2>비밀번호 변경</h2>
            {initialMsg === "Initial Pw" && message === "" ? (
              <div className="mypage-box__form__msg">
                <p>초기 비밀번호는 123 입니다</p>
              </div>
            ) : message ? (
              <div className="mypage-box__form__msg">{message}</div>
            ) : (
              <div className="mypage-box__form__msg_"></div>
            )}

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

            <button className="submit">
              {reset ? (
                isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                ) : isSuccess ? (
                  <div className="check__ani">
                    <i className="fa-solid fa-check"></i>
                  </div>
                ) : (
                  "제출하기"
                )
              ) : (
                "제출하기"
              )}
            </button>

            <div className="check__ani"></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MyPageScreen;
