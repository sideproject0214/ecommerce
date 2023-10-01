import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CART_ADD_ITEM_REQUEST,
  CART_REMOVE_ITEM_REQUEST,
} from "../redux/constant/cartConstant";

const CartItemExists = ({ props, select, trash }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart-card-container">
        {props.cartItemsFiltered.map((item) => (
          <div className="cart-item-card" key={item.productUUID}>
            <div className="card-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="card-product-name">
              <div className="card-product-name2">
                <Link to={`/product/${item.productUUID}`}>{item.name}</Link>
              </div>
              <div className="product-name-option">선택옵션 : {item.size}</div>
            </div>
            <div className="card-product-price">
              {item.price && item.price.toLocaleString()}원
            </div>

            {select ? (
              <>
                <div className="select-option">
                  <select
                    value={item.total}
                    onChange={(e) =>
                      dispatch({
                        type: CART_ADD_ITEM_REQUEST,
                        payload: {
                          ...item,
                          uuid: item.productUUID,
                          userUUID: props.profile.userUUID,
                          total: e.target.value,
                        },
                      })
                    }
                    name={item.productUUID}
                  >
                    {[...Array(item.maxTotal).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div
                style={{
                  width: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="">{item.total}개</div>
              </div>
            )}
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

            {trash ? (
              <div className="cart-remove-item">
                <i
                  className="fas fa-trash "
                  onClick={() =>
                    dispatch({
                      type: CART_REMOVE_ITEM_REQUEST,
                      payload: {
                        // ...item,
                        productUUID: item.productUUID,
                        userUUID: props.profile.userUUID,
                      },
                    })
                  }
                ></i>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};

CartItemExists.defaultProps = {
  select: true,
  trash: true,
};

export default CartItemExists;
