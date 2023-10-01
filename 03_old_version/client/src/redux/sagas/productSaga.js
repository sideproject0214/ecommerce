import axios from "axios";
import { push } from "redux-first-history";

import { call, put, takeEvery, fork, all } from "redux-saga/effects";
import { dataConfig, jsonConfig } from "../../config/headerConfig";

import {
  PRODUCT_LOADING_FAILURE,
  PRODUCT_LOADING_REQUEST,
  PRODUCT_LOADING_SUCCESS,
  PRODUCT_NOIMAGE_MODIFY_FAILURE,
  PRODUCT_NOIMAGE_MODIFY_REQUEST,
  PRODUCT_NOIMAGE_MODIFY_SUCCESS,
  PRODUCT_ONE_LOADING_FAILURE,
  PRODUCT_ONE_LOADING_REQUEST,
  PRODUCT_ONE_LOADING_SUCCESS,
  PRODUCT_SEARCH_FAILURE,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_UPLOAD_FAILURE,
  PRODUCT_UPLOAD_REQUEST,
  PRODUCT_UPLOAD_SUCCESS,
} from "../constant/productConstant";

// All posts loaded

function* watchLoadProducts() {
  const loadPostAPI = (payload) => {
    console.log(payload, "watchLoadProducts");
    return axios.get(`/api/product/pagination/${payload}`);
  };

  function* loadProducts(action) {
    try {
      const { data } = yield call(loadPostAPI, action.payload);
      console.log(data, "productSaga");

      yield put({
        type: PRODUCT_LOADING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: PRODUCT_LOADING_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(PRODUCT_LOADING_REQUEST, loadProducts);
}
// 모든 포스트를 받는 경우
// function* watchLoadProducts() {
//   function* loadProducts() {
//     const loadPostAPI = () => {
//       return axios.get("/api/product/all");
//     };

//     try {
//       const { data } = yield call(loadPostAPI);
//       console.log(data, "productSaga");

//       yield put({
//         type: PRODUCT_LOADING_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       yield put({
//         type: PRODUCT_LOADING_FAILURE,
//         payload: error,
//       });
//     }
//   }

//   yield takeEvery(PRODUCT_LOADING_REQUEST, loadProducts);
// }

// All posts loaded

const loadProducntOneAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/product/${payload}`);
};

function* loadProductOne(action) {
  try {
    const { data } = yield call(loadProducntOneAPI, action.payload);

    yield put({
      type: PRODUCT_ONE_LOADING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: PRODUCT_ONE_LOADING_FAILURE,
      payload: error,
    });
  }
}

function* watchLoadProductOne() {
  yield takeEvery(PRODUCT_ONE_LOADING_REQUEST, loadProductOne);
}

// upload post

const uploadProductAPI = (payload) => {
  console.log(payload);
  return axios.post(`/api/product/upload`, payload, dataConfig);
};

function* uploadProduct(action) {
  try {
    const { data } = yield call(uploadProductAPI, action.payload);
    console.log(data, "uploadProduct");
    yield put({
      type: PRODUCT_UPLOAD_SUCCESS,
      payload: data,
    });
    yield put(push(`/product/${data.uuid}`));
  } catch (error) {
    yield put({
      type: PRODUCT_UPLOAD_FAILURE,
      payload: error,
    });
  }
}

function* watchUploadProduct() {
  yield takeEvery(PRODUCT_UPLOAD_REQUEST, uploadProduct);
}

// // Loaded Image Delete

// function* watchLoadedImageDelete() {
//   function* LoadedImageDelete(action) {
//     try {
//       yield put({
//         type: PRODUCT_IMAGE_DELETE_SUCCESS,
//         payload: action.payload,
//       });
//     } catch (error) {
//       yield put({
//         type: PRODUCT_IMAGE_DELETE_FAILURE,
//         payload: error,
//       });
//     }
//   }

//   yield takeEvery(PRODUCT_IMAGE_DELETE_REQUEST, LoadedImageDelete);
// }

// // Loaded Image Delete

// function* watchThumbnailDelete() {
//   function* ThumbnailDelete(action) {
//     try {
//       yield put({
//         type: PRODUCT_THUMBNAIL_DELETE_SUCCESS,
//         payload: action.payload,
//       });
//     } catch (error) {
//       yield put({
//         type: PRODUCT_THUMBNAIL_DELETE_FAILURE,
//         payload: error,
//       });
//     }
//   }

//   yield takeEvery(PRODUCT_THUMBNAIL_DELETE_REQUEST, ThumbnailDelete);
// }

// upload Modified post

function* watchModifyNoImage() {
  const ModifyNoImageAPI = (payload) => {
    console.log(payload);
    return axios.post(`/api/admin/upload/modify/noimage`, payload, jsonConfig);
  };

  function* ModifyNoImage(action) {
    try {
      const { data } = yield call(ModifyNoImageAPI, action.payload);
      console.log(data, "ModifyNoImage");
      yield put({
        type: PRODUCT_NOIMAGE_MODIFY_SUCCESS,
        payload: data,
      });
      yield put(push(`/product/${data.uuid}`));
    } catch (error) {
      yield put({
        type: PRODUCT_NOIMAGE_MODIFY_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(PRODUCT_NOIMAGE_MODIFY_REQUEST, ModifyNoImage);
}

function* watchSearchProduct() {
  const SearchProductAPI = (payload) => {
    console.log(payload);
    return axios.get(`/api/product/search/${payload}`);
  };

  function* SearchProduct(action) {
    try {
      const { data } = yield call(SearchProductAPI, action.payload);
      console.log(data, "SearchProduct");
      yield put({
        type: PRODUCT_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: PRODUCT_SEARCH_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(PRODUCT_SEARCH_REQUEST, SearchProduct);
}

export default function* productSaga() {
  yield all([
    fork(watchLoadProducts),
    fork(watchLoadProductOne),

    fork(watchUploadProduct),

    fork(watchSearchProduct),
    fork(watchModifyNoImage),
  ]);
}
