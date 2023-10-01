import React from "react";
import { Link, useOutletContext } from "react-router-dom";
// import { useDispatch } from "react-redux";

const AdminHome = () => {
  // const dispatch = useDispatch();
  // const { adminSummary } = useSelector((state) => state.admin);
  const result = useOutletContext();
  // console.log(result, "adminHome result");

  console.log(result, result.sales, result.reviews);

  return (
    <div className="admin__body__context">
      <div className="admin__body__context__recent-orders">
        <div className="admin__body__context__recent-orders__header">
          <h2>주문 현황</h2>
          <Link
            to="#"
            className="admin__body__context__recent-orders__header__btn"
          >
            모두 보기
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <td>상품명</td>
              <td>가격</td>
              <td>결제여부</td>
              <td>배송상태</td>
            </tr>
          </thead>
          <tbody>
            {result.sales &&
              result.sales.map((value, index) => (
                <tr key={index}>
                  <td>
                    {value.orderItems.length === 1
                      ? `${value.orderItems[0].name}`
                      : `${value.orderItems[0].name} 외 ${
                          value.orderItems.length - 1
                        }건`}
                  </td>
                  <td>{`${Number(value.totalPrice).toLocaleString()}원`}</td>
                  <td>결제완료</td>
                  <td>
                    {value.trackingContents ? (
                      <span className="status delivered">배달중</span>
                    ) : (
                      <span className="status pending">대기중</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="admin__body__context__recent-reviews">
        <div className="admin__body__context__recent-reviews__header">
          <h2>최근 리뷰</h2>
          <Link
            to="/admin/review"
            className="admin__body__context__recent-reviews__header__btn"
          >
            모두 보기
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <td>내용</td>
              <td>작성자</td>
            </tr>
          </thead>
          <tbody>
            {result.reviews &&
              result.reviews.map((value, index) => (
                <tr key={index}>
                  <td>{value.comments}</td>
                  <td>{value.userName}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
