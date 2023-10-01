import {
  ADMIN_DELETE_REVIEW_FAILURE,
  ADMIN_DELETE_REVIEW_REQUEST,
  ADMIN_DELETE_REVIEW_SUCCESS,
  ADMIN_ORDER_LIST_FAILURE,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ADMIN_POST_FAILURE,
  ADMIN_POST_REQUEST,
  ADMIN_POST_SUCCESS,
  ADMIN_PRODUCT_ONE_LOAD_POST_FAILURE,
  ADMIN_PRODUCT_ONE_LOAD_POST_REQUEST,
  ADMIN_PRODUCT_ONE_LOAD_POST_SUCCESS,
  ADMIN_REVIEW_FAILURE,
  ADMIN_REVIEW_REQUEST,
  ADMIN_REVIEW_SUCCESS,
  ADMIN_SEARCH_FAILURE,
  ADMIN_SEARCH_REQUEST,
  ADMIN_SEARCH_SUCCESS,
  ADMIN_SUMMARY_FAILURE,
  ADMIN_SUMMARY_REQUEST,
  ADMIN_SUMMARY_SUCCESS,
  ADMIN_TRACKING_NUMBER_FAILURE,
  ADMIN_TRACKING_NUMBER_REQUEST,
  ADMIN_TRACKING_NUMBER_SUCCESS,
  ADMIN_USER_FAILURE,
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCCESS,
  DELETE_ADMIN_POST_FAILURE,
  DELETE_ADMIN_POST_REQUEST,
  DELETE_ADMIN_POST_SUCCESS,
  DELETE_ADMIN_USER_FAILURE,
  DELETE_ADMIN_USER_REQUEST,
  DELETE_ADMIN_USER_SUCCESS,
  INITIALIZE_PASSWORD_FAILURE,
  INITIALIZE_PASSWORD_REQUEST,
  INITIALIZE_PASSWORD_SUCCESS,
  MAIN_IMAGE_DELETE_FAILURE,
  MAIN_IMAGE_DELETE_REQUEST,
  MAIN_IMAGE_DELETE_SUCCESS,
  MAKE_ADMIN_USER_FAILURE,
  MAKE_ADMIN_USER_REQUEST,
  MAKE_ADMIN_USER_SUCCESS,
  PRODUCT_IMAGE_MODIFY_FAILURE,
  PRODUCT_IMAGE_MODIFY_REQUEST,
  PRODUCT_IMAGE_MODIFY_SUCCESS,
  THUMBNAIL_IMAGE_DELETE_FAILURE,
  THUMBNAIL_IMAGE_DELETE_REQUEST,
  THUMBNAIL_IMAGE_DELETE_SUCCESS,
} from "../constant/adminConstant";
import { REMOVE_ALERTSIDE } from "../constant/alertConstant";

