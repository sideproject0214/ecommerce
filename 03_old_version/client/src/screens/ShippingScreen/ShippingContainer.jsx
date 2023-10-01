import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CHECK_MY_SHIPPING_REQUEST,
  CREATE_REVIEW_REQUEST,
  SHIPPING_LOAD_REQUEST,
  UPDATE_OPEN_REQUEST,
  UPDATE_REVIEW_REQUEST,
} from "../../redux/constant/cartConstant";
import {
  KAKAO_PAY_CANCEL_INFO_SAVE_REQUEST,
  KAKAO_PAY_CANCEL_REQUEST,
} from "../../redux/constant/payConstant";
import ShippingPresenter from "./ShippingPresenter";

const ShippingContainer = () => {
  const { myShippingList, reviewCheck, updateReview } = useSelector(
    (state) => state.cart
  );
  const { profile } = useSelector((state) => state.auth);
  const { cancelInfo } = useSelector((state) => state.pay);

  console.log(myShippingList, "myShippingList");
  // console.log(myShippingList[0][1][0]);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [updateReviewOpen, setUpdateReviewOpen] = useState(false);
  const [form, setValue] = useState({
    review: "",
    select: "",
  });
  // review, select 등을 확정시키지 않으면 uncontrolled 라고 오류가 나온다
  // let updateReviewContents = "";
  // updateReviewContents = updateReview;
  console.log("updateReview", updateReview);
  const [title, setTitle] = useState("");
  const [productUUID, setProductUUID] = useState("");
  const [orderId, setOrderId] = useState("");
  // const [orderIndex, setOrderIndex] = useState("");
  // const [concatOrderIdArray, setConcatOrderIdArray] = useState("");

  const [current, setCurrent] = useState(0);
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();

  const nextMonth = () => {
    dispatch({ type: CHECK_MY_SHIPPING_REQUEST, payload: current + 1 });
    setCurrent(current + 1);
  };

  const prevMonth = () => {
    dispatch({ type: CHECK_MY_SHIPPING_REQUEST, payload: current - 1 });
    setCurrent(current - 1);
  };

  // let concatResult = useRef(null); // useEffect,useCallback안에서는 값을 잃어버리니 useRef 사용
  // 대부분 lint가 알려주니 편하다

  // 일반함수를 useEffect에서 쓰면 무한반복이 일어난다. 이를 useCallback을 통해 의존값이 변할때만 작동하도록
  // 코드를 작성할 수 있다.
  // const extractArrayFromShoppingList = useCallback(() => {
  //   if (myShippingList) {
  //     const myShippingResult = myShippingList.map((x, i) => {
  //       const result = x[1][0];
  //       const reviewCheck = result.
  //       const yResult = result.orderItems.map((y, i) => {
  //         return y[0].productUUID;
  //       });
  //       const arrayResult = yResult.map((z, i) => {
  //         return `${resultOrderId}&&${z}`;
  //       });
  //       return arrayResult;
  //       // console.log(arrayResult, "array");
  //     });

  //     for (let i = 0; i < myShippingResult.length - 1; i++) {
  //       concatResult.current = myShippingResult[i].concat(
  //         myShippingResult[i + 1]
  //       );
  //     }
  //     console.log(concatResult, "myShippingResult222");
  //     setConcatOrderIdArray(concatResult);
  //   }
  // }, [myShippingList]);
  // let concatResult = useRef(null); // useEffect,useCallback안에서는 값을 잃어버리니 useRef 사용
  // // 대부분 lint가 알려주니 편하다

  // // 일반함수를 useEffect에서 쓰면 무한반복이 일어난다. 이를 useCallback을 통해 의존값이 변할때만 작동하도록
  // // 코드를 작성할 수 있다.
  // const extractArrayFromShoppingList = useCallback(() => {
  //   if (myShippingList) {
  //     const myShippingResult = myShippingList.map((x, i) => {
  //       const result = x[1][0];

  //       // console.log(result, "result");
  //       const resultOrderId = result.orderId;
  //       const yResult = result.orderItems.map((y, i) => {
  //         return y[0].productUUID;
  //       });
  //       const arrayResult = yResult.map((z, i) => {
  //         return `${resultOrderId}&&${z}`;
  //       });
  //       return arrayResult;
  //       // console.log(arrayResult, "array");
  //     });

  //     for (let i = 0; i < myShippingResult.length - 1; i++) {
  //       concatResult.current = myShippingResult[i].concat(
  //         myShippingResult[i + 1]
  //       );
  //     }
  //     console.log(concatResult, "myShippingResult222");
  //     setConcatOrderIdArray(concatResult);
  //   }
  // }, [myShippingList]);

  // 정말 잘 만든 css 클래스 이용한 선택버튼

  const handleReviewBtn = (e) => {
    if (updateReviewOpen === false) {
      console.log("Start");
      // const title = document.getElementById(`${e.target.id}__name`).innerHTML;
      const title = document.getElementById(`${e.target.id}__name`).innerText;
      // const title = document.querySelectorAll(
      //   `table.table-contents tr:not(.top-row) td div.product__name`
      // )[e.target.value].innerHTML;
      // console.log(title.split(">")[1].split("<")[0], "title split");

      console.log(title, "e.target.result BTN");

      const result = e.target.id;
      const orderId = result.split("&&")[0];
      const productUUID = result.split("&&")[1];

      // console.log(orderId, "orderId");
      // console.log(productUUID, "productUUID");

      setOrderId(orderId);
      setProductUUID(productUUID);
      // setTitle(title.split(">")[1].split("<")[0]);
      setTitle(title);
      setValue({ select: updateReview.select });
      // extractArrayFromShoppingList();

      setReviewOpen(!reviewOpen);
      // setUpdateReviewOpen(!updateReviewOpen);
    } else {
      // setUpdateReviewOpen(!updateReviewOpen);
    }
  };

  let indexNumber = 0;

  const handleUpdateBtn = (e) => {
    if (updateReviewOpen === false) {
      // console.log(updateReview, "handleUpdateBtn Check");
      setUpdateReviewOpen(true);
      const title = document.getElementById(`${e.target.id}__name`).innerText;
      // const title = document.querySelectorAll(
      //   `table.table-contents tr:not(.top-row) td div.product__name`
      // )[e.target.value].innerHTML;
      console.log(title, "e.target.result");
      indexNumber += e.target.value;
      console.log(indexNumber, "indexNumber");
      const result = e.target.id;
      const orderId = result.split("&&")[0];
      const productUUID = result.split("&&")[1];

      console.log(orderId, "orderId");
      console.log(productUUID, "productUUID");

      setOrderId(orderId);
      setProductUUID(productUUID);
      setTitle(title);
      console.log(title, "dd");
      dispatch({
        type: UPDATE_OPEN_REQUEST,
        payload: { orderId, productUUID, userId: profile.userUUID },
      });
    }
    // if (updateReviewOpen === false) {
    //   // setValue({
    //   //   review: updateReview,
    //   // });
    //   setValue({ select: updateReview.rating });
    // }
  };

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form, "setValue");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: CREATE_REVIEW_REQUEST,
      payload: {
        orderId: orderId,
        // orderIndex: orderIndex,
        comments: form.review,
        rating: form.select,
        userId: profile.userUUID,
        productId: productUUID,
      },
    });
    setReviewOpen(!reviewOpen);
    console.log(form, "handleSubmit");
    setValue("");
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    console.log(
      form.review === undefined ? updateReview.comments : form.review,
      "updateSubmit"
    );
    dispatch({
      type: UPDATE_REVIEW_REQUEST,
      payload: {
        orderId: orderId,
        // orderIndex: orderIndex,
        comments:
          form.review === undefined ? updateReview.comments : form.review,
        rating: form.select === undefined ? updateReview.rating : form.select,
        userId: profile.userUUID,
        productId: productUUID,
      },
    });
    setUpdateReviewOpen(false);
    setValue("");
  };

  const orderCancelBtn = () => {
    // const amount = document.getElementById(`${e.target.id}__amount`).innerHTML;
    // const split_amount = amount.split(/원/);
    // const cancel_amount = split_amount[0].replace(",", "");
    // console.log(cancel_amount, e.target.id, "orderCancelBtn");
    console.log(cancelInfo, "orderCancelBtn");
    dispatch({
      type: KAKAO_PAY_CANCEL_REQUEST,
      payload: cancelInfo,
    });
  };

  const modalOpen = (e) => {
    setModal(!modal);
    if (!modal) {
      const amount = document.getElementById(
        `${e.target.id}__amount`
      ).innerHTML;
      const split_amount = amount.split(/원/);
      const cancel_amount = split_amount[0].replace(",", "");
      console.log(cancel_amount, e.target.id, "orderCancelBtn");
      dispatch({
        type: KAKAO_PAY_CANCEL_INFO_SAVE_REQUEST,
        payload: { cancel_amount, partner_order_id: e.target.id },
      });
      setModal(!modal);
    }
  };
  // const cancelInfoSave = (e) => {};

  useEffect(() => {
    dispatch({
      type: SHIPPING_LOAD_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  useEffect(() => {
    if (updateReview) {
      setValue({
        comments: updateReview.comments,
        rating: updateReview.rating,
      });
    }
  }, [updateReview]);

  return (
    <ShippingPresenter
      myShippingList={myShippingList}
      prevMonth={prevMonth}
      current={current}
      reviewOpen={reviewOpen}
      title={title}
      form={form}
      onChange={onChange}
      handleReviewBtn={handleReviewBtn}
      nextMonth={nextMonth}
      handleSubmit={handleSubmit}
      setValue={setValue}
      reviewCheck={reviewCheck}
      handleUpdateBtn={handleUpdateBtn}
      updateReviewOpen={updateReviewOpen}
      setUpdateReviewOpen={setUpdateReviewOpen}
      updateSubmit={updateSubmit}
      updateReview={updateReview}
      indexNumber={indexNumber}
      orderCancelBtn={orderCancelBtn}
      modalOpen={modalOpen}
      modal={modal}
      // cancelInfoSave={cancelInfoSave}
      setReviewOpen={setReviewOpen}
    />
  );
};

export default ShippingContainer;
