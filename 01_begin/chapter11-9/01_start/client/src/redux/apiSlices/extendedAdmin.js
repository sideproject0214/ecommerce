import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from ".";
import { clearModifySaveData, postModifySaveData } from "../slices/adminSlice";

const adminAdapter = createEntityAdapter({
  selectId: (e) => {
    if (e.id) {
      return e.id;
    } else {
      return e.uuid;
    }
  },
});

const initialState = adminAdapter.getInitialState({});

export const extendedAdminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSummary: builder.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      transformResponse: (rawResult, meta, arg) => {
        console.log(rawResult, "before TransForm Result");
        const userCount = rawResult.userCount;
        const postCount = rawResult.postCount;
        const allOrders = rawResult.allOrders
          .filter((item) => item.isPaid === true)
          .reduce((prev, item) => prev + Number(item.totalPrice), 0);
        const reviewCount = rawResult.reviewCount.length;
        const reviewContents = rawResult.reviewCount;
        const totalSales = rawResult.allOrders.filter(
          (item) => item.isPaid === true
        );
        // id는 1부터 시작한다. 0부터 시작하면 undefined가 나온다
        const reArragement = [
          { id: 1, contents: totalSales },
          { id: 2, contents: userCount },
          { id: 3, contents: postCount },
          { id: 4, contents: allOrders },
          { id: 5, contents: reviewCount },
          { id: 6, contents: reviewContents },
        ];

        const result = adminAdapter.setAll(initialState, reArragement);

        return result;
      },
      providesTags: () => [{ type: "Admin", id: "ADMIN_SUMMARY" }],
    }),

    getAdminUser: builder.query({
      query: (data) => ({
        url: "/admin/user",
        method: "GET",
        params: data,
      }),

      providesTags: (result, error, arg) => {
        console.log(result, "Before providesTags result");
        const after = [{ type: "Admin", id: "ADMIN_USER" }];
        return after;
      },
    }),
    putMakeAdminUser: builder.mutation({
      query: (data) => ({
        url: "/admin/user/make",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        // console.log(result, arg, "putMakeAdminUser");
        return [
          { type: "Admin", id: "ADMIN_USER" },
          { type: "Admin", id: "ADMIN_SEARCH" },
          { type: "Admin", id: result.uuid },
        ];
      },
    }),
    putDeleteAdminUser: builder.mutation({
      query: (data) => ({
        url: "/admin/user/delete",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result, arg, "ADMIN_USER Before providesTags result5555");
        // const after = [{ type: "Admin", id: arg?.uuid }];
        const after = [
          { type: "Admin", id: "ADMIN_USER" },
          { type: "Admin", id: "ADMIN_SUMMARY" },
          { type: "Admin", id: "ADMIN_SEARCH" },
        ];
        // console.log(after, "after");
        return after;
      },
    }),
    putUserInitialize: builder.mutation({
      query: (data) => ({
        url: "/admin/user/initialize",
        method: "PUT",
        body: data,
      }),
    }),
    getAdminPost: builder.query({
      query: (data) => ({
        url: "/admin/post",
        method: "GET",
        params: data,
      }),

      providesTags: (result, error, arg) => {
        // console.log(result, "Before providesTags result");
        const after = [{ type: "Admin", id: "ADMIN_POST" }];
        return after;
      },
    }),
    putDeleteAdminPost: builder.mutation({
      query: (data) => ({
        url: "/admin/post/delete",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result, arg, "ADMIN_USER Before providesTags result5555");

        const after = [
          { type: "Admin", id: "ADMIN_POST" },
          { type: "Admin", id: "ADMIN_SUMMARY" },
        ];

        return after;
      },
    }),
    getAdminPostByUuid: builder.query({
      query: (uuid) => `post/${uuid}`,
      transformResponse: (rawResult, meta, arg) => {
        console.log(rawResult, "before TransForm Result2");
        const result = adminAdapter.setOne(initialState, rawResult);
        console.log(result, "TransForm Result2 ");
        return result;
      },
      providesTags: (result, error, arg) => {
        console.log(result, arg, "Before providesTags result2");
        const after = [
          { type: "Admin", id: "ADMIN_POST_BY_UUID" },
          ...result.ids.map((uuid) => ({ type: "Admin", uuid })),
        ];

        return after;
      },
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        dispatch(clearModifySaveData());
        try {
          const { data } = await queryFulfilled;
          console.log(body, data, "onQueryStarted Result23");
          dispatch(postModifySaveData(data.entities[data.ids[0]]));
        } catch (error) {
          // `onError` side-effect
          console.log(error, "onQueryStarted Error");
        }
      },
    }),
    putModifyNoImage: builder.mutation({
      query: (data) => ({
        url: "/admin/upload/modify/noimage",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result, arg, "ADMIN_USER Before providesTags result5555");

        const after = [
          { type: "Post", id: "POST_BY_UUID" },
          { type: "Admin", id: "ADMIN_POST_BY_UUID" },
          { type: "Admin", id: "ADMIN_POST" },
        ];
        // console.log(after, "after");
        return after;
      },
    }),
    putModifyImage: builder.mutation({
      query: (data) => ({
        url: "/admin/upload/modify/image",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result, arg, "ADMIN_USER Before providesTags result5555");

        const after = [
          { type: "Post", id: "POST_BY_UUID" },

          { type: "Admin", id: "ADMIN_POST_BY_UUID" },
          { type: "Admin", id: "ADMIN_POST" },
        ];
        // console.log(after, "after");
        return after;
      },
    }),
    getAdminOrder: builder.query({
      query: (data) => {
        console.log(data, "getAdminOrder");
        return {
          url: "/admin/order",
          method: "GET",
          params: data,
        };
      },

      providesTags: (result, error, arg) => [
        { type: "Admin", id: "ADMIN_ORDER" },
      ],
    }),
    putAdminTrackingNumber: builder.mutation({
      query: (data) => ({
        url: "/admin/tracking",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Admin", id: "ADMIN_ORDER" },
        { type: "Order", id: "GET_MY_SHIPPING" },
        { type: "Admin", id: "ADMIN_SUMMARY" },
      ],
    }),
    getAdminReview: builder.query({
      query: (data) => ({
        url: "/admin/review",
        method: "GET",
        params: data,
      }),

      providesTags: (result, error, arg) => [
        { type: "Admin", id: "ADMIN_REVIEW" },
      ],
    }),
    putAdminDeleteReview: builder.mutation({
      query: (data) => ({
        url: "/admin/review/delete",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Admin", id: "ADMIN_SUMMARY" },
        { type: "Admin", id: "ADMIN_REVIEW" },
        { type: "Post", id: "POST_BY_UUID" },
        { type: "Order" }, // ch10
      ],
    }),
  }),
});

export const {
  useGetAdminSummaryQuery,
  useGetAdminUserQuery,
  usePutMakeAdminUserMutation,
  usePutDeleteAdminUserMutation,
  usePutUserInitializeMutation,
  useGetAdminPostQuery,
  usePutDeleteAdminPostMutation,
  useGetAdminPostByUuidQuery,
  usePutModifyNoImageMutation,
  usePutModifyImageMutation,
  useGetAdminOrderQuery,
  usePutAdminTrackingNumberMutation,
  useGetAdminReviewQuery,
  usePutAdminDeleteReviewMutation,
} = extendedAdminSlice;
