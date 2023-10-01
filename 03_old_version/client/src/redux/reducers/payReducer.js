import {
  KAKAO_PAY_FAILURE,
  KAKAO_PAY_REQUEST,
  KAKAO_PAY_SUCCESS,
  MODAL_OPEN_FAILURE,
  MODAL_CANCEL_CLOSE_REQUEST,
  MODAL_FAILURE_CLOSE_REQUEST,
  MODAL_SUCCESS_CLOSE_REQUEST,
  MODAL_SUCCESS_CLOSE_SUCCESS,
  MODAL_CANCEL_CLOSE_SUCCESS,
  MODAL_FAILURE_CLOSE_SUCCESS,
  MODAL_SUCCESS_CLOSE_FAILURE,
  MODAL_CANCEL_CLOSE_FAILURE,
  MODAL_FAILURE_CLOSE_FAILURE,
  MODAL_OPEN_REQUEST,
  MODAL_OPEN_SUCCESS,
  ORDER_ITEMS_RESET_REQUEST,
  ORDER_ITEMS_RESET_SUCCESS,
  ORDER_ITEMS_RESET_FAILURE,
  KAKAO_PAY_CANCEL_REQUEST,
  KAKAO_PAY_CANCEL_INFO_SAVE_FAILURE,
  KAKAO_PAY_CANCEL_INFO_SAVE_REQUEST,
  KAKAO_PAY_CANCEL_INFO_SAVE_SUCCESS,
} from "../constant/payConstant";

const orderPayItemsFromLocalStorage = localStorage.getItem("orderPayItems")
  ? JSON.parse(localStorage.getItem("orderPayItems"))
  : [];

const initialState = {
  loading: false,
  payLoading: false,
  orderPayItems: orderPayItemsFromLocalStorage,
  kakaoPay: "",
  kakaoPayTid: "",
  payRedirectURI: "",
  error: "",
  modal: false,
  cancel: false,
  failure: false,
  cartItems: "",
  cancelInfo: "",
};

const payReducer = (state = initialState, action) => {
  switch (action.type) {
    // Cart

    case MODAL_SUCCESS_CLOSE_REQUEST:
    case MODAL_CANCEL_CLOSE_REQUEST:
    case MODAL_FAILURE_CLOSE_REQUEST:
    case KAKAO_PAY_CANCEL_INFO_SAVE_REQUEST:
    case KAKAO_PAY_CANCEL_REQUEST:
      return {
        ...state,
        kakaoPay: "",

        loading: true,
        payLoading: true,
        cancel: false,
      };

    // MODAL
    case MODAL_OPEN_FAILURE:
    case MODAL_SUCCESS_CLOSE_FAILURE:
    case MODAL_CANCEL_CLOSE_FAILURE:
    case MODAL_FAILURE_CLOSE_FAILURE:
    case KAKAO_PAY_CANCEL_INFO_SAVE_FAILURE:
      return {
        loading: true,
      };

    case MODAL_OPEN_REQUEST:
      console.log("MODAL_OPEN_REQUEST", action.payload);
      return {
        ...state,
        orderPayItems: action.payload,
        modal: true,
        loading: true,
        payLoading: true,
        failure: false,
        cancel: false,
      };

    case MODAL_OPEN_SUCCESS:
      console.log("MODAL_OPEN_SUCCESS", action.payload);
      // const item = action.payload
      return {
        ...state,
        // orderPayItems: action.payload,
        modal: true,
        loading: false,
        payLoading: false,
      };

    case MODAL_SUCCESS_CLOSE_SUCCESS:
      return {
        ...state,
        modal: false,
        loading: false,
        payLoading: false,
      };

    case MODAL_CANCEL_CLOSE_SUCCESS:
      return {
        ...state,
        kakaoPay: "",
        modal: false,
        loading: false,
        payLoading: false,
        cancel: true,
      };
    case MODAL_FAILURE_CLOSE_SUCCESS:
      return {
        ...state,
        kakaoPay: "",
        modal: false,
        loading: false,
        payLoading: false,
        failure: true,
      };

    // Kakao Pay
    case KAKAO_PAY_REQUEST:
      return {
        ...state,
        kakaoPay: "",
        loading: true,
        payLoading: true,
      };

    case KAKAO_PAY_SUCCESS:
      const item = action.payload;

      return {
        ...state,
        kakaoPay: item.next_redirect_pc_url,
        kakaoPayTid: item.tid,
        loading: false,
        payLoading: true,
      };

    case KAKAO_PAY_FAILURE:
      return {
        loading: true,
        error: action.payload,
      };

    case KAKAO_PAY_CANCEL_INFO_SAVE_SUCCESS:
      return {
        cancelInfo: action.payload,
      };

    // ORDER_ITEMS_RESET
    case ORDER_ITEMS_RESET_REQUEST:
      return {
        ...state,
      };

    case ORDER_ITEMS_RESET_SUCCESS:
      // 뭔가 작동이 안되면 이거 지우기

      //
      const auth = JSON.parse(
        localStorage.getItem("orderPayItems")
      ).partner_user_id;

      const filteredCartItems = JSON.parse(localStorage.getItem("cartItems"));
      const result = filteredCartItems.filter((x) => x.userUUID !== auth);
      // console.log(filteredCartItems, "existCartItems");
      // console.log(result, "existCartItems2");
      localStorage.setItem("cartItems", JSON.stringify(result));
      // console.log("cartItems2", localStorage.getItem("cartItems2"));
      localStorage.removeItem("orderPayItems");
      localStorage.removeItem("orderSubmitItems");
      return {
        ...state,
        // cartItems: store.getState().cart.cartItems
        //   ? store.getState().cart.cartItems
        //   : "",
        // loading: false,
        // payLoading: true,
      };

    case ORDER_ITEMS_RESET_FAILURE:
      return {
        loading: true,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default payReducer;
