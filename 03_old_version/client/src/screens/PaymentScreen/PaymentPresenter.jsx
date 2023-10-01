import React from "react";
import Modal from "../../components/modal/modal";
import KakaoPayModal from "../../components/modal/KakaoPayModal";
import CartItemExists from "../../components/CartItemExists";

import LatestAddress from "../../components/modal/LatestAddress";

const PaymentPresenter = (props) => {
  console.log(props.form, props.orderPayItems, "form");
  return (
    <>
      {props.modal ? (
        <Modal onClick={props.modalSuccessClose}>
          <KakaoPayModal />
        </Modal>
      ) : (
        ""
      )}
      <div className="container">
        <div className="cart-container">
          <div className="cart-left-col">
            <div className="cart_order_header">주문결제</div>

            <div className="payment-info">
              <div className="shipping">배송정보</div>
              <div className="shipping-select">
                <label className="radio-button-container">
                  기본배송지
                  <input
                    type="radio"
                    value="1"
                    name="shipping"
                    checked={props.radio === "1" ? true : false}
                    onChange={props.radioHandle}
                  />
                  <span className="checkmark"></span>
                </label>

                <label
                  className="radio-button-container"

                  // id="2"
                >
                  최근배송지
                  <input
                    type="radio"
                    value="2"
                    name="shipping"
                    checked={props.radio === "2" ? true : false}
                    onChange={props.radioHandle}
                  />
                  <span
                    className={
                      props.radio === "2" ? "radio2 checkmark" : "checkmark"
                    }
                  ></span>
                  {/* <WindowOpener
                    url="/address/recent"
                    cName="snsLogin-btn naver-btn"
                    width="500"
                    height="600"
                    checked={props.radio === 2 ? true : false}
                  ></WindowOpener> */}
                  {props.radioModal ? (
                    <Modal>
                      <LatestAddress
                        modalSuccessClose={props.modalSuccessClose}
                        setRadioModal={props.setRadioModal}
                      />
                    </Modal>
                  ) : (
                    ""
                  )}
                </label>
                <label className="radio-button-container">
                  직접입력
                  <input
                    type="radio"
                    value="3"
                    name="shipping"
                    checked={props.radio === "3" ? true : false}
                    onChange={props.radioHandle}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <form className="shipping-address">
                <input
                  className="basic-input"
                  type="text"
                  placeholder="받는 사람"
                  name="recipient"
                  value={props.form.recipient}
                  // defaultValue={
                  //   props.getAddress.recipient
                  //     ? props.getAddress.recipient
                  //     : props.form.recipient
                  //     ? props.form.recipient
                  //     : ""
                  // }
                  // value={props.formRef.recipient}
                  onChange={props.addressHandle}
                />
                <div className="address">
                  <div className="address-button" onClick={props.kakaoPostCode}>
                    주소찾기
                  </div>

                  <input
                    className="address-input"
                    type="text"
                    id="postcode"
                    name="postcode"
                    placeholder="우편번호"
                    value={props.form.postcode}
                    onChange={props.addressHandle}
                  />
                </div>
                <input
                  className="basic-input-2"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="기본 주소"
                  value={props.form.address}
                  onChange={props.addressHandle}
                />
                <div className="detail-address">
                  <input
                    className="detail-1"
                    type="text"
                    placeholder="상세 주소 및 건물명"
                    id="detailAddress"
                    name="detailAddress"
                    value={props.form.detailAddress}
                    onChange={props.addressHandle}
                  />
                  <input
                    className="detail-2"
                    type="text"
                    placeholder="참고항목"
                    id="extraAddress"
                    name="extraAddress"
                    value={props.form.extraAddress}
                    onChange={props.addressHandle}
                  />
                </div>
                <div className="phone-number">
                  <select
                    name="phone1"
                    onChange={props.addressHandle}
                    value={props.form.phone1}
                  >
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                  </select>
                  <input
                    className="phone2"
                    type="text"
                    placeholder="휴대폰 앞자리"
                    name="phone2"
                    maxLength="4"
                    value={props.form.phone2}
                    onChange={props.phoneNumberHandle}
                  />
                  <input
                    className="phone3"
                    type="text"
                    placeholder="휴대폰 뒷자리"
                    name="phone3"
                    maxLength="4"
                    value={props.form.phone3}
                    onChange={props.phoneNumberHandle}
                  />
                  <div className="number-alert">
                    {props.alert ? <span>숫자만 입력가능합니다</span> : ""}
                  </div>
                </div>
              </form>
              <div className="payment-info">주문상품</div>
            </div>
            {/* <div className="cart-card-container">
              {props.cartItemsFiltered &&
                props.cartItemsFiltered.map((item) => (
                  <div className="cart-item-card" key={item.productUUID}>
                    <div className="card-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="card-product-name">
                      <Link to={`/product/${item.productUUID}`}>
                        {item.name}
                      </Link>
                    </div>
                    <div className="card-product-price">
                      {item.price && item.price.toLocaleString()}원
                    </div>
                    <div className="payment-total-item">{item.total}개</div>
                    <div className="total-price">
                      {(item.price * item.total).toLocaleString()}원
                    </div>
                    {item.deliveryFee !== 0 ? (
                      <div className="card-product-delivery-price">
                        <div className="dilivery">
                          <div>{`${item.deliveryFee.toLocaleString()}원`}</div>
                          <div className="delivery-sub-bottom">배송비</div>
                        </div>
                      </div>
                    ) : (
                      <div className="card-product-delivery-price2">
                        <div className="free-shippig">무료배송</div>
                      </div>
                    )}
                  </div>
                ))}
            </div> */}
            <CartItemExists props={props} select={false} trash={false} />
          </div>
          <div className="cart-right-col cart-right-col-fix">
            <div className="cal-total">
              <h2>총 {props.totalCount && props.totalCount}개</h2>
              <h3>결제 예정금액</h3>
              <div className="cal-total-price">
                <h4>합계</h4>
                <span>
                  {props.totalPriceWithVat &&
                    props.totalPriceWithVat.toLocaleString()}
                  원
                </span>
              </div>

              <div
                className="cart-order kakao-pay"
                onClick={props.dispatchPayInfo}
              >
                <i></i>
              </div>
              {props.cancel ? (
                <div className="cart-order pay-cancel">
                  <i className="fas fa-times-circle"></i>결제취소 되었습니다
                </div>
              ) : (
                ""
              )}
              {props.failure ? (
                <div className="cart-order pay-cancel">
                  <i className="fas fa-times-circle"></i>결제실패 하였습니다
                </div>
              ) : (
                ""
              )}
              {props.payLoading ? (
                <div className="loader">
                  {/* <i className="fas fa-spinner spin"></i> */}
                </div>
              ) : (
                ""
              )}
              {props.addressAlert ? (
                <div className="cart-order pay-cancel">
                  <i className="fas fa-times-circle"></i>배송정보에 빈칸이
                  존재합니다
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPresenter;
