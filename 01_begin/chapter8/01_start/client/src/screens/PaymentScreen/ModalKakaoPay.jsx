import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetOpenKakaoPayQuery } from "../../redux/apiSlices/extendedPay";
import WhiteLoader from "../../components/WhiteLoader";
import "./ModalKakaoPay.scss";

const ModalKakaoPay = () => {
  const { orderPayItems } = useSelector((state) => state.pay);

  // const [postOpenKakaoPay, { data, isLoading }] = usePostOpenKakaoPayMutation();
  const [getOpenKakaoPay, { data, isLoading }] = useLazyGetOpenKakaoPayQuery();

  // console.log("orderPayItems", orderPayItems);
  // console.log("orderPayItems Data", data?.next_redirect_pc_url);
  useEffect(() => {
    // postOpenKakaoPay(orderPayItems);
    getOpenKakaoPay(orderPayItems);
  }, [orderPayItems]);

  return (
    <>
      {isLoading ? (
        <div className="white-loader">
          <WhiteLoader />
        </div>
      ) : (
        <div className="kakaoPayModal" id="iframe-modal">
          <iframe
            id="my-iframe"
            title="kakaopay"
            src={data?.next_redirect_pc_url}
          />
        </div>
      )}
    </>
  );
};

export default ModalKakaoPay;
