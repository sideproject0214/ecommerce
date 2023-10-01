import React from "react";
import { Link } from "react-router-dom";
import KakaoPayCancelModal from "../../components/modal/KakaoPayCancelModal";
import Modal from "../../components/modal/modal";
import ReviewModal from "../../components/modal/ReviewModal";
import ReviewUpdateModal from "../../components/modal/ReviewUpdateModal";

const ShippingPresenter = (props) => {
  return (
    <>
      {props.modal ? (
        <Modal onClick={props.modalOpen}>
          <KakaoPayCancelModal orderCancelBtn={props.orderCancelBtn} />
        </Modal>
      ) : (
        ""
      )}
      {
        <div className="table-container ">
          <div className="overview-title-header">
            <p className="overview-font">
              <span className="overview-title">주문내역</span>
              <span>조회</span>
            </p>
          </div>
          <div className="order-table">
            <table className="table-contents" style={{ width: "100%" }}>
              <colgroup>
                <col style={{ width: "17%" }} />
                <col style={{ width: "26%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "13%" }} />
                <col style={{ width: "11%" }} />
              </colgroup>
              <thead>
                <tr className="top-row">
                  <th scope="col">주문번호(주문일자)</th>
                  <th scope="col">주문상품정보</th>
                  <th scope="col">상품금액(수량)</th>
                  <th scope="col">배송비(판매자)</th>
                  <th scope="col">송장번호</th>
                  <th scope="col">배송상태</th>
                  <th scope="col">취소 / 리뷰</th>
                </tr>
              </thead>

              {props.myShippingList
                ? props.myShippingList.map((result, index) => {
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
                                    {/* {`${x.price.toLocaleString()}원`} */}
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
                                    {`${x.deliveryFee}원`}
                                  </div>
                                </div>
                              );
                            })}
                          </td>
                          <td>
                            {result.trackingNumber !== null &&
                            result.trackingNumber.length !== 0
                              ? result.trackingNumber.map((x, i) => {
                                  // console.log(x, i, "TrackingNumber");
                                  return (
                                    <div
                                      className="myOrder__Box"
                                      key={`${Math.random() * 1.6}`}
                                    >
                                      <div className="product__price">{x}</div>
                                    </div>
                                  );
                                })
                              : "배송준비중"}
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
                              : "배송 전"}
                          </td>
                          <td>
                            {result.orderItems.map((x, i) => {
                              // console.log(x, "orderItems x");
                              // console.log(result, "orderItems y");
                              // 서버에서 리뷰가 만들어진 productUUID만 보냄.
                              // 서버에서 보내는 것을 인식해서 프론트에서 업데이트 함.
                              return (result.reviewCheck &&
                                result.reviewCheck.includes(
                                  `${x.productUUID}`
                                )) ||
                                (props.reviewCheck &&
                                  props.reviewCheck.includes(
                                    `${x.productUUID}`
                                  )) ? (
                                <div
                                  className="myOrder__Box review"
                                  key={`${Math.random() * 1.9}`}
                                >
                                  <div
                                    className="product__button"
                                    key={`${Math.random() * 2}`}
                                  >
                                    <button
                                      className="table-btn review checked"
                                      // onClick={(e) =>
                                      //   props.setUpdateReviewOpen(true)
                                      // }
                                      onClick={(e) => props.handleUpdateBtn(e)}
                                      id={`${result.orderId}&&${x.productUUID}`} //전체 index 더하기 개별 i(인덱스)
                                    >
                                      리뷰수정
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="myOrder__Box review"
                                  key={`${Math.random() * 1.9}`}
                                >
                                  <div
                                    className="product__button"
                                    key={`${Math.random() * 2}`}
                                  >
                                    <button
                                      className="table-btn review"
                                      onClick={(e) => props.handleReviewBtn(e)}
                                      name={x.productUUID}
                                      id={`${result.orderId}&&${x.productUUID}`} //전체 index 더하기 개별 i(인덱스)
                                      value={index + i + 1}
                                    >
                                      리뷰
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </td>
                        </tr>
                        <tr key={`${Math.random() * 2.1}`}>
                          <td colSpan="4"></td>
                          <td colSpan="" className="total__text">
                            총 합계
                          </td>
                          <td
                            colSpan="1"
                            className="total__text"
                            id={`${result.orderId}__amount`}
                          >
                            {Number(result.totalPrice).toLocaleString()}원
                          </td>
                          <td colSpan="1">
                            <div
                              className="myOrder__Box cancel"
                              key={`${Math.random() * 1.9}`}
                            >
                              {result.trackingNumber &&
                              result.trackingNumber.length !== 0 ? (
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
          {props.reviewOpen ? (
            <ReviewModal
              setReviewOpen={props.setReviewOpen}
              form={props.form}
              onChange={props.onChange}
              title={props.title}
              handleSubmit={props.handleSubmit}
            />
          ) : null}
          {props.updateReviewOpen ? (
            <ReviewUpdateModal
              setUpdateReviewOpen={props.setUpdateReviewOpen}
              form={props.form}
              onChange={props.onChange}
              title={props.title}
              updateSubmit={props.updateSubmit}
              updateReview={props.updateReview}
              orderId={props.orderId}
              productUUID={props.productUUID}
            />
          ) : null}
        </div>
      }
    </>
  );
};

export default ShippingPresenter;
