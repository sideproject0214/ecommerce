import axios from "axios";
import { push } from "redux-first-history";
import { call, put, takeEvery, fork, all } from "redux-saga/effects";
import { dataConfig, jsonConfig } from "../../config/headerConfig";

import {
  ADMIN_DELETE_REVIEW_FAILURE,
  ADMIN_DELETE_REVIEW_REQUEST,
  ADMIN_DELETE_REVIEW_SUCCESS,
  ADMIN_ORDER_LIST_FAILURE,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ADMIN_POST_FAILURE,
  ADMIN_POST_REQUEST,
  ADMIN_POST_SUCCESS,
  ADMIN_PRODUCT_ONE_LOAD_POST_FAILURE,
  ADMIN_PRODUCT_ONE_LOAD_POST_REQUEST,
  ADMIN_PRODUCT_ONE_LOAD_POST_SUCCESS,
  ADMIN_REVIEW_FAILURE,
  ADMIN_REVIEW_REQUEST,
  ADMIN_REVIEW_SUCCESS,
  ADMIN_SEARCH_FAILURE,
  ADMIN_SEARCH_REQUEST,
  ADMIN_SEARCH_SUCCESS,
  ADMIN_SUMMARY_FAILURE,
  ADMIN_SUMMARY_REQUEST,
  ADMIN_SUMMARY_SUCCESS,
  ADMIN_TRACKING_NUMBER_FAILURE,
  ADMIN_TRACKING_NUMBER_REQUEST,
  ADMIN_TRACKING_NUMBER_SUCCESS,
  ADMIN_USER_FAILURE,
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCCESS,
  DELETE_ADMIN_POST_FAILURE,
  DELETE_ADMIN_POST_REQUEST,
  DELETE_ADMIN_POST_SUCCESS,
  DELETE_ADMIN_USER_FAILURE,
  DELETE_ADMIN_USER_REQUEST,
  DELETE_ADMIN_USER_SUCCESS,
  INITIALIZE_PASSWORD_FAILURE,
  INITIALIZE_PASSWORD_REQUEST,
  INITIALIZE_PASSWORD_SUCCESS,
  MAIN_IMAGE_DELETE_FAILURE,
  MAIN_IMAGE_DELETE_REQUEST,
  MAIN_IMAGE_DELETE_SUCCESS,
  MAKE_ADMIN_USER_FAILURE,
  MAKE_ADMIN_USER_REQUEST,
  MAKE_ADMIN_USER_SUCCESS,
  PRODUCT_IMAGE_MODIFY_FAILURE,
  PRODUCT_IMAGE_MODIFY_REQUEST,
  PRODUCT_IMAGE_MODIFY_SUCCESS,
  THUMBNAIL_IMAGE_DELETE_FAILURE,
  THUMBNAIL_IMAGE_DELETE_REQUEST,
  THUMBNAIL_IMAGE_DELETE_SUCCESS,
} from "../constant/adminConstant";

// Admin Summary
function* watchAdminSummary() {
  const adminSummaryAPI = (payload) => {
    return axios.get("/api/admin");
  };

  function* adminSummary(action) {
    try {
      const { data } = yield call(adminSummaryAPI);

      yield put({
        type: ADMIN_SUMMARY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: ADMIN_SUMMARY_FAILURE,
        payload: error,
      });
      yield put(push("/login/error"));
    }
  }

  yield takeEvery(ADMIN_SUMMARY_REQUEST, adminSummary);
}

