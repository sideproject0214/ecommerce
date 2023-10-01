import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAddress: "",
  latestAddress: "",
  radioSet: "1",
  saveAddress: "",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setRadio(state, { payload }) {
      state.radioSet = payload;
    },
    setAddress(state, { payload }) {
      state.saveAddress = payload;
    },
    clearRadioSet(state, { payload }) {
      state.radioSet = "1";
    },
  },
});

export const { setRadio, setAddress, clearRadioSet } = addressSlice.actions;

export default addressSlice.reducer;
