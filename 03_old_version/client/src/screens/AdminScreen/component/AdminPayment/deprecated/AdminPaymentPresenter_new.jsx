import React from "react";
import { Link } from "react-router-dom";
import KakaoPayCancelModal from "../../../../components/modal/KakaoPayCancelModal";
import Modal from "../../../../components/modal/modal";
import { TrackingNumber } from "./components/EditableRow";
import MonthPagination from "./components/MonthPagination";
import {
  TableHeader,
  TableContents,
  TrackingContents,
  TotalPrice,
} from "./components/ReadOnlyRow";

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
                          <TrackingNumber
                            result={result}
                            checkedInputs={props.checkedInputs}
                            inputWrite={props.inputWrite}
                            handleTrackingNumberWrite={
                              props.handleTrackingNumberWrite
                            }
                          />
                          <TrackingContents result={result} />
                        </tr>
                        <TotalPrice
                          result={result}
                          modalOpen={props.modalOpen}
                        />
                      </tbody>
                    );
                  })
                : null}
            </table>
          </div>
          <MonthPagination
            current={props.current}
            prevMonth={props.prevMonth}
            nextMonth={props.nextMonth}
          />
        </div>
      }
    </>
  );
};

export default AdminPaymentPresenter;
