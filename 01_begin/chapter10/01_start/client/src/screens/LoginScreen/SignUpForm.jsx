import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usePostSignUpMutation } from "../../redux/apiSlices/extendedAuth";
import Alert from "../../components/Alert";

const SignUpForm = (props) => {
  const [
    postSignUp,
    { isLoading, isSuccess, isError: errBoolean, data, error },
  ] = usePostSignUpMutation();
  console.log(
    isSuccess,
    data,
    error,
    errBoolean,
    "usePostSignUpMutation Error"
  );

  const [form, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;
    console.log(form, "form");
    const newUser = { name, email, password };

    console.log(newUser, "newUser");

    if (!name || !email || !password || !confirmPassword) {
      setMessage("모든 필드를 채워주세요");
    } else {
      if (password !== confirmPassword) {
        setMessage("비밀번호가 일치하지 않습니다");
      } else {
        await postSignUp(newUser);
      }
    }
  };

  useEffect(() => {
    if (errBoolean) {
      setIsError(true);
    }
  }, [errBoolean]);

  return (
    <>
      <form className={props.SignUpClassName} onSubmit={onSubmit}>
        <Link to="/">
          <h2>SSaple</h2>
        </Link>
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
            autoComplete="current-password"
            value={form.password}
            onChange={onChange}
          />
        </label>
        <label>
          <span>비밀번호 확인</span>
          <input
            type="password"
            name="confirmPassword"
            autoComplete="current-password"
            value={form.confirmPassword}
            onChange={onChange}
          />
        </label>
        {isError ? (
          <Alert message={error?.data} />
        ) : (
          <div style={{ height: "2.4rem" }} />
        )}
        <button className="submit">
          {isLoading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : isSuccess ? (
            <div className="check__ani">
              <i className="fa-solid fa-check"></i>
            </div>
          ) : (
            "회원 가입"
          )}
        </button>
      </form>
    </>
  );
};

SignUpForm.defaultProps = {
  SignUpClassName: "form m-right",
};

export default SignUpForm;
