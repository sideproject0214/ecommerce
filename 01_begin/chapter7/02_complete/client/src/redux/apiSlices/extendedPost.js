import { apiSlice } from "./index.js";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { updateOpen } from "../slices/postSlice.js";

// transformResponse를 통해 정제된 데이터(여기는 result만 보내기에)에서
// id를 개별 부여한다.
const postsAdapter = createEntityAdapter({
  selectId: (e) => {
    if (e.id) {
      return e.id;
    } else {
      return e.uuid;
    }
  },
});

const initialState = postsAdapter.getInitialState();

export const extendedPostSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostsPagination: builder.query({
      query: (pagination) =>
        pagination ? `post/pagination/${pagination}` : `post/pagination/0`,
      transformResponse: (rawResult, meta, arg) => {
        const result = postsAdapter.addMany(initialState, rawResult);
        console.log(result, "TransForm Result ");
        return result;
      },

      providesTags: (result, error, arg) => {
        console.log(result, "Before providesTags result");
        const after = [
          { type: "Post", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Post", id })),
        ];
        console.log(after, "after");
        return after;
      },
    }),
    getSearchPosts: builder.query({
      query: (search) => `post/search/${search}`,
      transformResponse: (rawResult, meta, arg) => {
        // console.log(rawResult, "before TransForm Result");
        const result = postsAdapter.setAll(initialState, rawResult.data);
        // console.log(result, "TransForm Result ");
        return result;
      },
      providesTags: (result, error, arg) => {
        // console.log(result, "Before providesTags result");
        const after = [
          { type: "Post", id: "SEARCH" },
          ...result.ids.map((id) => ({ type: "Post", id })),
        ];
        // console.log(after, "after");
        return after;
      },
    }),
    getPostByUuid: builder.query({
      query: (uuid) => `post/${uuid}`,
      transformResponse: (rawResult, meta, arg) => {
        console.log(rawResult, "before TransForm Result2");
        const result = postsAdapter.setOne(initialState, rawResult);
        console.log(result, "TransForm Result2 ");
        return result;
      },
      providesTags: (result, error, arg) => {
        console.log(result, arg, "Before providesTags result2");
        const after = [
          { type: "Post", id: "POST_BY_UUID" },
          ...result.ids.map((uuid) => ({ type: "Post", uuid })),
        ];
        // console.log(after, "after");
        return after;
      },
    }),
    // ch7
    postCreateReview: builder.mutation({
      query: (payload) => {
        console.log(payload, "payload");
        return {
          url: "/post/review",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: () => ["Order", "Post"],
    }),
    // ch7
    getUpdateOpen: builder.query({
      query: (payload) => ({
        url: "/post/review/open",
        method: "GET",
        params: {
          orderId: payload.orderId,
          productId: payload.uuid,
          userId: payload.userId,
        },
      }),
      transformResponse: (rawResult, meta, arg) => {
        console.log(rawResult[0], "before TransForm Result2");
        const result = postsAdapter.setOne(initialState, rawResult[0]);
        console.log(result, "TransForm Result2 ");
        return result;
      },
      providesTags: (result, error, arg) => {
        console.log(result, arg, "Before providesTags result2");
        const after = [
          { type: "Post", id: "POST_REVIEW" },
          ...result.ids.map((uuid) => ({ type: "Post", uuid })),
        ];
        // console.log(after, "after");
        return after;
      },
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(updateOpen(data));
        } catch (error) {
          // `onError` side-effect
          console.log(error, "onQueryStarted Error");
        }
      },
    }),
    //ch7
    postUpdateReview: builder.mutation({
      query: (payload) => ({
        url: "/post/review/update",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, arg) => {
        console.log(result, arg, "result");

        // const final = [{ type: "Post", id: arg.productId }, "Order"];
        const final = [{ type: "Post", id: arg.productId }];
        return final;
      },
    }),
  }),
});

export const {
  useGetPostsPaginationQuery,
  useLazyGetSearchPostsQuery,
  useGetPostByUuidQuery,
  usePostCreateReviewMutation,
  useLazyGetUpdateOpenQuery,
  usePostUpdateReviewMutation,
} = extendedPostSlice;
