import { put, takeEvery, fork, all, call } from "redux-saga/effects";
import { push } from "redux-first-history";
import store from "../../store";
import {
  CART_ADD_ITEM_FAILURE,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAILURE,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CHECK_MY_SHIPPING_FAILURE,
  CHECK_MY_SHIPPING_REQUEST,
  CHECK_MY_SHIPPING_SUCCESS,
  CHECK_REVIEW_FAILURE,
  CHECK_REVIEW_REQUEST,
  CHECK_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  ORDER_SUBMIT_FAILURE,
  ORDER_SUBMIT_REQUEST,
  ORDER_SUBMIT_SUCCESS,
  SHIPPING_LOAD_FAILURE,
  SHIPPING_LOAD_REQUEST,
  SHIPPING_LOAD_SUCCESS,
  UPDATE_OPEN_FAILURE,
  UPDATE_OPEN_REQUEST,
  UPDATE_OPEN_SUCCESS,
  UPDATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
} from "../constant/cartConstant";
import axios from "axios";
import { jsonConfig } from "../../config/headerConfig";

// put, post는 반드시 타입을 정해서 보내줘야 바로바로 서버에서 알아 듣는다.

// Cart Add Item
function* CartAddItem(action) {
  const item = action.payload;
  console.log("CartAddItem Saga", item);

  try {
    console.log("CartAddItem Start");
    yield put({
      type: CART_ADD_ITEM_SUCCESS,
      payload: {
        userUUID: item.userUUID,
        productUUID: item.uuid,
        size: item.size,
        total: item.total,
        maxTotal: item.maxTotal,
        price: item.price,
        name: item.name,
        image: item.image,
        deliveryFee: item.deliveryFee,
      },
    });
    console.log("CartAddItem Middle");
    const result = localStorage.setItem(
      "cartItems",
      // JSON.stringify(item)
      JSON.stringify(store.getState().cart.cartItems)
    );

    console.log("CartAddItem End", result);
  } catch (error) {
    yield put({
      type: CART_ADD_ITEM_FAILURE,
      payload: error,
    });
  }
}

function* watchCartAddItem() {
  yield takeEvery(CART_ADD_ITEM_REQUEST, CartAddItem);
}

