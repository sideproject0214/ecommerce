import {} from "../constant/authConstant";
import {
  USERS_LOAD_FAILURE,
  USERS_LOAD_REQUEST,
  USERS_LOAD_SUCCESS,
} from "../constant/userConstant";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USERS_LOAD_SUCCESS:
      console.log(action.payload, Date.now(), "success console");
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case USERS_LOAD_FAILURE:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
