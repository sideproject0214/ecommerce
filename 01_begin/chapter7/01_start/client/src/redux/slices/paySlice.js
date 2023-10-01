import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderPayItems: [],
  kakaoPay: "",
  kakaoPayTid: "",
  payRedirectURI: "",
  modal: false,
  cancel: false,
  failure: false,
  cartItems: "",
  cancelInfo: "",
};

const paySlice = createSlice({
  name: "pay",
  initialState,
  reducers: {
    saveOrderItems(state, { payload }) {
      state.orderPayItems = payload;
    },
    clearOrderItems(state, { payload }) {
      state.orderPayItems = [];
    },
    openModal(state, { payload }) {
      state.modal = true;
      state.cancel = false;
      state.failure = false;
    },
    closeModal(state, { payload }) {
      state.modal = false;
    },
    closeModalCancel(state, { payload }) {
      state.cancel = true;
      state.modal = false;
    },
    closeModalFailure(state, { payload }) {
      state.failure = true;
      state.modal = false;
    },
    resetState(state, { payload }) {
      state.modal = false;
      state.cancel = false;
      state.failure = false;
    },
    saveCancelInfo(state, { payload }) {
      state.cancelInfo = payload;
    },
  },
});

export const {
  saveOrderItems,
  clearOrderItems,
  openModal,
  closeModal,
  closeModalCancel,
  closeModalFailure,
  resetState,
  saveCancelInfo,
} = paySlice.actions;

export default paySlice.reducer;
