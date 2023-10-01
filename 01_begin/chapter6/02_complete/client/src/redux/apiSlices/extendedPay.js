import { apiSlice } from "./index.js";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { saveOrderItems } from "../slices/paySlice.js";

// transformResponse를 통해 정제된 데이터(여기는 result만 보내기에)에서
// id를 개별 부여한다.
const payAdapter = createEntityAdapter({
  selectId: (e) => {
    // console.log(e, `payAdapter`);
    return e.id;
  },
  // sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
  // sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = payAdapter.getInitialState({});

export const extendedPostSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postOrderSubmit: builder.mutation({
      query: (data) => ({
        url: "/order/submit",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          // body : 내가 보낸 내용
          // data : 성공시 받게 되는 서버 메시지
          // `onSuccess` side-effect

          dispatch(saveOrderItems(body));
        } catch (error) {
          // `onError` side-effect
          console.log(error, "onQueryStarted Error");
        }
      },
    }),

    getOpenKakaoPay: builder.query({
      query: (payload) => ({
        url: "/pay/kakao",
        method: "GET",
        params: {
          partner_order_id: payload.partner_order_id,
          partner_user_id: payload.partner_user_id,
          item_name: payload.item_name,
          quantity: payload.quantity,
          total_amount: payload.total_amount,
          vat_amount: payload.total_amount * 0.1,
          tax_free_amount: 0,
        },
      }),
      invalidatesTags: (result, error, arg) => ["Order"],
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          // body : 내가 보낸 내용
          // data : 성공시 받게 되는 서버 메시지
          // `onSuccess` side-effect

          dispatch(saveOrderItems(body));
        } catch (error) {
          // `onError` side-effect
          console.log(error, "onQueryStarted Error");
        }
      },
    }),
    postKakaoPayCancel: builder.mutation({
      query: (payload) => ({
        url: "/pay/kakao/payment/cancel",
        method: "POST",
        body: {
          partner_order_id: payload.partner_order_id,
          cancel_amount: payload.cancel_amount,
          cancel_tax_free_amount: 0, //} 취소 비과세 금액 : 비과세는 주로 농산물, 축산물, 수산물, 임산물 등
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "MY_SHIPPING", id: arg.id },
        { type: "Admin", id: "ADMIN_SUMMARY" },
        { type: "Admin", id: "ADMIN_ORDER" },
      ],
    }),
  }),
});

export const {
  usePostOrderSubmitMutation,
  usePostKakaoPayCancelMutation,
  useLazyGetOpenKakaoPayQuery,
} = extendedPostSlice;
