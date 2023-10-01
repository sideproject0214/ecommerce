import React from "react";
import { Link } from "react-router-dom";
import Message from "../../components/Message";

const ShippingCancel = () => {
  return (
    <>
      <Message>
        <div className="message">
          <div className="message__header">
            <h2>주문이 취소되었습니다</h2>
          </div>
          <div className="message__body">
            <Link to="/shipping" className="message__link cancel">
              주문내역
            </Link>

            <Link to="/" className="message__link cancel">
              홈으로 가기
            </Link>
          </div>
        </div>
      </Message>
    </>
  );
};

export default ShippingCancel;
