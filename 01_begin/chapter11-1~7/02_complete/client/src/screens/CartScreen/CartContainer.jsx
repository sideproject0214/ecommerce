import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearRadioSet } from "../../redux/slices/addressSlice";
import { resetState } from "../../redux/slices/paySlice";
import { addOrderItems } from "../../redux/slices/postSlice";
import CartPresenter from "./CartPresenter";

const CartContainer = () => {
  const { cartItems } = useSelector((state) => state.posts);
  const { profile } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemsFiltered =
    cartItems && cartItems.length !== 0
      ? cartItems.filter((item) => item.userUUID === profile.userUUID)
      : [];

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
    // const p = { cartItemsFiltered, ...result };
    // console.log(p, "CartItemsFiltered Result");
    dispatch(addOrderItems({ cartItemsFiltered, result }));
    dispatch(resetState());
    dispatch(clearRadioSet());
    navigate("/payment");
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
