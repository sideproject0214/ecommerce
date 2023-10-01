import React from "react";
import { Link } from "react-router-dom";
import { useGetAdminSummaryQuery } from "../../redux/apiSlices/extendedAdmin";
import "./AdminHome.scss";

const AdminHome = () => {
  const { totalSales, reviewContents } = useGetAdminSummaryQuery(
    "getAdminSummary",
    {
      selectFromResult: ({ data }) => ({
        totalSales: data?.entities[1].contents,
        reviewContents: data?.entities[6].contents,
      }),
    }
  );

  return (
    <div className="admin__body__context">
      <div className="admin__body__context__recent-orders">
        <div className="admin__body__context__recent-orders__header">
          <h2>주문 현황</h2>
          <Link
            to="/admin/order"
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
            {totalSales?.map((value, index) => (
              <tr key={index}>
                <td>
                  {value.orderItems.length === 1
                    ? `${value.orderItems[0].name}`
                    : `${value.orderItems[0].name} 외 ${
                        value.orderItems.length - 1
                      }건`}
                </td>
                <td>{`${Number(value.totalPrice).toLocaleString()}원`}</td>
                <td>{value?.isPaid ? "결제완료" : "결제실패"}</td>
                <td>
                  {value.trackingContents &&
                  value?.trackingContents?.length !== 0 ? (
                    value?.trackingContents?.map((x, i) => {
                      return x.state.text !== undefined ? (
                        <div
                          key={`${Math.random() * 1.7 - i + 5}`}
                          className={
                            x.state.text === "배송완료"
                              ? "status delivered"
                              : x.state.text === "환불 중"
                              ? "status returned"
                              : "status inprogress"
                          }
                        >
                          <div>{x.state.text}</div>
                        </div>
                      ) : (
                        <div
                          key={`${Math.random() * 1.8}`}
                          className="status pending"
                        >
                          <div>대기중</div>
                        </div>
                      );
                    })
                  ) : !value.isPaid ? (
                    ""
                  ) : (
                    <div className="status before">배송 전</div>
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
            {reviewContents?.map((value, index) => (
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