// Get Admin User Summary
function* watchAdminUser() {
  const adminUserAPI = (payload) => {
    console.log(payload, "adminUser");
    return axios.get("/api/admin/user", { params: payload });
  };

  function* adminSummary(action) {
    try {
      const { data } = yield call(adminUserAPI, action.payload);

      yield put({
        type: ADMIN_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: ADMIN_USER_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(ADMIN_USER_REQUEST, adminSummary);
}

// Make Admin User
function* watchMakeAdminUser() {
  const MakeAdminUserAPI = (payload) => {
    console.log(payload, "payload");
    return axios.put(
      "/api/admin/user/make",
      {
        user: payload,
      },
      jsonConfig
    );
  };

  function* makeAdmin(action) {
    try {
      const { data } = yield call(MakeAdminUserAPI, action.payload);

      yield put({
        type: MAKE_ADMIN_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: MAKE_ADMIN_USER_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(MAKE_ADMIN_USER_REQUEST, makeAdmin);
}

// Delete Admin User
function* watchDeleteAdminUser() {
  const DeleteAdminUserAPI = (payload) => {
    console.log(payload, "payload");
    return axios.put(
      "/api/admin/user/delete",
      {
        data: payload,
      },
      jsonConfig
    );
  };

  function* deleteAdmin(action) {
    try {
      const { data } = yield call(DeleteAdminUserAPI, action.payload);

      yield put({
        type: DELETE_ADMIN_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: DELETE_ADMIN_USER_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(DELETE_ADMIN_USER_REQUEST, deleteAdmin);
}

// Initiallize Password
function* watchInitializePassswor() {
  const InitializePasssworAPI = (payload) => {
    console.log(payload, "payload");
    return axios.get("/api/admin/user/initialize", { params: payload });
  };

  function* initiallizePassword(action) {
    try {
      const { data } = yield call(InitializePasssworAPI, action.payload);

      yield put({
        type: INITIALIZE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: INITIALIZE_PASSWORD_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(INITIALIZE_PASSWORD_REQUEST, initiallizePassword);
}

// Request Post
function* watchAdminPost() {
  const AdminPostAPI = (payload) => {
    console.log(payload, "payload");
    return axios.get("/api/admin/post", { params: payload });
  };

  function* adminPost(action) {
    try {
      const { data } = yield call(AdminPostAPI, action.payload);

      yield put({
        type: ADMIN_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: ADMIN_POST_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(ADMIN_POST_REQUEST, adminPost);
}

// Request Post
function* watchDeletePost() {
  const DeletePostAPI = (payload) => {
    console.log(payload, "payload");
    return axios.put(
      "/api/admin/post/delete",
      {
        data: payload,
      },
      jsonConfig
    );
  };

  function* DeletePost(action) {
    try {
      const { data } = yield call(DeletePostAPI, action.payload);

      yield put({
        type: DELETE_ADMIN_POST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: DELETE_ADMIN_POST_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(DELETE_ADMIN_POST_REQUEST, DeletePost);
}

// Admin Product One
const adminLoadProductOneAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/product/${payload}`);
};

function* adminLoadProductOne(action) {
  try {
    const { data } = yield call(adminLoadProductOneAPI, action.payload);

    yield put({
      type: ADMIN_PRODUCT_ONE_LOAD_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: ADMIN_PRODUCT_ONE_LOAD_POST_FAILURE,
      payload: error,
    });
  }
}

function* watchAdminLoadProductOne() {
  yield takeEvery(ADMIN_PRODUCT_ONE_LOAD_POST_REQUEST, adminLoadProductOne);
}

// Loaded Image Delete

function* watchLoadedImageDelete() {
  function* LoadedImageDelete(action) {
    try {
      yield put({
        type: MAIN_IMAGE_DELETE_SUCCESS,
        payload: action.payload,
      });
    } catch (error) {
      yield put({
        type: MAIN_IMAGE_DELETE_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(MAIN_IMAGE_DELETE_REQUEST, LoadedImageDelete);
}

// Loaded Image Delete

function* watchThumbnailDelete() {
  function* ThumbnailDelete(action) {
    try {
      yield put({
        type: THUMBNAIL_IMAGE_DELETE_SUCCESS,
        payload: action.payload,
      });
    } catch (error) {
      yield put({
        type: THUMBNAIL_IMAGE_DELETE_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(THUMBNAIL_IMAGE_DELETE_REQUEST, ThumbnailDelete);
}

// upload Modified post

function* watchModifyImage() {
  const ModifyImageAPI = (payload) => {
    console.log(payload);
    return axios.put(`/api/admin/upload/modify/image`, payload, dataConfig);
  };

  function* ModifyImage(action) {
    try {
      const { data } = yield call(ModifyImageAPI, action.payload);
      console.log(data, "ModifyImage");
      yield put({
        type: PRODUCT_IMAGE_MODIFY_SUCCESS,
        payload: data,
      });
      yield put(push(`/product/${data.uuid}`));
    } catch (error) {
      yield put({
        type: PRODUCT_IMAGE_MODIFY_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(PRODUCT_IMAGE_MODIFY_REQUEST, ModifyImage);
}

// Check My Shipping

function* watchAdminOrderList() {
  const AdminOrderListAPI = (payload) => {
    console.log(payload, "AdminOrderListAPI");
    return axios.get("/api/admin/order", {
      params: {
        pages: payload,
      },
    });
  };

  function* AdminOrderList(action) {
    const { data } = yield call(AdminOrderListAPI, action.payload);

    console.log(data, "AdminOrderList");

    try {
      yield put({
        type: ADMIN_ORDER_LIST_SUCCESS,
        payload: data,
      });

      window.scrollTo(0, 0);
    } catch (e) {
      console.log(e);
      yield put({
        type: ADMIN_ORDER_LIST_FAILURE,
        payload: data,
      });
    }
  }

  yield takeEvery(ADMIN_ORDER_LIST_REQUEST, AdminOrderList);
}

// Admin Tracking Number

function* watchAdminTrackingNum() {
  const AdminTrackingNumAPI = (payload) => {
    console.log(payload, "AdminTrackingNumAPI");
    return axios.put("/api/admin/tracking", payload, jsonConfig);
  };

  function* AdminTrackingNum(action) {
    const { data } = yield call(AdminTrackingNumAPI, action.payload);

    console.log(data, "AdminTrackingNum");

    try {
      yield put({
        type: ADMIN_TRACKING_NUMBER_SUCCESS,
        payload: data,
      });
    } catch (e) {
      console.log(e);
      yield put({
        type: ADMIN_TRACKING_NUMBER_FAILURE,
        payload: data,
      });
    }
  }

  yield takeEvery(ADMIN_TRACKING_NUMBER_REQUEST, AdminTrackingNum);
}

// Request Review
function* watchAdminReview() {
  const AdminReviewAPI = (payload) => {
    console.log(payload, "payload");
    return axios.get("/api/admin/review", { params: payload });
  };

  function* AdminReview(action) {
    try {
      const { data } = yield call(AdminReviewAPI, action.payload);

      yield put({
        type: ADMIN_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: ADMIN_REVIEW_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(ADMIN_REVIEW_REQUEST, AdminReview);
}

// Delete Review

function* watchDeleteReview() {
  const DeleteReviewAPI = (payload) => {
    console.log(payload, "payload");
    return axios.put(
      "/api/admin/review/delete",
      {
        data: payload,
      },
      jsonConfig
    );
  };

  function* DeleteReview(action) {
    try {
      const { data } = yield call(DeleteReviewAPI, action.payload);

      yield put({
        type: ADMIN_DELETE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: ADMIN_DELETE_REVIEW_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(ADMIN_DELETE_REVIEW_REQUEST, DeleteReview);
}

// Search Review

function* watchAdminSearch() {
  const AdminSearchAPI = (payload) => {
    console.log(payload, "payload");
    return axios.get("/api/admin/search", {
      params: {
        splitResult: payload.splitResult,
        search: payload.search,
      },
    });
  };

  function* AdminSearch(action) {
    const { data } = yield call(AdminSearchAPI, action.payload);
    console.log(data, "data");
    try {
      yield put({
        type: ADMIN_SEARCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      yield put({
        type: ADMIN_SEARCH_FAILURE,
        payload: error,
      });
    }
  }

  yield takeEvery(ADMIN_SEARCH_REQUEST, AdminSearch);
}

export default function* adminSaga() {
  yield all([
    fork(watchAdminSummary),
    fork(watchDeleteAdminUser),
    fork(watchAdminSearch),
    fork(watchDeletePost),
    fork(watchAdminReview),
    fork(watchAdminPost),
    fork(watchInitializePassswor),
    fork(watchMakeAdminUser),
    fork(watchAdminUser),
    fork(watchAdminLoadProductOne),
    fork(watchThumbnailDelete),
    fork(watchLoadedImageDelete),
    fork(watchModifyImage),
    fork(watchAdminTrackingNum),
    fork(watchAdminOrderList),
    fork(watchDeleteReview),
  ]);
}
