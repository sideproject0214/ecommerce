import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KAKAO_PAY_REQUEST } from "../../redux/constant/payConstant";

const AddressModal = (props) => {
  const { kakaoPay, loading, orderPayItems } = useSelector(
    (state) => state.pay
  );

  const dispatch = useDispatch();
  console.log("orderPayItems", orderPayItems);
  useEffect(() => {
    dispatch({
      type: KAKAO_PAY_REQUEST,
      payload: orderPayItems,
    });
  }, [dispatch, orderPayItems]);

  return <>{loading ? <div className="">dd</div> : ""}</>;
};

export default AddressModal;
