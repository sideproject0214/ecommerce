import React from "react";

const TrackingModal = ({
  handleTrackingNumberWrite,
  inputWrite,
  trackingNumberModalOpen,
  targetId,
  submitHandler,
  bundleDelivery,
  bundleDeliveryHandle,

  trackingContents,
}) => {
  // console.log("orderPayItems", orderPayItems);
  // useEffect(() => {
  //   dispatch({
  //     type: KAKAO_PAY_REQUEST,
  //     payload: orderPayItems,
  //   });
  // // }, [dispatch, orderPayItems]);
  // console.log("targetId", targetId);
  // console.log(trackingContents[0].orderItems, "TrackingModal");
  // console.log(
  //   adminOrderList.filter((x) => x.orderId === targetId),
  //   "TrackingModal"
  // );
  console.log(bundleDelivery, "bu");
  return (
    <>
      <div className="tracking-modal">
        <div className="tracking-modal__box">
          <div className="tracking-modal__box__body">
            <div className="tracking-modal__box__body__title">
              {trackingContents[0].orderItems.length > 1 ? (
                <>
                  <h2>묶음배송 여부</h2>
                  <input
                    type="checkbox"
                    name={targetId}
                    value={bundleDelivery}
                    placeholder="로젠 송장번호를 입력해주세요"
                    onChange={bundleDeliveryHandle}
                  />
                </>
              ) : (
                <h2>송장번호 입력</h2>
              )}
            </div>
            <div className="tracking-modal__box__body__contents">
              {bundleDelivery ? (
                trackingContents[0].orderItems.length > 2 ? (
                  <div className="tracking-modal__box__body__contents__details">
                    <p>{`${trackingContents[0].orderItems[0].name} 외 ${
                      trackingContents[0].orderItems.length - 1
                    }건`}</p>
                    <input
                      type="text"
                      name={`${targetId}-0`}
                      value={inputWrite[`${targetId}-0`] || ""}
                      placeholder="로젠 송장번호를 입력해주세요"
                      onChange={handleTrackingNumberWrite}
                    />
                  </div>
                ) : (
                  <div className="tracking-modal__box__body__contents__details">
                    <p>{`${trackingContents[0].orderItems[0].name}`}</p>
                    <input
                      type="text"
                      name={`${targetId}-0`}
                      value={inputWrite[`${targetId}-0`] || ""}
                      placeholder="로젠 송장번호를 입력해주세요"
                      onChange={handleTrackingNumberWrite}
                    />
                  </div>
                )
              ) : (
                trackingContents[0].orderItems.map((x, i) => (
                  <div
                    className="tracking-modal__box__body__contents__details"
                    key={i}
                  >
                    <p>{x.name}</p>
                    <input
                      type="text"
                      name={`${targetId}-${i}`}
                      value={inputWrite[`${targetId}-${i}`] || ""}
                      placeholder="로젠 송장번호를 입력해주세요"
                      onChange={handleTrackingNumberWrite}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="tracking-modal__box__footer">
            <div className="answer select right">
              <div className="yesno submit" onClick={submitHandler}>
                <div className="yes-1">제출하기</div>
              </div>
            </div>
            <div
              className="answer select left"
              onClick={trackingNumberModalOpen}
            >
              <div className="yesno close">
                <div className="no-1">닫기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingModal;
