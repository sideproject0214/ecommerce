import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetMyShippingQuery } from "../../redux/apiSlices/extendedOrder";
import { usePostKakaoPayCancelMutation } from "../../redux/apiSlices/extendedPay";
import {
  useLazyGetUpdateOpenQuery,
  usePostCreateReviewMutation,
  usePostUpdateReviewMutation,
} from "../../redux/apiSlices/extendedPost";
import { saveShippingPage } from "../../redux/slices/orderSlice";
import { saveCancelInfo } from "../../redux/slices/paySlice";
import ShippingPresenter from "./ShippingPresenter";

const ShippingContainer = () => {
  const { profile } = useSelector((state) => state.auth);
  const { shippingPage } = useSelector((state) => state.order);
  const { updateReview } = useSelector((state) => state.posts);
  const { cancelInfo } = useSelector((state) => state.pay);
  const [getUpdateOpen] = useLazyGetUpdateOpenQuery({
    refetchOnMountOrArgChange: true,
  });
  const { data: myShippingList } = useGetMyShippingQuery(shippingPage);

  const dispatch = useDispatch();
  const [postCreateReview] = usePostCreateReviewMutation();
  const [postUpdateReview] = usePostUpdateReviewMutation();
  const [postKakaoPayCancel] = usePostKakaoPayCancelMutation();
  const [reviewOpen, setReviewOpen] = useState(false);
  const [updateReviewOpen, setUpdateReviewOpen] = useState(false);
  const [form, setValue] = useState({
    review: "",
    select: "",
  });
  // review, select 등을 확정시키지 않으면 uncontrolled 라고 오류가 나온다

  const [title, setTitle] = useState("");
  const [uuid, setUuid] = useState("");
  const [orderId, setOrderId] = useState("");

  const [modal, setModal] = useState(false);

  const nextMonth = () => {
    dispatch(saveShippingPage(shippingPage + 1));
  };

  const prevMonth = () => {
    dispatch(saveShippingPage(shippingPage - 1));
  };

  const handleReviewBtn = (e) => {
    if (reviewOpen === false) {
      const title = document.getElementById(`${e.target.id}__name`).innerText;
      const result = e.target.id;
      const orderId = result.split("&&")[0];
      const uuid = result.split("&&")[1];

      setOrderId(orderId);
      setUuid(uuid);
      setTitle(title);
      setReviewOpen(!reviewOpen);
    }
  };

  const handleUpdateBtn = (e) => {
    if (updateReviewOpen === false) {
      const title = document.getElementById(`${e.target.id}__name`).innerText;
      const result = e.target.id;
      const orderId = result.split("&&")[0];
      const uuid = result.split("&&")[1];

      setOrderId(orderId);
      setUuid(uuid);
      setTitle(title);

      getUpdateOpen({ orderId, uuid, userId: profile.userUUID });

      setUpdateReviewOpen(!updateReviewOpen);
    }
  };

  const modalClose = () => {
    setUpdateReviewOpen(false);
    setValue({ review: "", select: "" });
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

    postCreateReview({
      orderId: orderId,
      comments: form.review,
      rating: form.select,
      userId: profile.userUUID,
      productId: uuid,
    });

    setReviewOpen(!reviewOpen);
    console.log(form, "handleSubmit");
    setValue("");
  };

  const updateSubmit = (e) => {
    e.preventDefault();

    postUpdateReview({
      orderId: orderId,
      comments: form.review === "" ? updateReview.comments : form.review,
      rating: form.select === "" ? updateReview.rating : form.select,
      userId: profile.userUUID,
      productId: uuid,
    });

    setUpdateReviewOpen(false);
    setValue({
      review: "",
      select: "",
    });
  };

  const orderCancelBtn = () => {
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

  return (
    <ShippingPresenter
      myShippingList={myShippingList}
      prevMonth={prevMonth}
      shippingPage={shippingPage}
      reviewOpen={reviewOpen}
      title={title}
      form={form}
      onChange={onChange}
      handleReviewBtn={handleReviewBtn}
      nextMonth={nextMonth}
      handleSubmit={handleSubmit}
      setValue={setValue}
      handleUpdateBtn={handleUpdateBtn}
      updateReviewOpen={updateReviewOpen}
      modalClose={modalClose}
      updateSubmit={updateSubmit}
      updateReview={updateReview}
      orderCancelBtn={orderCancelBtn}
      modalOpen={modalOpen}
      modal={modal}
      setReviewOpen={setReviewOpen}
    />
  );
};

export default ShippingContainer;
