import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { ORDER_SUBMIT_REQUEST } from "../../redux/constant/cartConstant";

import CartPresenter from "./CartPresenter";

const CartContainer = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { profile } = useSelector((state) => state.auth);
  // if (profile.NormalCookieToken) {
  //   profile = profile.NormalCookieToken;
  //   console.log(profile, "profile token");
  // }
  // console.log(profile, "proflie");
  const dispatch = useDispatch();

  // console.log(cartItems, "cartItems");

  // let cartItemsFiltered = [];

  const cartItemsFiltered =
    cartItems && cartItems.length !== 0
      ? cartItems.filter((item) => item.userUUID === profile.userUUID)
      : [];

  // if (cartItems && cartItems.length !== 0) {
  //   cartItemsFiltered = cartItems.filter(
  //     (item) => item.userUUID === profile.userUUID
  //   );
  //   console.log(cartItemsFiltered, "cartItemsFiltered1");
  //   return cartItemsFiltered;
  // }
  console.log(cartItemsFiltered, "cartItemsFiltered Result");

  const cartItemsTotal = () => {
    if (cartItemsFiltered) {
      const totalCount = cartItemsFiltered.reduce(
        (prevValue, item) => prevValue + Number(item.total),
        0
      );

      const totalPrice = cartItemsFiltered.reduce(
        (prevValue, item) =>
          prevValue + item.total * item.price + item.deliveryFee,
        0
      );

      const totalDeliveryPrice = cartItemsFiltered.reduce(
        (prevValue, item) => prevValue + item.deliveryFee,
        0
      );

      const total = { totalCount, totalPrice, totalDeliveryPrice };

      return total;
    }
  };

  const result = cartItemsTotal();

  const submitOrder = () => {
    // console.log(cartItemsFiltered, "CartItemsFiltereddfdfdfdfd");
    const p = { cartItemsFiltered, ...result };
    console.log(p, "CartItemsFiltered Result");

    dispatch({
      type: ORDER_SUBMIT_REQUEST,
      payload: { cartItemsFiltered, result },
    });
  };

  return (
    <CartPresenter
      cartItemsFiltered={cartItemsFiltered}
      profile={profile}
      submitOrder={submitOrder}
      result={result}
    />
  );
};

export default CartContainer;
