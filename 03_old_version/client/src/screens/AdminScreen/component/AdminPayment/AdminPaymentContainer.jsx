import React, { useEffect, useState } from "react";
import AdminPaymentPresenter from "./AdminPaymentPresenter";
import { useDispatch, useSelector } from "react-redux";

import {
  CREATE_REVIEW_REQUEST,
  UPDATE_OPEN_REQUEST,
} from "../../../../redux/constant/cartConstant";

import {
  KAKAO_PAY_CANCEL_INFO_SAVE_REQUEST,
  KAKAO_PAY_CANCEL_REQUEST,
} from "../../../../redux/constant/payConstant";
import {
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_TRACKING_NUMBER_REQUEST,
} from "../../../../redux/constant/adminConstant";

const AdminPaymentContainer = () => {
  const { adminOrderList, loading } = useSelector((state) => state.admin);
  const { profile } = useSelector((state) => state.auth);
  const { cancelInfo } = useSelector((state) => state.pay);

  // console.log(myShippingList[0][1][0]);

  const [reviewOpen, setReviewOpen] = useState(false);
  const [updateReviewOpen, setUpdateReviewOpen] = useState(false);
  const [form, setValue] = useState({
    review: "",
    select: "",
  });

  const [title, setTitle] = useState("");
  const [productUUID, setProductUUID] = useState("");
  const [orderId, setOrderId] = useState("");

  const [current, setCurrent] = useState(0);
  const [modal, setModal] = useState(false);
  const [trackingModal, setTrackingModal] = useState(false);

  const [inputWrite, setInputWrite] = useState("");
  const [bundleDelivery, setBundleDelivery] = useState(false);
  const [targetId, setTargetId] = useState("");
  // const [inputClick, setInputClick] = useState([]);

  const dispatch = useDispatch();

  const nextMonth = () => {
    dispatch({ type: ADMIN_ORDER_LIST_REQUEST, payload: current + 1 });
    setCurrent(current + 1);
  };

  const prevMonth = () => {
    dispatch({ type: ADMIN_ORDER_LIST_REQUEST, payload: current - 1 });
    setCurrent(current - 1);
  };

  // const handleTrackingNumberClick = (e) => {
  //   console.log(e.target.id, "hi");
  //   if (inputClick.includes(e.target.id)) {
  //     setInputClick(inputClick.filter((el) => el !== e.target.id));
  //   } else {
  //     setInputClick([...inputClick, e.target.id]);
  //   }
  //   // setClick(!click);
  // };
  // console.log(inputClick, "inputClick");

  // const onChange1 = (e) => {
  //   setValue({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  console.log(inputWrite, "inputWrite");

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

  const trackingNumberModalOpen = (e) => {
    console.log(e.target.id, "id");
    setTargetId(e.target.id);
    setTrackingModal(!trackingModal);
    if (!trackingModal) {
      setTrackingModal(!trackingModal);
      setInputWrite("");
    }
  };

  const handleTrackingNumberWrite = (e) => {
    // console.log(e.target.value, "input");
    setInputWrite({ ...inputWrite, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputWrite, "submit");

    dispatch({
      type: ADMIN_TRACKING_NUMBER_REQUEST,
      payload: inputWrite,
    });
    setInputWrite("");
    setTargetId("");
    setTrackingModal(false);
    dispatch({
      type: ADMIN_ORDER_LIST_REQUEST,
      payload: current,
    });
  };

  const bundleDeliveryHandle = (e) => {
    setBundleDelivery(!bundleDelivery);
    setInputWrite("");
  };

  ////////////////

  useEffect(() => {
    dispatch({
      type: ADMIN_ORDER_LIST_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (checkedInputs.length > 0) {
  //     autoFocus.current.focus();
  //   }
  // }, [checkedInputs.length]);

  return (
    <AdminPaymentPresenter
      adminOrderList={adminOrderList}
      prevMonth={prevMonth}
      current={current}
      reviewOpen={reviewOpen}
      title={title}
      form={form}
      onChange={onChange}
      nextMonth={nextMonth}
      handleSubmit={handleSubmit}
      setValue={setValue}
      handleUpdateBtn={handleUpdateBtn}
      updateReviewOpen={updateReviewOpen}
      setUpdateReviewOpen={setUpdateReviewOpen}
      indexNumber={indexNumber}
      orderCancelBtn={orderCancelBtn}
      modalOpen={modalOpen}
      modal={modal}
      // cancelInfoSave={cancelInfoSave}
      setReviewOpen={setReviewOpen}
      inputWrite={inputWrite}
      setInputWrite={setInputWrite}
      // handleTrackingNumberClick={handleTrackingNumberClick}
      handleTrackingNumberWrite={handleTrackingNumberWrite}
      // inputClick={inputClick}
      // checkedInputs={checkedInputs}
      // setCheckedInputs={setCheckedInputs}
      // checkHandler={checkHandler}
      // allCheckHandle={allCheckHandle}
      trackingNumberModalOpen={trackingNumberModalOpen}
      trackingModal={trackingModal}
      targetId={targetId}
      submitHandler={submitHandler}
      bundleDelivery={bundleDelivery}
      bundleDeliveryHandle={bundleDeliveryHandle}
      loading={loading}
    />
  );
};

export default AdminPaymentContainer;
