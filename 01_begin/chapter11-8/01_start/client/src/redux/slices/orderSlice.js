import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingPage: 0,
};

const orderSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    saveShippingPage(state, { payload }) {
      state.shippingPage = payload;
    },
  },
});

export const { saveShippingPage } = orderSlice.actions;

export default orderSlice.reducer;
