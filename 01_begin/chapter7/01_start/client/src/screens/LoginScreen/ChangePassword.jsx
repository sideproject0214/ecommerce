import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./ChangePassword.scss";
import Alert from "../../components/Alert";
import { usePutChangePasswordMutation } from "../../redux/apiSlices/extendedAuth";
import { addAlertSide } from "../../redux/slices/alertSlice";
import { saveMessage } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [putChangePassword, { data, isLoading, isError, isSuccess, error }] =
    usePutChangePasswordMutation();

  const [form, setValue] = useState({
    email: "",
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

    const { email } = form;

    if (!email) {
      setMessage("이메일을 적어주세요");
    } else {
      dispatch(saveMessage(null));
      putChangePassword(form);
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "올바른 이메일을 적어주세요",
          type: "ERROR",
        })
      );
    }
    if (isSuccess) {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "비밀번호 초기화 이메일이 발송되었습니다",
          type: "SUCCESS",
          emailHost: `${form.email.split("@")[1]}`,
        })
      );
    }
  }, [dispatch, isError, isSuccess, form.email]);
  // }, [dispatch, msg]);

  return (
    <div className="container">
      <div className="mypage-box">
        <form onSubmit={onSubmit} className="mypage-box__form">
          <Link to="/">
            <h1>SSaple</h1>
          </Link>
          <h2>비밀번호 변경</h2>
          <label>
            <span className="mypage-box__form__email">이메일</span>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="가입시 이메일을 적어주세요"
            />
          </label>
          {message ? <Alert message={message} /> : ""}
          <button className="submit">
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : data ? (
              <div className="check__ani">
                <i className="fa-solid fa-check"></i>
              </div>
            ) : (
              "제출하기"
            )}
          </button>

          {/* <div className="check__ani"></div> */}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
