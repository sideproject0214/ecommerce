import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { PRODUCT_LOADING_REQUEST } from "../redux/constant/productConstant";

import ProductCard from "./ProductCard";
import WhiteLoader from "./WhiteLoader";

const Body = (props) => {
  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);
  const dispatch = useDispatch();

  postCountRef.current = props.productCount - 6;
  let remainPostCount = 0;

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef();
    const [visible, setVisible] = useState(false);

    console.log(postCountRef.current, "last postCountRef.current");
    //https://goforit.tistory.com/213 무한 스크롤 개선
    const observingFunc = ([entry]) => {
      // entry를 배열로 하는 이유 : 콜솔찍어보면 값이 배열로 들어오기에 풀어주기 위해 배열로 넣은 것임
      console.log(entry, "proecess 0 entry if");

      setVisible(entry.isIntersecting);
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
    };

    useEffect(() => {
      const observer = new IntersectionObserver(observingFunc, options); // observer 인스턴스를 만든다.
      console.log("1 if");

      // if (!visible) {
      //   observer.observe(lastPostElementRef.current); // 관찰시작
      // } else {
      //   observer.unobserve(lastPostElementRef.current);
      // }

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
    }, [lastPostElementRef, options, visible]);

    return [lastPostElementRef, visible];
  };

  const [lastPostElementRef, visible] = useOnScreen({ threshold: "0.5" });
  console.log(visible);
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
            value={props.value}
            onChange={props.searchInput}
            onKeyDown={props.enterPress}
          />
        </div>

        <div className="product-center container">
          {props.searchResult ? (
            props.searchData.length === 0 ? (
              <h1>검색결과 없습니다</h1>
            ) : (
              <ProductCard products={props.searchData} />
            )
          ) : (
            <ProductCard products={props.products} />
          )}
        </div>
        <div ref={lastPostElementRef}></div>
        {props.loading ? (
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
