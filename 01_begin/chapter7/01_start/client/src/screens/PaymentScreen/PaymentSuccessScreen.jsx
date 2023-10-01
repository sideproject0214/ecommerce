import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import { clearOrderItems } from "../../redux/slices/paySlice";
import "./PaymentSuccessScreen.scss";

const PaymentSuccess = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearOrderItems);
  }, []);

  return (
    <>
      <Message height={"65vh"}>
        <div className="message">
          <div className="message__header">
            <h2>주문이 완료되었습니다</h2>
          </div>
          <div className="message__body">
            <Link to="/shipping" className="message__link left">
              주문내역
            </Link>

            <Link to="/" className="message__link">
              홈으로 가기
            </Link>
          </div>
        </div>
      </Message>
    </>
  );
};

export default PaymentSuccess;
