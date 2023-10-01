import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    // arrow function 사용은 에러를 발생시킬 가능성이 매우커서 사용하지 말것을 권한다.
    addAlertSide(state, { payload }) {
      console.log(payload, "addAlertSide Slice Add");
      state.push(payload);
    },
    removeAlertSide(state, { payload }) {
      console.log(payload, current(state), "removeAlertSide Slice Remove");
      const index = state.findIndex((e) => e.id === payload);
      if (index !== -1) state.splice(index, 1);
    },
  },
});

export const { addAlertSide, removeAlertSide } = alertSlice.actions;

export default alertSlice.reducer;
