import axios from "axios";
import { call, put, takeEvery, fork, all } from "redux-saga/effects";
import {
  KAKAO_PAY_FAILURE,
  KAKAO_PAY_REQUEST,
  KAKAO_PAY_SUCCESS,
  MODAL_OPEN_FAILURE,
  MODAL_OPEN_REQUEST,
  MODAL_OPEN_SUCCESS,
  MODAL_SUCCESS_CLOSE_SUCCESS,
  MODAL_SUCCESS_CLOSE_REQUEST,
  MODAL_SUCCESS_CLOSE_FAILURE,
  MODAL_CANCEL_CLOSE_SUCCESS,
  MODAL_CANCEL_CLOSE_FAILURE,
  MODAL_CANCEL_CLOSE_REQUEST,
  MODAL_FAILURE_CLOSE_SUCCESS,
  MODAL_FAILURE_CLOSE_FAILURE,
  MODAL_FAILURE_CLOSE_REQUEST,
  ORDER_ITEMS_RESET_SUCCESS,
  ORDER_ITEMS_RESET_FAILURE,
  ORDER_ITEMS_RESET_REQUEST,
  KAKAO_PAY_CANCEL_SUCCESS,
  KAKAO_PAY_CANCEL_FAILURE,
  KAKAO_PAY_CANCEL_REQUEST,
  KAKAO_PAY_CANCEL_INFO_SAVE_SUCCESS,
  KAKAO_PAY_CANCEL_INFO_SAVE_FAILURE,
  KAKAO_PAY_CANCEL_INFO_SAVE_REQUEST,
} from "../constant/payConstant";
import store from "../../store";
import { jsonConfig } from "../../config/headerConfig";
import { push } from "redux-first-history";

// Kakao Pay
const kakaoPayAPI = (payload) => {
  console.log("paySaga", payload);
  return axios.get("/api/pay/kakao", {
    params: {
      partner_order_id: payload.partner_order_id,
      partner_user_id: payload.partner_user_id,
      item_name: payload.item_name,
      quantity: payload.quantity,
      total_amount: payload.total_amount,
      vat_amount: payload.total_amount * 0.1,
      tax_free_amount: 0,
    },
    // params: {
    //   partner_order_id: "partner_order_id",
    //   partner_user_id: "partner_user_id",
    //   item_name: "초코파이",
    //   quantity: 1,
    //   total_amount: 2200,
    //   vat_amount: 200,
    //   tax_free_amount: 0,
    // },
  });
};

function* kakaoPay(action) {
  try {
    const { data } = yield call(kakaoPayAPI, action.payload);
    // console.log("KakaoPay_approval_url", data);
    yield put({
      type: KAKAO_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: KAKAO_PAY_FAILURE,
      payload: error,
    });
  }
}

function* watchKakaoPay() {
  yield takeEvery(KAKAO_PAY_REQUEST, kakaoPay);
}

// MODAL OPEN

const submitOrderAPI = (data) => {
  return axios.post("/api/order/submit", data, jsonConfig);
};

function* ModalOpen() {
  try {
    const { data } = yield call(
      submitOrderAPI,
      store.getState().pay.orderPayItems
    );
    console.log(data, "watchModalOpoen");

    yield put({
      type: MODAL_OPEN_SUCCESS,
    });

    // 결제 실패로 재 로딩시 다시 입력하는 귀찮음을 막기 위해 저장함
    localStorage.setItem(
      "orderPayItems",
      JSON.stringify(store.getState().pay.orderPayItems)
    );
  } catch (error) {
    yield put({
      type: MODAL_OPEN_FAILURE,
    });
  }
}

function* watchModalOpen() {
  yield takeEvery(MODAL_OPEN_REQUEST, ModalOpen);
}
// MODAL SUCCESS CLOSE

function* watchModalSuccessClose() {
  function* ModalSuccessClose() {
    try {
      yield put({
        type: MODAL_SUCCESS_CLOSE_SUCCESS,
      });
    } catch (error) {
      yield put({
        type: MODAL_SUCCESS_CLOSE_FAILURE,
      });
    }
  }

  yield takeEvery(MODAL_SUCCESS_CLOSE_REQUEST, ModalSuccessClose);
}
// MODAL CANCEL CLOSE

function* watchModalCancelClose() {
  function* ModalCancelClose() {
    try {
      yield put({
        type: MODAL_CANCEL_CLOSE_SUCCESS,
      });
    } catch (error) {
      yield put({
        type: MODAL_CANCEL_CLOSE_FAILURE,
      });
    }
  }

  yield takeEvery(MODAL_CANCEL_CLOSE_REQUEST, ModalCancelClose);
}

// MODAL FAILURE CLOSE

function* watchModalFailureClose() {
  function* ModalFailureClose() {
    try {
      yield put({
        type: MODAL_FAILURE_CLOSE_SUCCESS,
      });
    } catch (error) {
      yield put({
        type: MODAL_FAILURE_CLOSE_FAILURE,
      });
    }
  }

  yield takeEvery(MODAL_FAILURE_CLOSE_REQUEST, ModalFailureClose);
}

// ORDER_ITEMS_RESET

function* watchOrderItemsReset() {
  // const myOrdersAPI = axios.get
  function* OrderItemsReset() {
    try {
      yield put({
        type: ORDER_ITEMS_RESET_SUCCESS,
      });
    } catch (error) {
      yield put({
        type: ORDER_ITEMS_RESET_FAILURE,
        payload: error.message,
      });
    }
  }

  yield takeEvery(ORDER_ITEMS_RESET_REQUEST, OrderItemsReset);
}

// Kakao Pay
const kakaoPayCancelAPI = (payload) => {
  console.log("Cancel paySaga", payload);

  return axios.post(
    "/api/pay/kakao/payment/cancel",
    {
      partner_order_id: payload.partner_order_id,
      cancel_amount: payload.cancel_amount,
      cancel_tax_free_amount: 0, //} 취소 비과세 금액 : 비과세는 주로 농산물, 축산물, 수산물, 임산물 등
    },
    jsonConfig
  );
};

function* kakaoPayCancel(action) {
  try {
    const { data } = yield call(kakaoPayCancelAPI, action.payload);
    // console.log("KakaoPayCancel_approval_url", data);
    yield put({
      type: KAKAO_PAY_CANCEL_SUCCESS,
      payload: data,
    });
    yield put(push("/shipping/cancel"));
  } catch (error) {
    yield put({
      type: KAKAO_PAY_CANCEL_FAILURE,
      payload: error,
    });
  }
}

function* watchKakaoPayCancel() {
  yield takeEvery(KAKAO_PAY_CANCEL_REQUEST, kakaoPayCancel);
}

// kakao pay info save
function* kakaoPayCancelInfoSave(action) {
  try {
    yield put({
      type: KAKAO_PAY_CANCEL_INFO_SAVE_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: KAKAO_PAY_CANCEL_INFO_SAVE_FAILURE,
      payload: error,
    });
  }
}

function* watchKakaoPayCancelInfoSave() {
  yield takeEvery(KAKAO_PAY_CANCEL_INFO_SAVE_REQUEST, kakaoPayCancelInfoSave);
}

export default function* paySaga() {
  yield all([
    fork(watchKakaoPay),
    fork(watchKakaoPayCancel),
    fork(watchKakaoPayCancelInfoSave),
    fork(watchModalOpen),
    fork(watchModalSuccessClose),
    fork(watchModalCancelClose),
    fork(watchModalFailureClose),
    fork(watchOrderItemsReset),
  ]);
}
