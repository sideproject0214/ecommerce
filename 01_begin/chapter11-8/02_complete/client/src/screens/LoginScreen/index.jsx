import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import MovingSide from "./MovingSide";
import "./LoginScreen.scss";
import { removeAlertSide } from "../../redux/slices/alertSlice";

const LoginScreen = () => {
  const state = useSelector((state) => state.alert);
  const [signup, setSignup] = useState(false);
  const dispatch = useDispatch();
  const onClickSignup = () => {
    setSignup(!signup);
    if (state.length !== 0) {
      dispatch(removeAlertSide(state[0].id));
    }
  };

  return (
    <div>
      <div className="login-contatiner">
        <div className="cont">
          {signup ? <SignUpForm /> : <LoginForm />}
          <MovingSide signup={signup} onClickSignup={onClickSignup} />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
