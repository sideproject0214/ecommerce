import React from "react";
import "./KakaoPayCancelModal.scss";

const KakaoPayCancelModal = (props) => {
  return (
    <>
      <div className="kakaoPayCancelModal">
        <div className="kakao__cancel__box">
          <div className="question__box">
            <div className="question">
              <i className="fa-solid fa-exclamation"></i>
              <h4>구매를 취소하시겠습니까?</h4>
              <p>즉시 환불 처리됩니다</p>
            </div>
          </div>
          <div className="answer__box">
            <div className="answer select right" onClick={props.orderCancelBtn}>
              <div className="yesno yes">
                <div className="yes-1">네</div>
              </div>
            </div>
            <div className="answer select left">
              <div className="yesno no">
                <div className="no-1">아니오</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KakaoPayCancelModal;
