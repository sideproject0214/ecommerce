import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../apiSlices";

// ch4
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// ch6
const orderSubmitItemsFromLocalStorage = localStorage.getItem(
  "orderSubmitItems"
)
  ? JSON.parse(localStorage.getItem("orderSubmitItems"))
  : [];

const initialState = {
  beforePostCount: "Not",
  totalPost: [],
  cartItems: cartItemsFromLocalStorage, // ch4
  orderSubmitItems: orderSubmitItemsFromLocalStorage, // ch6
  updateReview: "", // ch7
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
    // ch5
    removeCartItem(state, { payload }) {
      const removeItem = payload;
      console.log(removeItem, "removeItem");

      const userfiltered = state.cartItems.filter(
        (x) => x.userUUID !== removeItem.userUUID
      );

      const productfiltered = state.cartItems.filter(
        (x) => x.userUUID === removeItem.userUUID && x.uuid !== removeItem.uuid
      );

      state.cartItems = [...userfiltered, ...productfiltered];

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // ch5
    addOrderItems(state, { payload }) {
      state.orderSubmitItems = payload;
      localStorage.setItem("orderSubmitItems", JSON.stringify(payload));
    },
    // ch6
    clearItems(state, { payload }) {
      localStorage.setItem(
        "cartItems",
        state.cartItems.filter((item) => item.userUUID !== payload.userUUID)
      );
      localStorage.setItem(
        "orderSubmitItems",
        state.cartItems.filter((item) => item.userUUID !== payload.userUUID)
      );

      state.cartItems = [];
    },
    // ch7
    updateOpen(state, { payload }) {
      state.updateReview = payload.entities[payload.ids[0]];
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

export const {
  addCartItem,
  removeCartItem,
  addOrderItems,
  clearItems,
  updateOpen,
} = postSlice.actions;

export default postSlice.reducer;
