import React from "react";
import { Link } from "react-router-dom";
import KakaoPayCancelModal from "../../../../components/modal/KakaoPayCancelModal";
import Modal from "../../../../components/modal/modal";
import { TrackingNumber } from "./components/EditableRow";
import { TableHeader, TableContents } from "./components/ReadOnlyRow";

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
      {
        <div className="adminPayment-container">
          <div className="overview-title-header">
            <p className="overview-font">
              <span className="overview-title">주문내역</span>
              <span>조회</span>
            </p>
          </div>
          <div className="order-table">
            <table className="table-contents" style={{ width: "100%" }}>
              <colgroup>
                <col style={{ width: "3%" }} />
                <col style={{ width: "14%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "8%" }} />
                <col style={{ width: "21%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "11%" }} />
                <col style={{ width: "15%" }} />
                <col style={{ width: "19%" }} />
              </colgroup>
              <TableHeader
                checkedInputs={props.checkedInputs}
                adminOrderList={props.adminOrderList}
                allCheckHandle={props.allCheckHandle}
              />

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
                          <TableContents
                            result={result}
                            checkedInputs={props.checkedInputs}
                            checkHandler={props.checkHandler}
                            index={index}
                          />
                          {/* <TrackingNumber
                            result={result}
                            checkedInputs={props.checkedInputs}
                            inputWrite={props.inputWrite}
                            handleTrackingNumberWrite={
                              props.handleTrackingNumberWrite
                            }
                          /> */}
                          <td>
                            <div className="">
                              {result.trackingNumber !== null &&
                              result.trackingNumber.length !== 0 ? (
                                result.trackingNumber.map((x, i) => {
                                  // console.log(x, i, "TrackingNumber");
                                  return (
                                    <div
                                      className="myOrder__Box"
                                      key={`${result.orderId}_${i}`}
                                    >
                                      <div className="product__price">{x}</div>
                                    </div>
                                  );
                                })
                              ) : result.isPaid === false ? (
                                ""
                              ) : props.checkedInputs.includes(
                                  result.orderId
                                ) ? (
                                <input
                                  autoFocus
                                  // ref={props.autoFocus} autoFocus를 안주면 렌더링할때마다 포커스를 잃는다
                                  type="text"
                                  name={result.orderId}
                                  value={props.inputWrite[result.orderId]}
                                  placeholder="송장번호를 적어주세요"
                                  onChange={props.handleTrackingNumberWrite}
                                />
                              ) : (
                                "배송준비중"
                              )}
                            </div>
                          </td>
                          ;
                          <TableContents result={result} />
                        </tr>
                        <tr key={`${Math.random() * 2.1}`}>
                          <td colSpan="6"></td>
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
                              {(result.trackingNumber &&
                                result.trackingNumber.length !== 0) ||
                              result.isPaid === false ? (
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
