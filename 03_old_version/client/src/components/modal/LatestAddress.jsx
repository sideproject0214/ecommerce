import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LATEST_ADDRESS_REQUEST,
  SAVE_ADDRESS_REQUEST,
} from "../../redux/constant/addressConstant";

const LatestAddress = (props) => {
  const dispatch = useDispatch();
  const { latestAddress } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch({
      type: LATEST_ADDRESS_REQUEST,
      // payload: 2,
    });
    // dispatch({
    //   type: RADIO_SET_REQUEST,
    //   payload: 2,
    // });
  }, [dispatch]);

  const saveAddress = (e) => {
    console.log("e.target.id", e.target.id);
    // dispatch({ type: MODAL_SUCCESS_CLOSE_REQUEST });
    dispatch({
      type: SAVE_ADDRESS_REQUEST,
      payload: latestAddress[e.target.id],
    });
    // dispatch({
    //   type: RADIO_SET_REQUEST,
    //   payload: "2",
    // });
    props.modalSuccessClose();
    props.setRadioModal(false);
    // const text = JSON.stringify(latestAddress[e.target.id]);
    // window.opener.postMessage(`Save_Address__${text}`);
    // // dispatch({
    // //   type: SAVE_ADDRESS_REQUEST,
    // //   payload: e.target.id,
    // // });
    // window.close();
    // self.close() 자기 자신 닫기
    // window.close() 현재 보고 있는 창
  };

  return (
    <div className="address__container">
      <div className="address__title__container">
        <span className="address__title">최근 배송지</span>
        <span>(주소클릭)</span>
      </div>
      <div>
        {latestAddress
          ? latestAddress.map((x, index) => (
              <div
                key={x.id}
                className="address__one__container"
                // onClick={(x) => console.log(x, "LatestAddress")}
              >
                <div className="address__one" onClick={saveAddress} id={index}>
                  {index + 1}. {`${x.shippingAddress}`}
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default LatestAddress;
