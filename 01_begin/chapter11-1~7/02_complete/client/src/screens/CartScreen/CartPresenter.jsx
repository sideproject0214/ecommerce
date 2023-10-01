import { Link } from "react-router-dom";
import Message from "../../components/Message.jsx";
import CartItemExists from "./CartItemExists.jsx";
import { Helmet } from "react-helmet";

const CartPresenter = (props) => {
  const cartEmptyMessage = (
    <>
      <Helmet>
        <meta name="사플쇼핑" content="남자 옷, 여자 옷" />
        <title>장바구니 | Ecommerce</title>
      </Helmet>
      <Message height={"50rem"}>
        <div className="message">
          <div className="message__header">
            <h2> 장바구니가 비었습니다</h2>
          </div>
          <div className="message__body">
            <Link to="/" className="message__link">
              돌아가기
            </Link>
          </div>
        </div>
      </Message>
    </>
  );

  return props.cartItemsFiltered && props.cartItemsFiltered.length !== 0 ? (
    <>
      <Helmet>
        <meta name="사플쇼핑" content="남자 옷, 여자 옷" />
        <title>장바구니 | Ecommerce</title>
      </Helmet>
      <div className="container">
        <div className="cart-container">
          <div className="cart-left-col">
            <div className="cart_order_header">장바구니</div>
            <CartItemExists props={props} />
          </div>
          <div className="cart-right-col cart-right-col-fix">
            <div className="cal-total">
              <h2>총 {props.result.totalCount}개</h2>
              <h3>결제 예정금액</h3>
              <div className="cal-total-price">
                <h4>합계</h4>
                <span>{props.result.totalPrice.toLocaleString()}원</span>
              </div>

              <Link to="/">
                <div className="cart-order">계속 쇼핑하기</div>
              </Link>
              <div onClick={props.submitOrder}>
                <div className="cart-order two">주문하기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    cartEmptyMessage
  );
};

export default CartPresenter;
