import { apiSlice } from "./index.js";
import { createEntityAdapter } from "@reduxjs/toolkit";

const addressAdapter = createEntityAdapter({
  selectId: (e) => e.orderId,
});

const initialState = addressAdapter.getInitialState({});

export const extendedOrder = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyShipping: builder.query({
      query: (payload) => ({
        url: "/order/shipping",
        method: "GET",
        params: { pages: payload },
      }),
      transformResponse: (rawResult, meta, arg) =>
        addressAdapter.setMany(initialState, rawResult),
      providesTags: (result, error, arg) => [
        { type: "Order", id: "GET_MY_SHIPPING" },
        ...result.ids.map((id) => ({ type: "Order", id })),
      ],
      invalidatesTags: (result, error, arg) => ["Post"],
    }),
  }),
});

export const { useGetMyShippingQuery } = extendedOrder;
