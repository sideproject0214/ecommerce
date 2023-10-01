import { apiSlice } from "./index.js";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { setAddress } from "../slices/addressSlice.js";

const addressAdapter = createEntityAdapter({
  selectId: (e) => e.id,
});

const initialState = addressAdapter.getInitialState({});

export const extendedAddressSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDefaultAddress: builder.query({
      query: () => "/address/default",
      // transformResponse: (res) => addressAdapter.setAll(initialState, res),
      transformResponse: (res) => addressAdapter.setOne(initialState, res),
      providesTags: (result, error, arg) => [
        { type: "Address", id: "DEFAULT" },
        ...result.ids.map((id) => ({ type: "Address", id })),
      ],
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAddress(data?.entities[data?.ids[0]]));
          console.log(data?.entities[data?.ids[0]], "onQueryStarted");
        } catch (error) {
          // `onError` side-effect
          console.log(error, "getVerifyEmailToken onQueryStarted Error");
        }
      },
    }),
    getLatestAddress: builder.query({
      query: () => "/address/latest",
      transformResponse: (res) => addressAdapter.setAll(initialState, res),
      providesTags: (result, error, arg) => [
        { type: "Address", id: "LATEST" },
        ...result.ids.map((id) => ({ type: "Address", id })),
      ],
    }),
  }),
});

export const { useLazyGetDefaultAddressQuery, useGetLatestAddressQuery } =
  extendedAddressSlice;
