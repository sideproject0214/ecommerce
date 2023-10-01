import {
  MYPAGE_PASSWORD_CHANGE_FAILURE,
  MYPAGE_PASSWORD_CHANGE_REQUEST,
  MYPAGE_PASSWORD_CHANGE_SUCCESS,
} from "../constant/myPageConstant";

const initialState = {
  msg: "",
  msgState: false,
  loading: false,
};

const myPageReducer = (state = initialState, action) => {
  switch (action.type) {
    // Cart

    case MYPAGE_PASSWORD_CHANGE_REQUEST:
      return {
        ...state,
        msgState: false,

        loading: true,
      };

    case MYPAGE_PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        msg: action.payload.msg,
        msgState: true,
        loading: false,
      };

    case MYPAGE_PASSWORD_CHANGE_FAILURE:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default myPageReducer;
