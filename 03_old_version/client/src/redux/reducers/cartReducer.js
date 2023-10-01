import {
  CART_ADD_ITEM_FAILURE,
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAILURE,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CHECK_MY_SHIPPING_FAILURE,
  CHECK_MY_SHIPPING_REQUEST,
  CHECK_MY_SHIPPING_SUCCESS,
  CREATE_REVIEW_FAILURE,
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  ORDER_SUBMIT_FAILURE,
  ORDER_SUBMIT_REQUEST,
  ORDER_SUBMIT_SUCCESS,
  SHIPPING_LOAD_FAILURE,
  SHIPPING_LOAD_REQUEST,
  SHIPPING_LOAD_SUCCESS,
  UPDATE_OPEN_FAILURE,
  UPDATE_OPEN_REQUEST,
  UPDATE_OPEN_SUCCESS,
  UPDATE_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
} from "../constant/cartConstant";
import {
  KAKAO_PAY_CANCEL_FAILURE,
  KAKAO_PAY_CANCEL_REQUEST,
  KAKAO_PAY_CANCEL_SUCCESS,
  ORDER_ITEMS_RESET_SUCCESS,
} from "../constant/payConstant";

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
// const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems")).filter(
//       (x) => x.userUUID === userUUID
//     )
//   : [];

const orderSubmitItemsFromLocalStorage = localStorage.getItem(
  "orderSubmitItems"
)
  ? JSON.parse(localStorage.getItem("orderSubmitItems"))
  : [];

const initialState = {
  loading: false,
  userUUID: "",
  cartItems: cartItemsFromLocalStorage,
  orderSubmitItems: orderSubmitItemsFromLocalStorage,
  shippingAddress: {},
  myShippingList: "",
  reviewCheck: [],
  updateReview: "",
  error: "",
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Cart
    case CART_ADD_ITEM_REQUEST:
    case CART_REMOVE_ITEM_REQUEST:
    case CHECK_MY_SHIPPING_REQUEST:
    case CREATE_REVIEW_REQUEST:
    case ORDER_SUBMIT_REQUEST:
    case KAKAO_PAY_CANCEL_REQUEST:
    case KAKAO_PAY_CANCEL_FAILURE:
      return {
        ...state,
        loading: true,
      };

    case SHIPPING_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        reviewCheck: "",
        myShippingList: "",
      };

    case CART_ADD_ITEM_FAILURE:
    case SHIPPING_LOAD_FAILURE:
    case CART_REMOVE_ITEM_FAILURE:
    case CHECK_MY_SHIPPING_FAILURE:
    case CREATE_REVIEW_FAILURE:
    case UPDATE_OPEN_FAILURE:
    case ORDER_SUBMIT_FAILURE:
    case UPDATE_REVIEW_FAILURE:
      return {
        loading: true,
        error: action.payload,
      };

    case CART_ADD_ITEM_SUCCESS:
      console.log("CART_ADD_ITEM", action.payload);
      console.log("existItems", state.cartItems);
      const item = action.payload;

      const existItems = state.cartItems.find(
        (x) =>
          x.productUUID === item.productUUID && x.userUUID === item.userUUID
      );

      console.log(existItems, "existItems, CART_ADD_ITEM_SUCCESS");

      if (existItems) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productUUID === existItems.productUUID &&
            x.userUUID === item.userUUID
              ? item
              : x
          ),
          loading: false,
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
        loading: false,
      };

    case CART_REMOVE_ITEM_SUCCESS:
      console.log(state.cartItems, "state.cartItems");

      const removeItem = action.payload;
      console.log(removeItem, "removeItem");

      const userfiltered = state.cartItems.filter(
        (x) => x.userUUID !== removeItem.userUUID
      );
      console.log(userfiltered, "userfiltered");

      const productfiltered = state.cartItems.filter(
        (x) =>
          x.userUUID === removeItem.userUUID &&
          x.productUUID !== removeItem.productUUID
      );
      console.log(productfiltered, "productfiltered");
      return {
        ...state,

        cartItems: [...userfiltered, ...productfiltered],
        loading: false,
      };

    // case CART_ITEM_REQUEST:
    //   return {
    //     ...state,

    //     loading: false,
    //   };

    // case CART_ITEM_SUCCESS:
    //   const myCartItems = state.cartItems.find(
    //     (x) =>
    //       x.productUUID === item.productUUID && x.userUUID === item.userUUID
    //   );

    //   if (myCartItems) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.map((x) =>
    //         x.productUUID === myCartItems.productUUID ? item : x
    //       ),
    //       loading: false,
    //     };
    //   }

    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map((x) =>
    //       x.productUUID === myCartItems.productUUID ? myCartItems : x
    //     ),
    //     loading: false,
    //   };
    // case CART_ITEM_FAILURE:
    //   return {
    //     ...state,

    //     loading: false,
    //   };
    case ORDER_ITEMS_RESET_SUCCESS:
      return {
        ...state,
        cartItems: [],
        loading: false,
      };

    case SHIPPING_LOAD_SUCCESS:
      console.log("Shipping Load Success", action.payload);
      return {
        ...state,
        myShippingList: action.payload,

        loading: false,
      };

    case CHECK_MY_SHIPPING_SUCCESS:
      console.log("CHECK MY SHIPPING", action.payload);
      return {
        ...state,
        myShippingList: action.payload,
        loading: false,
      };
    case CREATE_REVIEW_SUCCESS:
      console.log("CHECK MY SHIPPING", action.payload);
      return {
        ...state,

        reviewCheck: [...state.reviewCheck, action.payload],
        loading: false,
      };

    case UPDATE_OPEN_REQUEST:
      return {
        ...state,

        updateReview: [],
        loading: false,
      };
    case UPDATE_OPEN_SUCCESS:
      console.log("UPdate Open Success", action.payload[0]);
      return {
        ...state,

        updateReview: action.payload[0],
        loading: false,
      };

    case ORDER_SUBMIT_SUCCESS:
      console.log("order sumbit", action.payload);
      return {
        ...state,

        orderSubmitItems: action.payload,
        loading: false,
      };
    // Kakao Pay Cancel Success
    case KAKAO_PAY_CANCEL_SUCCESS:
      return {
        // cartItems: "",
        // cancelInfo: "",
      };
    case UPDATE_REVIEW_REQUEST:
      return {
        ...state,

        updateReview: [],
        loading: false,
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        // updateReview: "",
      };

    default:
      return state;
  }
};

export default cartReducer;
