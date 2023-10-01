import store from "../store";
import { LOGIN_CHECK_REQUEST } from "../redux/constant/authConstant";

const loadUser = () => {
  try {
    store.dispatch({
      type: LOGIN_CHECK_REQUEST,
    });
  } catch (e) {
    console.log(e);
  }
};

export default loadUser;
