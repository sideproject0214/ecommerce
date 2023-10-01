import {
  PRODUCT_LOADING_FAILURE,
  PRODUCT_LOADING_REQUEST,
  PRODUCT_LOADING_SUCCESS,
  PRODUCT_NOIMAGE_MODIFY_FAILURE,
  PRODUCT_NOIMAGE_MODIFY_REQUEST,
  PRODUCT_NOIMAGE_MODIFY_SUCCESS,
  PRODUCT_ONE_LOADING_FAILURE,
  PRODUCT_ONE_LOADING_REQUEST,
  PRODUCT_ONE_LOADING_SUCCESS,
  PRODUCT_SEARCH_FAILURE,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_UPLOAD_FAILURE,
  PRODUCT_UPLOAD_REQUEST,
  PRODUCT_UPLOAD_SUCCESS,
} from "../constant/productConstant";

const initialState = {
  loading: false,
  productAll: [],
  productOne: {},
  uploadData: {},
  error: "",
  selectSet: "",
  filteredValue: "",
  mainImageDelete: false,
  searchResult: false,
  searchData: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LOADING_REQUEST:
    case PRODUCT_NOIMAGE_MODIFY_REQUEST:
    case PRODUCT_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    // ALL PRODUCT
    case PRODUCT_LOADING_SUCCESS:
      return {
        ...state,
        // productAll: [...state.productAll, action.payload.result],
        productAll: [...state.productAll, ...action.payload.result],
        productCount: action.payload.count,
        loading: false,
      };
    case PRODUCT_LOADING_FAILURE:
    case PRODUCT_NOIMAGE_MODIFY_FAILURE:
    case PRODUCT_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // PRODUCT ONE
    case PRODUCT_ONE_LOADING_REQUEST:
      return {
        ...state,
        productOne: [],
        loading: true,
      };

    case PRODUCT_ONE_LOADING_SUCCESS:
      let emptySelectArr = [];
      let newSizeEmpty = [];
      let newStockEmpty = [];

      const data = action.payload;
      console.log(data, "reducer");
      const sizeArr = Object.entries(data.size);

      for (let i = 1; i <= sizeArr.length; i++) {
        emptySelectArr.push(i);
      }

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
        productOne: action.payload,
        filteredValue: result3,
        selectSet: emptySelectArr,
        loading: false,
        searchResult: false,
        searchData: [],
      };

    case PRODUCT_ONE_LOADING_FAILURE:
      return {
        loading: true,
        error: action.payload,
      };

    // PRODUCT UPLOAD
    case PRODUCT_UPLOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadData: action.payload,
        loading: false,
      };
    case PRODUCT_UPLOAD_FAILURE:
      return {
        loading: true,
        error: action.payload,
      };

    // case PRODUCT_IMAGE_DELETE_SUCCESS:
    //   console.log(action.payload, "product Image delete");
    //   const target = state.productOne;
    //   const source = { image: defaultImage };
    //   const returnedTarget = Object.assign(target, source);
    //   console.log(state.productOne, "")
    //   return {
    //     ...state,
    //     productOne: returnedTarget,
    //     mainImageDelete: true,
    //     loading: false,
    //   };

    // case PRODUCT_THUMBNAIL_DELETE_SUCCESS:
    //   console.log(action.payload, "product Image delete2");
    //   const target2 = state.productOne;
    //   const filteredTarget = state.productOne.thumbnail.filter(
    //     (el) => el !== action.payload
    //   );
    //   console.log(state.productOne, "Aftre filtered productOne");
    //   const source2 = { thumbnail: filteredTarget };
    //   // delete state.productOne.thumbnail;
    //   console.log(state.productOne, "first productOne");
    //   const returnedThumnailTarget = Object.assign(target2, source2);
    //   // console.log(returnedThumnailTarget, "returnedTarget");
    //   return {
    //     ...state,
    //     productOne: returnedThumnailTarget,
    //     thumbnailImageDelete: true,
    //     loading: false,
    //   };

    case PRODUCT_NOIMAGE_MODIFY_SUCCESS:
      return {
        ...state,
        uploadData: action.payload,
        loading: false,
      };

    // ALL PRODUCT
    case PRODUCT_SEARCH_SUCCESS:
      return {
        ...state,
        searchData: action.payload.data,
        searchResult: action.payload.search,
        loading: false,
      };

    default:
      return state;
  }
};

export default productReducer;
