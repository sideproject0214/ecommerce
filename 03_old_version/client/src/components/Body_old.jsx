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

  const [target, setTarget] = useState("");

  postCountRef.current = productCount - 6;
  let remainPostCount = 0;

  useEffect(() => {
    let observer;
    const Intersecting = async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
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
        // 데이터를 가지고 오면
        observer.observe(entry.target);
      }
    };

    if (target) {
      observer = new IntersectionObserver(Intersecting, {
        threshold: "0.5",
      });
    }

    observer.observe(target); // 타겟 엘리먼트 지정

    return () => observer && observer.disconnect();
  }, [target]);
  console.log(target, "target");

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

          <div ref={setTarget}></div>
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
