import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PRODUCT_LOADING_REQUEST,
  PRODUCT_SEARCH_REQUEST,
} from "../redux/constant/productConstant";
import { MainLoading } from "../components/Loading";

import Body from "../components/Body";
import Carousel from "../components/Carousel.jsx";

const HomeScreen = () => {
  const { productAll, loading, searchData, searchResult, productCount } =
    useSelector((state) => state.product);
  const [value, setValue] = useState("");
  // const { action } = useSelector((state) => state.router);
  // const [lastAction, setLastAction] = useState("");

  const dispatch = useDispatch();

  // const arrayProducts = Array.from(productAll);
  // console.log(productAll, "productAll");
  // console.log("lastAction", typeof lastAction);
  // console.log("lastAction", lastAction);
  // console.log("Action", action);

  useEffect(() => {
    dispatch({ type: PRODUCT_LOADING_REQUEST, payload: 0 });
  }, [dispatch]);
  // useEffect(() => {
  //   if (action === "POP" || action === "POP" || !lastAction) {
  //     // 세부페이지에서 리프레쉬하면 메모리에 담긴 상태가 모두 날라간다. 그걸 으용함
  //     let action = dispatch({ type: PRODUCT_LOADING_REQUEST });
  //     setLastAction(action.type);
  //     // console.log(action.type);
  //   }
  // }, [dispatch, lastAction, action]);

  const searchInput = (e) => {
    console.log(e.target.value, "searchInput");
    setValue(e.target.value);
  };

  // console.log(value, "searchInput");
  const enterPress = (e) => {
    if (e.key === "Enter") {
      if (value === "") {
        dispatch({ type: PRODUCT_SEARCH_REQUEST, payload: "undefined" });
      } else {
        dispatch({ type: PRODUCT_SEARCH_REQUEST, payload: value });
      }
    }
  };

  return (
    <>
      {loading ? (
        <MainLoading />
      ) : productAll && productAll.length === 0 ? (
        <MainLoading />
      ) : (
        <>
          <Carousel products={productAll} loading={loading} />
          <Body
            products={productAll}
            searchInput={searchInput}
            value={value}
            enterPress={enterPress}
            searchData={searchData}
            searchResult={searchResult}
            productCount={productCount}
            loading={loading}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
