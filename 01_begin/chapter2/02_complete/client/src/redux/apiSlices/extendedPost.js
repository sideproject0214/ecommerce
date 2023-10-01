import { apiSlice } from "./index.js";
import { createEntityAdapter } from "@reduxjs/toolkit";

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
  }),
});

export const { useGetPostsPaginationQuery, useLazyGetSearchPostsQuery } =
  extendedPostSlice;