const initialState = {
  loading: false,
  adminSummary: [],
  adminUser: [],
  uuidArr: [],
  isAdmin: "",
  deleteUser: "",
  adminPost: [],
  adminPostCount: 0,
  initializeMsg: "",
  deletePostMsg: "",
  productOne: {},
  filteredValue: "",
  selectSet: "",
  newThumbnail: [],
  adminNavData: [],
  totalSales: [],
  mainImageDelete: false,
  adminOrderList: [],
  reviewList: [],
  reviewCount: "",
  deleteReviewMsg: "",
  errorPath: "",
  uuidArrSearch: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_SUMMARY_REQUEST:
    case ADMIN_USER_REQUEST:
    case MAKE_ADMIN_USER_REQUEST:
    case DELETE_ADMIN_USER_REQUEST:
    case ADMIN_POST_REQUEST:
    case INITIALIZE_PASSWORD_REQUEST:
    case DELETE_ADMIN_POST_REQUEST:
    case ADMIN_PRODUCT_ONE_LOAD_POST_REQUEST:
    case MAIN_IMAGE_DELETE_REQUEST:
    case THUMBNAIL_IMAGE_DELETE_REQUEST:
    case PRODUCT_IMAGE_MODIFY_REQUEST:
    case ADMIN_ORDER_LIST_REQUEST:
    case ADMIN_TRACKING_NUMBER_REQUEST:
    case ADMIN_REVIEW_REQUEST:
    case ADMIN_DELETE_REVIEW_REQUEST:
    case ADMIN_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADMIN_SUMMARY_FAILURE:
    case ADMIN_USER_FAILURE:
    case MAKE_ADMIN_USER_FAILURE:
    case DELETE_ADMIN_USER_FAILURE:
    case ADMIN_POST_FAILURE:
    case INITIALIZE_PASSWORD_FAILURE:
    case DELETE_ADMIN_POST_FAILURE:
    case ADMIN_PRODUCT_ONE_LOAD_POST_FAILURE:
    case MAIN_IMAGE_DELETE_FAILURE:
    case THUMBNAIL_IMAGE_DELETE_FAILURE:
    case PRODUCT_IMAGE_MODIFY_FAILURE:
    case ADMIN_ORDER_LIST_FAILURE:
    case ADMIN_TRACKING_NUMBER_FAILURE:
    case ADMIN_REVIEW_FAILURE:
    case ADMIN_DELETE_REVIEW_FAILURE:
    case ADMIN_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
      };

    // Admin Summary
    case ADMIN_SUMMARY_SUCCESS:
      return {
        ...state,
        adminSummary: action.payload,
        loading: false,
        totalSales: action.payload.allOrders.filter(
          (item) => item.isPaid === true
        ),

        adminNavData: [
          action.payload.userCount,
          action.payload.productCount,
          action.payload.allOrders
            .filter((item) => item.isPaid === true)
            .reduce((prev, item) => prev + Number(item.totalPrice), 0),
          action.payload.reviewCount.length,
        ],
      };

    // Admin Summary
    case ADMIN_USER_SUCCESS:
      console.log(action.payload, "admin-user-success");
      const uuidArr = action.payload.map((x) => ({ [x.uuid]: false }));
      // const uuidArr = action.payload.reduce(
      //   (pre, cur) => pre.append(cur.uuid),
      //   []
      // );
      console.log(uuidArr, " Arr");
      return {
        ...state,
        adminUser: action.payload,
        uuidArr,
        loading: false,
      };

    // Make Admin User
    case MAKE_ADMIN_USER_SUCCESS:
      console.log(action.payload, "make admin user");
      const item = action.payload;
      let changeAdminState = state.adminUser.find(
        (x) => x.uuid === item
      ).isAdmin;

      let objIndex = state.adminUser.findIndex((x) => x.uuid === item);
      console.log(changeAdminState, objIndex, "change admin");
      state.adminUser[objIndex].isAdmin = !changeAdminState;
      console.log(state.adminUser[objIndex].isAdmin, "new");
      return {
        ...state,
        // adminUser: state.adminUser.map(()),
        loading: false,
      };

    // Delete Admin User
    case DELETE_ADMIN_USER_SUCCESS:
      console.log(action.payload, "error");

      const user_uuid = action.payload.data;

      user_uuid.map((x) => {
        let objStartNum = state.adminUser.findIndex((y) => y.uuid === x);
        return state.adminUser.splice(objStartNum, 1);
      });

      return {
        ...state,
        deleteUser: action.payload,
        loading: false,
      };

    // Admin Post
    case ADMIN_POST_SUCCESS:
      return {
        ...state,
        adminPost: action.payload.result,
        adminPostCount: action.payload.count,
        loading: false,
      };

    case INITIALIZE_PASSWORD_SUCCESS:
      return {
        ...state,
        initializeMsg: action.payload,
        loading: false,
      };

    case DELETE_ADMIN_POST_SUCCESS:
      console.log(action.payload, "error");

      const post_uuid = action.payload.data;

      post_uuid.map((x) => {
        let objStartNum = state.adminPost.findIndex((y) => y.uuid === x);
        return state.adminPost.splice(objStartNum, 1);
      });
      console.log(
        (state.adminNavData[1] = state.adminNavData[1] - action.payload.count),
        "state.totalSales - action.payload"
      );
      console.log(state.adminNavData, "state.adminNavData");
      return {
        ...state,
        // adminNavData: (state.adminNavData[1] =
        //   state.adminNavData[1] - action.payload.count),
        deletePostMsg: action.payload,
        loading: false,
      };

    case REMOVE_ALERTSIDE:
      return {
        ...state,
        deletePostMsg: "",
      };

    case ADMIN_PRODUCT_ONE_LOAD_POST_SUCCESS:
      let emptySelectArr = [];
      let newSizeEmpty = [];
      let newStockEmpty = [];

      const data = action.payload;
      console.log(data, "reducer");
      const sizeArr = Object.entries(data.size);

      for (let i = 1; i <= sizeArr.length; i++) {
        emptySelectArr.push(i);
      }

      const newThumbnail = data.thumbnail.filter(
        (element, index) => index !== 0
      );

      console.log(emptySelectArr, "reducer");
      // select 배열만들기

      Object.keys(data.size).map((value, i) => {
        // console.log(value, i, "data size");
        newSizeEmpty.push({ [`size-${i + 1}`]: value });
        return newSizeEmpty;
      });

      Object.values(data.size).map((value, i) => {
        // console.log(value, i, "data values");
        newStockEmpty.push({ [`stock-${i + 1}`]: value });
        return newStockEmpty;
      });

      // console.log(newSizeEmpty, "reducer");
      console.log(newSizeEmpty, newStockEmpty, "reducer");

      const newArray1 = [
        { name: data.name },
        { description: data.description },
        { brand: data.brand },
        { category: data.category },
        { price: data.price },
        { sale: data.sale },
        { deliveryFee: data.deliveryFee },
      ];

      console.log(newArray1, "reducer");

      const newArray2 = [...newArray1, ...newSizeEmpty, ...newStockEmpty];

      const result3 = newArray2.reduce((prev, current) => {
        let key = Object.keys(current);
        console.log(current, key, current[key], prev[key]);
        // 위 콘솔창의 값 {size-1: '나비'}, size-1, "나비"

        prev[key] = current[key];
        // 이전 값에 키가 'size-1'이면 '나비'라는 값을 갖는다는 의미
        // prev[key] 배열에서 arr[0] 이런식으로 배열의 첫번째 값을 찾는 것과 같다고 보면 됨
        return prev;
      }, {});

      console.log(result3, "reducer");

      return {
        ...state,
        productOne: data,
        filteredValue: result3,
        selectSet: emptySelectArr,
        loading: false,
        newThumbnail: newThumbnail,
      };

    case MAIN_IMAGE_DELETE_SUCCESS:
      console.log(action.payload, "product Image delete");
      const target = state.productOne;
      const source = { image: undefined };
      const returnedTarget = Object.assign(target, source);
      console.log(state.productOne, "");
      return {
        ...state,
        productOne: returnedTarget,
        mainImageDelete: true,
        loading: false,
      };

    case THUMBNAIL_IMAGE_DELETE_SUCCESS:
      console.log(action.payload, "product Image delete2");

      const filteredTarget = state.newThumbnail.filter(
        (el) => el !== action.payload
      );
      // console.log(action.payload, filteredTarget, "filteredTarget");
      // console.log(state.productOne, "Aftre filtered productOne");

      const returnedThumnailTarget = (state.productOne.thumbnail =
        filteredTarget);
      // console.log(state.productOne, "first productOne");
      // const returnedThumnailTarget = Object.assign(target2, source2);
      // console.log(returnedThumnailTarget, "returnedTarget");
      return {
        ...state,
        // productOne: returnedThumnailTarget,
        newThumbnail: returnedThumnailTarget,
        thumbnailImageDelete: true,
        loading: false,
      };
    case PRODUCT_IMAGE_MODIFY_SUCCESS:
      return {
        ...state,

        loading: false,
      };

    case ADMIN_ORDER_LIST_SUCCESS:
      return {
        ...state,
        adminOrderList: action.payload,
        loading: false,
      };

    case ADMIN_TRACKING_NUMBER_SUCCESS:
      return {
        ...state,
        adminOrderList: action.payload,
        loading: false,
      };
    case ADMIN_REVIEW_SUCCESS:
      return {
        ...state,
        reviewList: action.payload.result,
        reviewCount: action.payload.count,
        loading: false,
      };
    case ADMIN_DELETE_REVIEW_SUCCESS:
      // review_id.map((x) => {
      //   let objStartNum = state.reviewList.findIndex((y) => `${y.id}` === x);
      //   return state.reviewList.splice(objStartNum, 1);
      // });

      console.log(
        (state.adminNavData[3] = state.adminNavData[3] - action.payload.count),
        "state.totalSales - action.payload"
      );
      console.log(action.payload, "review delete");
      return {
        ...state,
        deleteReviewMsg: action.payload,
        reviewList: action.payload.data,
        loading: false,
      };

    case ADMIN_SEARCH_SUCCESS:
      const { data: searchResult, splitResult } = action.payload;
      console.log(action.payload, "admin-user-success");
      const uuidArrSearch = searchResult.map((x) => ({
        [x.uuid]: false,
      }));
      // const uuidArrSearch = action.payload.data.reduce(
      //   (pre, cur) => pre.append(cur.uuid),
      //   []
      // );
      console.log(uuidArrSearch, " Arr");
      return {
        ...state,
        adminUser: splitResult === "1" ? searchResult : [],
        uuidArrSearch: splitResult === "1" ? uuidArrSearch : [],
        adminPost: splitResult === "2" ? searchResult : [],
        adminPostCount: splitResult === "2" ? searchResult.length : [],

        adminOrderList: splitResult === "3" ? searchResult : [],
        reviewList: splitResult === "4" ? searchResult : [],
        reviewCount: splitResult === "4" ? searchResult.length : [],
        loading: false,
      };

    default:
      return state;
  }
};

export default adminReducer;
