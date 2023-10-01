import {
  DEFAULT_ADDRESS_FAILURE,
  DEFAULT_ADDRESS_REQUEST,
  DEFAULT_ADDRESS_SUCCESS,
  LATEST_ADDRESS_FAILURE,
  LATEST_ADDRESS_REQUEST,
  LATEST_ADDRESS_SUCCESS,
  RADIO_MODAL_FAILURE,
  RADIO_MODAL_REQUEST,
  RADIO_SET_FAILURE,
  RADIO_SET_REQUEST,
  RADIO_SET_SUCCESS,
  SAVE_ADDRESS_FAILURE,
  SAVE_ADDRESS_REQUEST,
  SAVE_ADDRESS_SUCCESS,
} from "../constant/addressConstant";

const initialState = {
  getAddress: "",
  latestAddress: "",
  radioSet: "1",
  saveAddress: "",
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    // DEFAULT ADDRESS
    case DEFAULT_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DEFAULT_ADDRESS_SUCCESS:
      console.log(action.payload, "DEFAULT_ADDRESS reducer");
      return {
        ...state,
        getAddress: action.payload,
      };
    case DEFAULT_ADDRESS_FAILURE:
      return {
        ...state,
      };

    // DEFAULT ADDRESS
    case LATEST_ADDRESS_REQUEST:
    case RADIO_SET_REQUEST:
    case RADIO_MODAL_REQUEST:
    case SAVE_ADDRESS_REQUEST:
      return {
        ...state,

        loading: true,
      };

    case LATEST_ADDRESS_FAILURE:
    case RADIO_SET_FAILURE:
    case RADIO_MODAL_FAILURE:
    case SAVE_ADDRESS_FAILURE:
      return {
        ...state,
      };

    case LATEST_ADDRESS_SUCCESS:
      console.log(action.payload, "DEFAULT_ADDRESS reducer");
      return {
        ...state,
        latestAddress: action.payload,
      };

    // Radio Set

    case RADIO_SET_SUCCESS:
      console.log(action.payload, "Radio Set reducer22222");
      return {
        ...state,
        radioSet: action.payload,
      };

    // Radio Modal Open

    case SAVE_ADDRESS_SUCCESS:
      console.log(action.payload, "Radio Set reducer");
      return {
        ...state,
        saveAddress: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;