// Cart Remove Item
function* CartRemoveItem(action) {
  const item = action.payload;
  console.log(item, "CartRemoveItem");
  try {
    yield put({
      type: CART_REMOVE_ITEM_SUCCESS,
      payload: {
        userUUID: item.userUUID,
        productUUID: item.productUUID,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(store.getState().cart.cartItems)
    );
  } catch (error) {
    yield put({
      type: CART_REMOVE_ITEM_FAILURE,
      payload: error,
    });
  }
}

function* watchCartRemoveItem() {
  yield takeEvery(CART_REMOVE_ITEM_REQUEST, CartRemoveItem);
}

// Order Item Submit New
// const orderItemsSubmitAPI = (payload) => {
//   return axios.post("/api/order/submit", {
//     payload,
//   });
// };

function* OrderItemSubmit(action) {
  // console.log("OrderItemSubmit", action.payload);
  try {
    yield put({
      type: ORDER_SUBMIT_SUCCESS,
      payload: action.payload,
    });
    localStorage.setItem(
      "orderSubmitItems",
      JSON.stringify(action.payload)
      // JSON.stringify(store.getState().cart.orderSubmitItems)
    );
    yield put(push("/payment"));
  } catch (error) {
    yield put({
      type: ORDER_SUBMIT_FAILURE,
      payload: error,
    });
  }
}

function* watchOrderItemSubmit() {
  yield takeEvery(ORDER_SUBMIT_REQUEST, OrderItemSubmit);
}
// // CART ITEMS

// function* CartItem() {
//   try {
//     yield take(LOGIN_CHECK_SUCCESS);
//     const result = yield select(getProfile);
//     console.log(result, "Selector Result");
//     // const state2 = store.getState().auth;

//     yield put({
//       type: CART_ITEM_SUCCESS,
//       payload: result,
//     });
//   } catch (error) {
//     yield put({
//       type: CART_ITEM_FAILURE,
//       payload: error,
//     });
//   }
// }

// function* watchCartItem() {
//   yield takeEvery(CART_ITEM_REQUEST, CartItem);
// }

function* watchGetMyShipping() {
  const getMyShippingAPI = (payload) => {
    console.log(payload, "getMyShippingAPI111");
    return axios.get("/api/order/shipping", {
      params: {
        pages: payload,
      },
    });
  };

  function* GetMyShipping(action) {
    const { data } = yield call(getMyShippingAPI, action.payload);
    // const { profile } = store.getState().auth;
    // console.log(data, profile, "getMyShipping");

    if (data.msg === "No Cookie") {
      yield put({
        type: SHIPPING_LOAD_FAILURE,
      });
      // yield put(push("/"));
    } else {
      yield put({
        type: SHIPPING_LOAD_SUCCESS,
        payload: data,
      });
    }
  }

  yield takeEvery(SHIPPING_LOAD_REQUEST, GetMyShipping);
}

// Check My Shipping
const CheckMyShippingAPI = (payload) => {
  console.log(payload, "CheckMyShippingAPI111");
  return axios.get("/api/order/shipping", {
    params: {
      pages: payload,
    },
  });
};

function* CheckMyShipping(action) {
  const { data } = yield call(CheckMyShippingAPI, action.payload);

  console.log(data, "CheckMyShipping");

  try {
    yield put({
      type: CHECK_MY_SHIPPING_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: CHECK_MY_SHIPPING_FAILURE,
      payload: data,
    });
  }
}

function* watchCheckMyShipping() {
  yield takeEvery(CHECK_MY_SHIPPING_REQUEST, CheckMyShipping);
}
// Check Review
const CheckReviewAPI = (payload) => {
  if (Array.isArray(payload.current)) {
    console.log(payload.current, "CheckReviewAPI11111111");
    return axios.get("/api/product/review/check", {
      params: {
        products: payload.current.join(","),
      },
    });
  }
};

function* CheckReview(action) {
  // yield call(CheckReviewAPI, action.payload);

  const { data } = yield call(CheckReviewAPI, action.payload);
  try {
    yield put({
      type: CHECK_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: CHECK_REVIEW_FAILURE,
      payload: data,
    });
  }
}

function* watchCheckReview() {
  yield takeEvery(CHECK_REVIEW_REQUEST, CheckReview);
}

// Create Review
const CreateReviewAPI = (payload) => {
  console.log(payload, "CreateReviewAPI111");
  return axios.post("/api/product/review", payload, jsonConfig);
};

function* CreateReview(action) {
  const { data } = yield call(CreateReviewAPI, action.payload);

  console.log(data, "CreateReview");

  try {
    yield put({
      type: CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: CREATE_REVIEW_FAILURE,
      payload: data,
    });
  }
}

function* watchCreateReview() {
  yield takeEvery(CREATE_REVIEW_REQUEST, CreateReview);
}

// Update Open Review
const UpdateOpenAPI = (payload) => {
  console.log(payload, "UpdateOpenAPI111");
  return axios.get("/api/product/review/open", {
    params: {
      orderId: payload.orderId,
      productId: payload.productUUID,
      userId: payload.userId,
    },
  });
};

function* UpdateOpen(action) {
  const { data } = yield call(UpdateOpenAPI, action.payload);

  console.log(data, "UpdateOpen");

  try {
    yield put({
      type: UPDATE_OPEN_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: UPDATE_OPEN_FAILURE,
      payload: data,
    });
  }
}

function* watchUpdateOpen() {
  yield takeEvery(UPDATE_OPEN_REQUEST, UpdateOpen);
}

// Update Open Review
const UpdateReviewAPI = (payload) => {
  console.log(payload, "UpdateReviewAPI111111111");
  return axios.put(
    "/api/product/review/update",
    {
      orderId: payload.orderId,
      productId: payload.productId,
      userId: payload.userId,
      comments: payload.comments,
      rating: payload.rating,
    },
    jsonConfig
  );
};

function* UpdateReview(action) {
  const { data } = yield call(UpdateReviewAPI, action.payload);

  console.log(data, "UpdateReview");

  try {
    yield put({
      type: UPDATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: UPDATE_REVIEW_FAILURE,
      payload: data,
    });
  }
}

function* watchUpdateReview() {
  yield takeEvery(UPDATE_REVIEW_REQUEST, UpdateReview);
}

export default function* productSaga() {
  yield all([
    fork(watchCartAddItem),
    fork(watchCartRemoveItem),
    fork(watchOrderItemSubmit),
    fork(watchGetMyShipping),
    fork(watchCheckMyShipping),
    fork(watchCreateReview),
    fork(watchCheckReview),
    fork(watchUpdateOpen),
    fork(watchUpdateReview),
  ]);
}
