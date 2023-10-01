import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlices";

// ch4
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  beforePostCount: "Not",
  totalPost: [],
  cartItems: cartItemsFromLocalStorage, // ch4
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // ch4
    addCartItem(state, { payload }) {
      const item = payload;
      console.log(item, "item");
      // console.log(current(state.cartItems), "cartItems");
      const existItems = state.cartItems.find(
        (x) => x.uuid === item.uuid && x.userUUID === item.userUUID
      );

      if (existItems) {
        const result = state.cartItems.map((x) =>
          x.uuid === existItems.uuid && x.userUUID === item.userUUID ? item : x
        );
        state.cartItems = result;
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
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

export const { addCartItem } = postSlice.actions;

export default postSlice.reducer;
