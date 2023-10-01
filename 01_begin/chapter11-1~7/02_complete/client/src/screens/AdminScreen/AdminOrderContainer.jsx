import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAdminOrderQuery,
  usePutAdminTrackingNumberMutation,
} from "../../redux/apiSlices/extendedAdmin";
import { usePostKakaoPayCancelMutation } from "../../redux/apiSlices/extendedPay";
import { saveCancelInfo } from "../../redux/slices/paySlice";
import { saveAdminShippingPage } from "../../redux/slices/adminSlice";
import AdminOrderPresenter from "./AdminOrderPresenter";

const AdminOrderContainer = () => {
  const { adminShippingPage, orderSearch } = useSelector(
    (state) => state.admin
  );

  const { cancelInfo } = useSelector((state) => state.pay);

  const { data: adminOrderList, isLoading } = useGetAdminOrderQuery({
    pages: adminShippingPage,
    search: orderSearch,
  });

  const [putAdminTrackingNumber] = usePutAdminTrackingNumberMutation();
  const [postKakaoPayCancel] = usePostKakaoPayCancelMutation();

  const [modal, setModal] = useState(false);
  const [trackingModal, setTrackingModal] = useState(false);

  const [inputWrite, setInputWrite] = useState("");
  const [bundleDelivery, setBundleDelivery] = useState(false);
  const [targetId, setTargetId] = useState("");

  const dispatch = useDispatch();

  const nextMonth = () => {
    dispatch(saveAdminShippingPage(adminShippingPage + 1));
  };

  const prevMonth = () => {
    dispatch(saveAdminShippingPage(adminShippingPage - 1));
  };

  console.log(inputWrite, "inputWrite");

  const orderCancelBtn = () => {
    console.log(cancelInfo, "orderCancelBtn");
    postKakaoPayCancel(cancelInfo);
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

      dispatch(
        saveCancelInfo({ cancel_amount, partner_order_id: e.target.id })
      );

      setModal(!modal);
    }
  };

  const trackingNumberModalOpen = (e) => {
    setTargetId(e.target.id);
    setTrackingModal(!trackingModal);

    // 모달 닫기 버튼
    if (trackingModal === true) {
      console.log("modal close");
      setTrackingModal(!trackingModal);
      setInputWrite("");
    }
    console.log(e.target.name, "trackingNumberModalOpen");

    // 수정(재수정) 버튼
    if (!trackingModal && e.target.name !== "") {
      console.log("modify 2");
      const trackingNum = document
        .getElementsByName(`${e.target.name}`)[0]
        .name.split("_");

      // console.log(
      //   document.getElementsByName(`${e.target.name}`),
      //   document.getElementsByName(`${e.target.name}`)[0],
      //   trackingNum,
      //   "trackingNum"
      // );
      setInputWrite({
        ...inputWrite,
        [`${trackingNum[0]}-${trackingNum[1]}`]: trackingNum[2],
      });
      setBundleDelivery(false);
    }
  };

  const manyTrackingNumberModalOpen = (e, adminOrderList) => {
    console.log(adminOrderList);
    setTargetId(e.target.id);
    setTrackingModal(!trackingModal);

    if (!trackingModal) {
      setTrackingModal(!trackingModal);
      setInputWrite("");
    }

    const targetOrder = adminOrderList.filter((x) => x.orderId === e.target.id);
    console.log(targetOrder, "targetOrder");

    targetOrder[0]?.trackingNumber.map((x, i) => {
      setInputWrite((inputWrite) => ({
        ...inputWrite,
        [`${targetOrder[0].orderId}-${i}`]: x,
      }));
    });
    setBundleDelivery(false);
    console.log(inputWrite, "targetOrder");
  };

  const handleTrackingNumberWrite = (e) => {
    setInputWrite({ ...inputWrite, [e.target.name]: e.target.value });
  };

  const submitTrackingNumberHandler = (e) => {
    e.preventDefault();

    putAdminTrackingNumber(inputWrite);
    setInputWrite("");
    setTargetId("");
    setTrackingModal(false);
  };

  const bundleDeliveryHandle = (e) => {
    setBundleDelivery(!bundleDelivery);
    setInputWrite("");
  };

  return (
    <AdminOrderPresenter
      adminOrderList={adminOrderList}
      adminShippingPage={adminShippingPage}
      prevMonth={prevMonth}
      nextMonth={nextMonth}
      orderCancelBtn={orderCancelBtn}
      modal={modal}
      modalOpen={modalOpen}
      inputWrite={inputWrite}
      setInputWrite={setInputWrite}
      handleTrackingNumberWrite={handleTrackingNumberWrite}
      trackingNumberModalOpen={trackingNumberModalOpen}
      manyTrackingNumberModalOpen={manyTrackingNumberModalOpen}
      trackingModal={trackingModal}
      targetId={targetId}
      submitTrackingNumberHandler={submitTrackingNumberHandler}
      bundleDelivery={bundleDelivery}
      bundleDeliveryHandle={bundleDeliveryHandle}
      loading={isLoading}
    />
  );
};

export default AdminOrderContainer;
