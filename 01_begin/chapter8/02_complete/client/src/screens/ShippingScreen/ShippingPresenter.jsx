import { Link } from "react-router-dom";
import KakaoPayCancelModal from "./KakaoPayCancelModal";
import ReviewModal from "./ReviewModal";
import ReviewUpdateModal from "./ReviewUpdateModal";
import Modal from "../../components/Modal";
import "./ShippingScreen.scss";
import { Helmet } from "react-helmet";

const ShippingPresenter = (props) => {
  return (
    <>
      <Helmet>
        <meta name="사플쇼핑" content="남자 옷, 여자 옷" />
        <title>주문배송 | Ecommerce</title>
      </Helmet>
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

              {props?.myShippingList?.ids.map((id, index) => {
                return (
                  // table은 <tr>이 2개이면 <table>로 감싸고 렌더링해야 한다. 일반
                  // 리액트처럼 <></> fragment를 사용하면 안된다.
                  <tbody key={id}>
                    <tr>
                      <td>
                        <div className="product__orderId" id={index}>
                          {props?.myShippingList?.entities[id]?.orderId}
                        </div>
                        <div>
                          {`(${props.myShippingList?.entities[id]?.createdAt
                            .split(/\./g)[0]
                            .replace(/T/gi, " ")})`}
                        </div>
                      </td>
                      <td>
                        <div>
                          {props?.myShippingList?.entities[id]?.orderItems.map(
                            (x, i) => {
                              // console.log(x, "orderItems.name");
                              return (
                                <div
                                  className="myOrder__Box"
                                  key={`${Math.random() * 1.2}`}
                                >
                                  <div className="">
                                    <img
                                      src={x.image}
                                      alt=""
                                      className="product-fit"
                                    />
                                  </div>
                                  <div className="product__name__box">
                                    <div
                                      className="product__name "
                                      id={`${props?.myShippingList?.entities[id]?.orderId}&&${x.uuid}__name`}
                                    >
                                      <Link to={`/post/${x.uuid}`}>
                                        {x.name}
                                      </Link>
                                    </div>
                                    <div className="product-name-option">
                                      선택옵션 : {x.size}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </td>
                      <td>
                        {props?.myShippingList?.entities[id]?.orderItems.map(
                          (x, i) => {
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
                          }
                        )}
                      </td>
                      <td>
                        {props?.myShippingList?.entities[id]?.orderItems.map(
                          (x, i) => {
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
                          }
                        )}
                      </td>
                      <td>
                        {props?.myShippingList?.entities[id]?.trackingNumber !==
                          null &&
                        props?.myShippingList?.entities[id]?.trackingNumber
                          .length !== 0
                          ? props?.myShippingList?.entities[
                              id
                            ]?.trackingNumber.map((x, i) => {
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
                        {props?.myShippingList?.entities[id]
                          ?.trackingContents &&
                        props?.myShippingList?.entities[id]?.trackingContents
                          .length !== 0
                          ? props?.myShippingList?.entities[
                              id
                            ]?.trackingContents.map((x, i) => {
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
                                  <div className="product__price">대기중</div>
                                </div>
                              );
                            })
                          : "배송 전"}
                      </td>
                      <td>
                        {props?.myShippingList?.entities[id]?.orderItems.map(
                          (x, i) => {
                            // 서버에서 리뷰가 만들어진 uuid만 보냄.
                            // 서버에서 보내는 것을 인식해서 프론트에서 업데이트 함.
                            return props?.myShippingList?.entities[
                              id
                            ]?.reviewCheck?.includes(`${x.uuid}`) ? (
                              <div
                                className="myOrder__Box review"
                                key={`${Math.random() * 1.9}`}
                              >
                                <div className="product__button">
                                  <button
                                    className="table-btn review checked"
                                    onClick={(e) => props.handleUpdateBtn(e)}
                                    id={`${props?.myShippingList?.entities[id]?.orderId}&&${x.uuid}`} //전체 index 더하기 개별 i(인덱스)
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
                                <div className="product__button">
                                  <button
                                    className="table-btn review"
                                    onClick={(e) => props.handleReviewBtn(e)}
                                    name={x.uuid}
                                    id={`${props?.myShippingList?.entities[id]?.orderId}&&${x.uuid}`} //전체 index 더하기 개별 i(인덱스)
                                    value={index + i + 1}
                                  >
                                    리뷰
                                  </button>
                                </div>
                              </div>
                            );
                          }
                        )}
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
                        id={`${props?.myShippingList?.entities[id]?.orderId}__amount`}
                      >
                        {Number(
                          props?.myShippingList?.entities[id]?.totalPrice
                        ).toLocaleString()}
                        원
                      </td>
                      <td colSpan="1">
                        <div
                          className="myOrder__Box cancel"
                          key={`${Math.random() * 1.9}`}
                        >
                          {props?.myShippingList?.entities[id]
                            ?.trackingNumber &&
                          props?.myShippingList?.entities[id]?.trackingNumber
                            .length !== 0 &&
                          props?.myShippingList?.entities[
                            id
                          ]?.trackingNumber.indexOf("") === -1 ? (
                            <div className="product__button">
                              <button
                                className="table-btn non-cancellable "
                                id={
                                  props?.myShippingList?.entities[id]?.orderId
                                }
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
                                id={
                                  props?.myShippingList?.entities[id]?.orderId
                                }
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
              })}
            </table>
          </div>
          <div className="control-month">
            {props.shippingPage === 0 ? (
              <div className="month"></div>
            ) : (
              <div className="month" onClick={props.prevMonth}>
                <i className="fa-solid fa-chevron-circle-left prev-month"></i>
                <span>{`${props.shippingPage}개월 전`}</span>
              </div>
            )}
            <div className="month" onClick={props.nextMonth}>
              <span>{`${props.shippingPage + 1}개월 전`}</span>
              <i className="fa-solid fa-chevron-circle-right next-month"></i>
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
              modalClose={props.modalClose}
              form={props.form}
              onChange={props.onChange}
              title={props.title}
              updateSubmit={props.updateSubmit}
              updateReview={props.updateReview}
              orderId={props.orderId}
              uuid={props.uuid}
            />
          ) : null}
        </div>
      }
    </>
  );
};

export default ShippingPresenter;
