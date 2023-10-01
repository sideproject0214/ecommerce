import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PRODUCT_LOADING_REQUEST } from "../redux/constant/productConstant";

import ProductCard from "./ProductCard";
import WhiteLoader from "./WhiteLoader";

const Body = ({
  products,
  searchInput,
  value,
  enterPress,
  searchResult,
  searchData,
  productCount,
  loading,
}) => {
  const dispatch = useDispatch();

  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);

  postCountRef.current = productCount - 6;
  let remainPostCount = 0;

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef();

    console.log(postCountRef.current, "last postCountRef.current");

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        // entry를 배열로 하는 이유 : 콜솔찍어보면 값이 배열로 들어오기에 풀어주기 위해 배열로 넣은 것임

        if (entry.isIntersecting) {
          remainPostCount = postCountRef.current - skipNumberRef.current;

          if (remainPostCount >= 0) {
            dispatch({
              type: PRODUCT_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            });
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
          }
        }
      }, options);

      if (lastPostElementRef.current) {
        console.log("1 if");
        observer.observe(lastPostElementRef.current);
      }

      const LastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          console.log("2 if");
          observer.unobserve(lastPostElementRef.current);
        }
      };

      return LastElementReturnFunc;
    }, [lastPostElementRef, options]);

    return lastPostElementRef;
  };

  const lastPostElementRef = useOnScreen({
    threshold: "0.5",
  });

  return (
    <>
      <div className="section lastest">
        <div className="title">
          <h1>최신상품</h1>
        </div>
        <div className="search-box container">
          <input
            type="text"
            className="search-bar"
            placeholder="상품 검색"
            value={value}
            onChange={searchInput}
            onKeyDown={enterPress}
          />
        </div>

        <div className="product-center container">
          {searchResult ? (
            searchData.length === 0 ? (
              <h1>검색결과 없습니다</h1>
            ) : (
              <ProductCard products={searchData} />
            )
          ) : (
            <ProductCard products={products} />
          )}

          <div ref={lastPostElementRef}></div>
        </div>
        {loading ? (
          <div className="container red-loader">
            <WhiteLoader color={"red"} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Body;
