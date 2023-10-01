import React from "react";
import { Link } from "react-router-dom";

export const TableHeader = ({
  checkedInputs,
  adminOrderList,
  allCheckHandle,
}) => {
  return (
    <thead
      // className="top-row admin-tr"
      className="admin-tr"
      style={{ position: "sticky", top: 0 }}
    >
      <tr>
        <th scope="col">
          <input
            type="checkbox"
            checked={
              checkedInputs.length === adminOrderList.length ? true : false
            }
            onChange={(e) => allCheckHandle(e.target.checked)}
            id="adminPaymentInput"
          />
        </th>
        <th scope="col">주문번호(주문일자)</th>
        <th scope="col">이름</th>
        <th scope="col">결제여부</th>
        <th scope="col">주문상품정보</th>
        <th scope="col">상품금액(수량)</th>
        <th scope="col">배송비(판매자)</th>
        <th
          scope="col"
          style={{
            textAlign: "center",
          }}
        >
          <div className="">송장번호</div>
          <div className="">(클릭시 수정)</div>
        </th>
        <th scope="col">배송상태</th>
      </tr>
    </thead>
  );
};

export const TableContents = ({
  result,
  checkedInputs,
  checkHandler,
  index,
}) => {
  return (
    <>
      <td>
        <input
          type="checkbox"
          name="checkbox"
          id={result.orderId}
          checked={
            checkedInputs && checkedInputs.includes(result.orderId)
              ? true
              : false
          }
          onChange={(e) => checkHandler(e.target.checked, e.target.id)}
        />
      </td>
      <td>
        <div className="product__orderId" id={index}>
          {result.orderId}
        </div>
        <div>{`(${result.createdAt.split(/\./g)[0].replace(/T/gi, " ")})`}</div>
      </td>
      <td>{result.User.name}</td>
      <td>
        {result.isPaid ? (
          <div className="">결제완료</div>
        ) : (
          <div style={{ color: "red", fontWeight: "bold" }}>결제실패</div>
        )}
      </td>
      <td>
        <div>
          {result.orderItems.map((x, i) => {
            // console.log(x, "orderItems.name");
            return (
              <div className="myOrder__Box" key={`${Math.random() * 1.2}`}>
                <div className="" key={`${Math.random() * 1.3}`}>
                  <img src={x.image} alt="" className="product-fit" />
                </div>
                <div className="product__name__box">
                  <div
                    className="product__name "
                    id={`${result.orderId}&&${x.productUUID}__name`}
                  >
                    <Link to={`/product/${x.productUUID}`}>{x.name}</Link>
                  </div>
                  <div className="product-name-option">선택옵션 : {x.size}</div>
                </div>
              </div>
            );
          })}
        </div>
      </td>
      <td>
        {result.orderItems.map((x, i) => {
          return (
            <div className="myOrder__Box" key={`${Math.random() * 1.4}`}>
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
            <div className="myOrder__Box" key={`${Math.random() * 1.5}`}>
              <div className="product__price">
                {`${x.deliveryFee.toLocaleString()}원`}
              </div>
            </div>
          );
        })}
      </td>
    </>
  );
};

export const TrackingContents = ({ result }) => (
  <td>
    {result.trackingContents && result.trackingContents.length !== 0
      ? result.trackingContents.map((x, i) => {
          return x.state.text !== undefined ? (
            <div
              className="myOrder__Box"
              key={`${Math.random() * 1.7 - i + 5}`}
            >
              <div className="product__price">{x.state.text}</div>
            </div>
          ) : (
            <div className="myOrder__Box" key={`${Math.random() * 1.8}`}>
              <div className="product__price">x</div>
            </div>
          );
        })
      : !result.isPaid
      ? ""
      : "배송 전"}
  </td>
);

export const TotalPrice = ({ result, modalOpen }) => {
  return (
    <tr key={`${Math.random() * 2.1}`}>
      <td colSpan="6"></td>
      <td colSpan="" className="total__text">
        총 합계
      </td>
      <td colSpan="1" className="total__text" id={`${result.orderId}__amount`}>
        {Number(result.totalPrice).toLocaleString()}원
      </td>
      <td colSpan="1">
        <div className="myOrder__Box cancel" key={`${Math.random() * 1.9}`}>
          {(result.trackingNumber && result.trackingNumber.length !== 0) ||
          result.isPaid === false ? (
            <div className="product__button" key={`${Math.random() * 2}`}>
              <button
                className="table-btn non-cancellable "
                id={result.orderId}
              >
                취소불가
              </button>
            </div>
          ) : (
            <div className="product__button" key={`${Math.random() * 2}`}>
              <button
                className="table-btn "
                onClick={modalOpen}
                id={result.orderId}
              >
                취소
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
