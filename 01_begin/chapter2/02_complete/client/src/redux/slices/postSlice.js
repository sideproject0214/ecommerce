import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlices";

const initialState = {
  beforePostCount: "Not",
  totalPost: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      apiSlice.endpoints.getPostsPagination.matchFulfilled,
      (state, action) => {
        state.status = "idle";
        state.beforePostCount = action.payload.ids.length;
        state.totalPost = [
          ...Object.values(state.totalPost),
          ...Object.values(action.payload.entities),
        ];
      }
    );
  },
});

export const {} = postSlice.actions;

export default postSlice.reducer;
