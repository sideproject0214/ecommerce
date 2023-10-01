import {
  NORMAL_LOGIN_REQUEST,
  NORMAL_LOGIN_SUCCESS,
  NORMAL_LOGIN_FAILURE,
  REFRESH_ACCESSTOKEN_GET_SUCCESS,
  REFRESH_ACCESSTOKEN_GET_FAILURE,
  NAVER_API_REQUEST,
  NAVER_API_SUCCESS,
  NAVER_API_FAILURE,
  LOGIN_CHECK_REQUEST,
  LOGIN_CHECK_SUCCESS,
  LOGIN_CHECK_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  KAKAO_API_REQUEST,
  KAKAO_API_SUCCESS,
  KAKAO_API_FAILURE,
  GOOGLE_API_REQUEST,
  GOOGLE_API_SUCCESS,
  GOOGLE_API_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  EMAIL_TOKEN_AUTH_REQUEST,
  EMAIL_TOKEN_AUTH_FAILURE,
  EMAIL_TOKEN_AUTH_SUCCESS,
  LOGIN_ERROR_CLEAR_REQUEST,
  LOGIN_ERROR_CLEAR_FAILURE,
  LOGIN_ERROR_CLEAR_SUCCESS,
} from "../constant/authConstant";

const initialState = {
  loading: false,
  profile: [],
  redirectURI: "",
  accessToken: "",
  error: "",
  errMsg: "",
  signUpErrMsg: "",
  emailSend: false,
  emailAuth: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // REQUEST
    case LOGOUT_REQUEST:
    case LOGIN_CHECK_REQUEST:
    case NORMAL_LOGIN_REQUEST:
    case NAVER_API_REQUEST:
    case KAKAO_API_REQUEST:
    case GOOGLE_API_REQUEST:
    case SIGNUP_REQUEST:
    case EMAIL_TOKEN_AUTH_REQUEST:
      // case LOGIN_ERROR_CLEAR_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // FAILURE
    case NAVER_API_FAILURE:
    case KAKAO_API_FAILURE:
    case GOOGLE_API_FAILURE:
    case REFRESH_ACCESSTOKEN_GET_FAILURE:
    case LOGOUT_FAILURE:
    case LOGIN_ERROR_CLEAR_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    // LOGIN_CHECK
    case LOGIN_CHECK_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        accessToken: action.payload.token,
        loading: false,
      };
    case LOGIN_CHECK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // NAVER_LOGIN
    case NAVER_API_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        redirectURI: action.payload,
        loading: false,
      };

    // KAKAO_LOGIN
    case KAKAO_API_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        redirectURI: action.payload,
        loading: false,
      };

    // GOOGLE_LOGIN
    case GOOGLE_API_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        redirectURI: action.payload,
        loading: false,
      };

    // NORMAL_LOGIN
    case NORMAL_LOGIN_SUCCESS:
      console.log(action.payload, "success console");
      return {
        ...state,
        profile: action.payload,
        accessToken: action.payload.token,
        loading: false,
      };
    case NORMAL_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        errMsg: action.payload,
      };

    // REFRESH_TOKEN
    case REFRESH_ACCESSTOKEN_GET_SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
      };

    // LOGOUT
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: [],
        redirectURI: action.payload,
      };

    // SIGNUP
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        emailSend: true,
        emailName: action.payload.emailName,
        emailHost: action.payload.emailHost,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        emailSend: false,
        errMsg: "Duplicate email address",
      };

    // Email token
    case EMAIL_TOKEN_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        emailAuth: action.payload,
      };
    case EMAIL_TOKEN_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        emailAuth: action.payload,
      };

    case LOGIN_ERROR_CLEAR_REQUEST:
      return {
        ...state,
      };
    case LOGIN_ERROR_CLEAR_SUCCESS:
      return {
        ...state,
        errMsg: "",
      };

    // DEFAULT
    default:
      return state;
  }
};

export default authReducer;
