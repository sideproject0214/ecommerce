import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { ORDER_ITEMS_RESET_REQUEST } from "../../redux/constant/payConstant";

const PaymentSucess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: ORDER_ITEMS_RESET_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <Message height={"50rem"}>
        <div className="message">
          <div className="message__header">
            <h2>주문이 완료되었습니다</h2>
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

export default PaymentSucess;
