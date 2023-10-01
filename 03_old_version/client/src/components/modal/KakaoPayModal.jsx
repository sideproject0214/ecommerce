import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KAKAO_PAY_REQUEST } from "../../redux/constant/payConstant";

const KakaoPayModal = () => {
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

  return (
    <>
      {loading ? (
        <div className=""></div>
      ) : (
        // ""
        <div className="kakaoPayModal" id="iframe-modal">
          <iframe id="my-iframe" title="kakaopay" src={kakaoPay} />
        </div>
      )}
    </>
  );
};

export default KakaoPayModal;
