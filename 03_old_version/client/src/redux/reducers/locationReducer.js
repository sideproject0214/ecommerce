import { LOCATION_CHANGE } from "react-router-redux";
const initialState = {
  loading: false,
  userUUID: "",
  cartItems: cartItemsFromLocalStorage,
  orderSubmitItems: orderSubmitItemsFromLocalStorage,
  shippingAddress: {},
  myShippingList: "",
  error: "",
  reviewCheck: "",
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    // Cart

    case LOCATION_CHANGE:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default locationReducer;
