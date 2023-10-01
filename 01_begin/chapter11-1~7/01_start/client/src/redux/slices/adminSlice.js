import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productOne: {},
  filteredValue: null,
  selectSet: null,
  loadedThumbnail: [],
  mainImageDelete: false,
  thumbnailImageDelete: false,
  adminPage: 0,
  adminShippingPage: 0,
  userSearch: "",
  postSearch: "",
  orderSearch: "",
  reviewSearch: "",
  searchCount: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    postModifySaveData(state, { payload }) {
      console.log(payload, "postModifySaveData Slice");
      let emptySelectArr = [];
      let newSizeEmpty = [];
      let newStockEmpty = [];

      const data = payload;
      console.log(data, "reducer");
      const sizeArr = Object.entries(data.size);

      for (let i = 1; i <= sizeArr.length; i++) {
        emptySelectArr.push(i);
      }

      const loadedThumbnail = data.thumbnail.filter(
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
        // console.log(current, key, current[key], prev[key]);
        // 위 콘솔창의 값 {size-1: '나비'}, size-1, "나비"

        prev[key] = current[key];
        // 이전 값에 키가 'size-1'이면 '나비'라는 값을 갖는다는 의미
        // prev[key] 배열에서 arr[0] 이런식으로 배열의 첫번째 값을 찾는 것과 같다고 보면 됨
        return prev;
      }, {});

      console.log(result3, "reducer");

      state.productOne = data;
      state.filteredValue = result3;
      state.selectSet = emptySelectArr;
      state.loadedThumbnail = loadedThumbnail;
    },
    deleteMainImage(state, { payload }) {
      const target = state.productOne;
      console.log(target, "target");
      const source = { image: undefined };
      const returnedTarget = Object.assign(target, source);
      console.log(returnedTarget, "returnedTarget");
      state.productOne = returnedTarget;
    },
    deleteThumbnailImage(state, { payload }) {
      const filteredTarget = state.loadedThumbnail.filter(
        (el) => el !== payload
      );

      state.loadedThumbnail = filteredTarget;
      state.thumbnailImageDelete = true;
    },
    clearModifySaveData(state, { payload }) {
      state.productOne = {};
      state.filteredValue = null;
      state.selectSet = null;
      state.loadedThumbnail = [];
    },
    saveAdminPostPage(state, { payload }) {
      state.adminPage = payload;
    },
    saveAdminShippingPage(state, { payload }) {
      state.adminShippingPage = payload;
    },
    saveAdminSearchValue(state, { payload }) {
      switch (payload.splitResult) {
        case 1:
          state.userSearch = payload.search;
          break;
        case 2:
          state.postSearch = payload.search;
          break;
        case 3:
          state.orderSearch = payload.search;
          break;
        case 4:
          state.reviewSearch = payload.search;
          break;
        default:
          state.userSearch = "";
          state.postSearch = "";
          state.orderSearch = "";
          state.reviewSearch = "";
          break;
      }
    },
    clearAdminSearchValue(state, { payload }) {
      state.userSearch = "";
      state.postSearch = "";
      state.orderSearch = "";
      state.reviewSearch = "";
      state.searchCount = 0;
    },
  },
});

export const {
  postModifySaveData,
  deleteMainImage,
  deleteThumbnailImage,
  clearModifySaveData,
  saveAdminPostPage,
  saveAdminShippingPage,
  saveAdminSearchValue,
  clearAdminSearchValue,
} = adminSlice.actions;

export default adminSlice.reducer;
