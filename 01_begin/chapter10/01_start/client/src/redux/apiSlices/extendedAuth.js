import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from ".";
import { FRONT_ADDRESS } from "../../config/variables";
import { addAlertSide } from "../slices/alertSlice";
import {
  clearProfile,
  saveEmailToken,
  saveProfile,
  saveRedirectURI,
} from "../slices/authSlice";

const authAdapter = createEntityAdapter({
  selectId: (e) => {
    if (e.id) {
      return e.id;
    } else if (e.userUUID) {
      return e.userUUID;
    }
    return e.uuid;
  },
});
const initialState = authAdapter.getInitialState({});

export const extendedAuthSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postSignUp: builder.mutation({
      query: (user) => ({
        url: "/auth/signup",
        method: "POST",
        body: user,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          console.log(body, data, "onQueryStarted");
          // body : 내가 보낸 내용
          // data : 성공시 받게 되는 서버 메시지
          // `onSuccess` side-effect
          const { emailName, emailHost } = data;
          const regex = /mail$/;
          let isMail;
          if (regex.test(emailName)) {
            isMail = true;
          } else {
            isMail = false;
          }
          const message = isMail
            ? `${emailName}로 전송완료. 바로가기 클릭!`
            : `${emailName}로 메일전송 완료. 바로가기 클릭!`;
          const result = {
            id: Math.random(),
            message,
            type: "SUCCESS",
            emailHost,
          };
          dispatch(addAlertSide(result));
        } catch (error) {
          // `onError` side-effect
          console.log(error, "onQueryStarted Error");
        }
      },
    }),
    getVerifyEmailToken: builder.query({
      query: (data) => ({
        url: "/auth/verify",
        method: "GET",
        params: { token: data },
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          console.log(body, data, "onQueryStarted");
          dispatch(saveEmailToken(data));
          setTimeout(() => {
            window.location.replace(FRONT_ADDRESS);
            // window.location.replace(import.meta.env.VITE_FRONT_ADDRESS);
          }, 2500);
        } catch (error) {
          // `onError` side-effect
          console.log(error, "getVerifyEmailToken onQueryStarted Error");
        }
      },
    }),
    getLoginCheck: builder.query({
      query: () => ({
        url: "/auth/logincheck",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        console.log(result, "providesTags");
        const after = [{ type: "Auth", id: "GET_LOGIN_CHECK" }];

        return after;
      },
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveProfile(data));
        } catch (error) {
          console.log(error, "getLoadUser onQueryStarted Error");
        }
      },
    }),
    postNormalLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          window.location.replace(FRONT_ADDRESS);
        } catch (error) {
          console.log(error, "getLoadUser onQueryStarted Error");
        }
      },
    }),
    putChangePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/pwchange",
        method: "PUT",
        body: data,
      }),
    }),
    putMakeChangePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/pwchange/makechange",
        method: "PUT",
        body: data,
      }),
    }),
    putChangeMyPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/mypage/pwchange",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: () => ["Auth"],
    }),
    getinitialPwCheck: builder.query({
      query: (data) => ({
        url: "/auth/mypage/check",
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "Auth", id: "INITIAL_PW_CHECK" },
      ],
    }),
    getPwAddressCheck: builder.query({
      query: (data) => ({
        url: "/auth/pwchange/check",
        method: "GET",
        params: { pwEmailAddress: data },
      }),
    }),
    getLogout: builder.query({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(clearProfile(data));

          console.log(data, "saveRedirectURI onQuery");
        } catch (error) {
          console.log(error, "getLoadUser onQueryStarted Error");
        }
      },
    }),
    getNaverAuth: builder.query({
      query: () => ({
        url: "/auth/naver",
        method: "GET",
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(saveRedirectURI(data));

          console.log(data, "saveRedirectURI onQuery");
        } catch (error) {
          console.log(error, "getLoadUser onQueryStarted Error");
        }
      },
    }),
    getKakaoAuth: builder.query({
      query: (data) => ({
        url: "/auth/kakao",
        method: "GET",
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveRedirectURI(data));

          console.log(data, "saveRedirectURI onQuery");
        } catch (error) {
          console.log(error, "getLoadUser onQueryStarted Error");
        }
      },
    }),
    getGoogleAuth: builder.query({
      query: (data) => ({
        url: "/auth/google",
        method: "GET",
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(saveRedirectURI(data));

          console.log(data, "saveRedirectURI onQuery");
        } catch (error) {
          console.log(error, "getLoadUser onQueryStarted Error");
        }
      },
    }),
    // ch9
    putChangeMyPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/mypage/pwchange",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: () => ["Auth"],
    }),
    getinitialPwCheck: builder.query({
      query: (data) => ({
        url: "/auth/mypage/check",
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        { type: "Auth", id: "INITIAL_PW_CHECK" },
      ],
    }),
  }),
});

export const {
  usePostSignUpMutation,
  useGetVerifyEmailTokenQuery,
  useGetLoginCheckQuery,
  usePostNormalLoginMutation,
  usePutChangePasswordMutation,
  useLazyGetLogoutQuery,
  useLazyGetNaverAuthQuery,
  useLazyGetKakaoAuthQuery,
  useLazyGetGoogleAuthQuery,
  useGetPwAddressCheckQuery,
  usePutMakeChangePasswordMutation,
  useGetNaverAuthQuery,
  usePutChangeMyPasswordMutation,
  useGetinitialPwCheckQuery,
} = extendedAuthSlice;
