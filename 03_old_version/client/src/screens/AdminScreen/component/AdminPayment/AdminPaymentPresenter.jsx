import React from "react";
import { Link } from "react-router-dom";
import KakaoPayCancelModal from "../../../../components/modal/KakaoPayCancelModal";
import Modal from "../../../../components/modal/modal";
import TrackingModal from "../../../../components/modal/TrackingModal";
import WhiteLoader from "../../../../components/WhiteLoader";

const AdminPaymentPresenter = (props) => {
  return (
    <>
      {props.modal ? (
        <Modal onClick={props.modalOpen}>
          <KakaoPayCancelModal orderCancelBtn={props.orderCancelBtn} />
        </Modal>
      ) : (
        ""
      )}
      {props.trackingModal ? (
        <Modal>
          <TrackingModal
            handleTrackingNumberWrite={props.handleTrackingNumberWrite}
            inputWrite={props.inputWrite}
            trackingNumberModalOpen={props.trackingNumberModalOpen}
            targetId={props.targetId}
            submitHandler={props.submitHandler}
            bundleDelivery={props.bundleDelivery}
            bundleDeliveryHandle={props.bundleDeliveryHandle}
            trackingContents={props.adminOrderList.filter(
              (x) => x.orderId === props.targetId
            )}
          />
        </Modal>
      ) : (
        ""
      )}
      {props.loading ? (
        <Modal>
          <WhiteLoader />
        </Modal>
      ) : (
        ""
      )}
      {
        <div className="adminPayment-container">
          <div className="overview-title-header">
            <p className="overview-font">
              <span className="overview-title">주문내역</span>
              <span>조회</span>
            </p>
          </div>
          <div className="order-table">
            <table className="table-contents">
              <colgroup>
                <col style={{ width: "11%" }} />
                <col style={{ width: "6%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "19%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "7%" }} />
              </colgroup>
              <thead className="">
                <tr className="top-row admin-tr">
                  <th scope="col">주문번호(주문일자)</th>
                  <th scope="col">이름</th>
                  <th scope="col">총금액</th>
                  <th scope="col">결제여부</th>
                  <th scope="col">주문상품정보</th>
                  <th scope="col">상품금액(수량)</th>
                  <th scope="col">배송비</th>
                  <th scope="col">송장번호</th>
                  <th scope="col">배송상태</th>
                  <th scope="col">취소</th>
                </tr>
              </thead>

              {props.adminOrderList
                ? props.adminOrderList.map((result, index) => {
                    // const result = x;
                    // const result = x[1][0];
                    // console.log(result, index, "x index");
                    // console.log(result.createdAt.split(/\./g), "x");

                    return (
                      // table은 <tr>이 2개이면 <table>로 감싸고 렌더링해야 한다. 일반
                      // 리액트처럼 <></> fragment를 사용하면 안된다.
                      <tbody key={Math.random()}>
                        <tr>
                          <td>
                            <div className="product__orderId" id={index}>
                              {result.orderId}
                            </div>
                            <div>
                              {`(${result.createdAt
                                .split(/\./g)[0]
                                .replace(/T/gi, " ")})`}
                            </div>
                          </td>
                          <td>{result.userName}</td>
                          <td
                            className="total__text admin"
                            id={`${result.orderId}__amount`}
                          >
                            {Number(result.totalPrice).toLocaleString()}원
                          </td>
                          <td>
                            {result.isPaid ? (
                              <div className="">결제완료</div>
                            ) : (
                              <div style={{ color: "red", fontWeight: "bold" }}>
                                결제실패
                              </div>
                            )}
                          </td>
                          <td>
                            <div>
                              {result.orderItems.map((x, i) => {
                                // console.log(x, "orderItems.name");
                                return (
                                  <div
                                    className="myOrder__Box"
                                    key={`${Math.random() * 1.2}`}
                                  >
                                    <div
                                      className=""
                                      key={`${Math.random() * 1.3}`}
                                    >
                                      <img
                                        src={x.image}
                                        alt=""
                                        className="product-fit"
                                      />
                                    </div>
                                    <div className="product__name__box">
                                      <div
                                        className="product__name "
                                        id={`${result.orderId}&&${x.productUUID}__name`}
                                      >
                                        <Link to={`/product/${x.productUUID}`}>
                                          {x.name}
                                        </Link>
                                      </div>
                                      <div className="product-name-option">
                                        선택옵션 : {x.size}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                          <td>
                            {result.orderItems.map((x, i) => {
                              return (
                                <div
                                  className="myOrder__Box"
                                  key={`${Math.random() * 1.4}`}
                                >
                                  <div className="product__price">
                                    {`${x.price.toLocaleString()}원`}
                                  </div>
                                </div>
                              );
                            })}
                          </td>
                          <td>
                            {result.orderItems.map((x, i) => {
                              return (
                                <div
                                  className="myOrder__Box"
                                  key={`${Math.random() * 1.5}`}
                                >
                                  <div className="product__price">
                                    {`${x.deliveryFee.toLocaleString()}원`}
                                  </div>
                                </div>
                              );
                            })}
                          </td>
                          <td>
                            <div className="myTrackingNum__box">
                              {result.trackingNumber !== null &&
                              result.trackingNumber.length !== 0 ? (
                                result.trackingNumber.map((x, i) => {
                                  // console.log(x, i, "TrackingNumber");
                                  return (
                                    <div
                                      className="myTrackingNum__box__remodify"
                                      key={`${result.orderId}_${i}`}
                                    >
                                      <button
                                        className="table-btn remodify"
                                        onClick={props.trackingNumberModalOpen}
                                        id={result.orderId}
                                      >
                                        재수정
                                      </button>
                                      <div className="myTrackingNum__box__remodify__num">
                                        {x}
                                      </div>
                                    </div>
                                  );
                                })
                              ) : result.isPaid === false ? (
                                ""
                              ) : (
                                <div
                                  className="product__button"
                                  key={`${Math.random() * 2}`}
                                >
                                  <button
                                    className="table-btn modify"
                                    onClick={props.trackingNumberModalOpen}
                                    id={result.orderId}
                                  >
                                    수정
                                  </button>
                                </div>
                              )}
                              {/* <input
                                type="text"
                                name={result.orderId}
                                value={props.form[result.orderId]}
                                placeholder="송장번호를 적어주세요"
                                onChange={props.onChange1}
                              /> */}
                              {/* <input
                                ref={props.autoFocus}
                                type="text"
                                name={result.orderId}
                                value={props.inputWrite[result.orderId]}
                                placeholder="송장번호를 적어주세요"
                                onChange={props.handleTrackingNumberWrite}
                              /> */}
                            </div>
                          </td>
                          <td>
                            {result.trackingContents &&
                            result.trackingContents.length !== 0
                              ? result.trackingContents.map((x, i) => {
                                  return x.state.text !== undefined ? (
                                    <div
                                      className="myOrder__Box"
                                      key={`${Math.random() * 1.7 - i + 5}`}
                                    >
                                      <div className="product__price">
                                        {x.state.text}
                                      </div>
                                    </div>
                                  ) : (
                                    <div
                                      className="myOrder__Box"
                                      key={`${Math.random() * 1.8}`}
                                    >
                                      <div className="product__price">x</div>
                                    </div>
                                  );
                                })
                              : !result.isPaid
                              ? ""
                              : "배송 전"}
                          </td>
                          <td>
                            <div
                              className="myOrder__Box cancel"
                              key={`${Math.random() * 1.9}`}
                            >
                              {result.isPaid === false ? (
                                <div
                                  className="product__button"
                                  key={`${Math.random() * 2}`}
                                >
                                  <button
                                    className="table-btn non-cancellable "
                                    id={result.orderId}
                                  >
                                    취소불가
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="product__button"
                                  key={`${Math.random() * 2}`}
                                >
                                  <button
                                    className="table-btn "
                                    onClick={props.modalOpen}
                                    id={result.orderId}
                                  >
                                    취소
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                : null}
            </table>
          </div>
          <div className="control-month">
            {props.current === 0 ? (
              <div className="month"></div>
            ) : (
              <div className="month" onClick={props.prevMonth}>
                <i className="fas fa-chevron-circle-left prev-month"></i>
                <span>{`${props.current}개월 전`}</span>
              </div>
            )}
            <div className="month" onClick={props.nextMonth}>
              <span>{`${props.current + 1}개월 전`}</span>
              <i className="fas fa-chevron-circle-right next-month"></i>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default AdminPaymentPresenter;
