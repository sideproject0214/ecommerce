import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "../../redux/apiSlices";
import { useLazyGetSearchPostsQuery } from "../../redux/apiSlices/extendedPost";
import { dataExtract } from "../../util/dataExtract";
import "./Body.scss";
import PostCard from "../../components/PostCard";

const Body = () => {
  const dispatch = useDispatch();
  const { beforePostCount, totalPost } = useSelector((state) => state.posts);
  const [value, setValue] = useState("");
  const [getSearchPosts, { data: search, isSuccess }] =
    useLazyGetSearchPostsQuery();

  const searchInput = (e) => {
    setValue(e.target.value);
  };

  const enterPress = (e) => {
    if (e.key === "Enter") {
      if (value === "") {
        getSearchPosts("undefined");
      } else {
        getSearchPosts(value);
      }
    }
  };

  const beforePostCountRef = useRef("");
  beforePostCountRef.current = beforePostCount;
  const postCountRef = useRef(0);

  const endMsg = useRef(false);

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef();
    const [visible, setVisible] = useState(false);

    const observingFunc = ([entry]) => {
      // entry를 배열로 하는 이유 : 콜솔찍어보면 값이 배열로 들어오기에 풀어주기 위해 배열로 넣은 것임

      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) {
        console.log(beforePostCountRef.current, "beforePostCountRef.current");

        if (beforePostCountRef.current !== 0) {
          dispatch(
            apiSlice.endpoints.getPostsPagination.initiate(
              postCountRef.current + 6
            )
          );
          postCountRef.current += 6;
        } else {
          endMsg.current = true;
        }
      }
    };

    useEffect(() => {
      const observer = new IntersectionObserver(observingFunc, options); // observer 인스턴스를 만든다.

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
          {isSuccess ? (
            dataExtract(search).length === 0 ? (
              <h1>검색결과 없습니다</h1>
            ) : (
              <PostCard posts={dataExtract(search)} />
            )
          ) : (
            <PostCard posts={totalPost} />
          )}
        </div>
        <div ref={lastPostElementRef}></div>
      </div>
    </>
  );
};

export default Body;
