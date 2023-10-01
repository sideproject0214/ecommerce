import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetPostByUuidQuery } from "../../redux/apiSlices/extendedPost";
import { addCartItem } from "../../redux/slices/postSlice";
import { dataExtract } from "../../util/dataExtract";

import PostDetailPresenter from "./PostDetailPresenter";
import PostDetailPresenterLoading from "./PostDetailScreenLoading";

const PostDetailContanier = () => {
  const { pathname } = useLocation();
  const { profile } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  console.log(profile, "profile?.userUUID");
  const uuid = pathname.split("/post/")[1];

  // console.log(post, "getPostsPagination");
  // console.log(uuid, "uuid");
  const { data, isSuccess } = useGetPostByUuidQuery(uuid);

  const [count, setCount] = useState(0);
  const [thumbnail, setThumbnail] = useState(0);
  // console.log("count: " + count);
  const [selected, setSelected] = useState("default");
  const [soldOutAlert, setSoldOutAlert] = useState("");
  console.log(soldOutAlert, "soldOutAlert");
  const [needLoginAlert, setNeedLoginAlert] = useState(false);

  // console.log(profile, "onePost profile");
  const [page, setPage] = useState(0);
  // const [pageReview, setPageReview] = useState([]);

  const dispatch = useDispatch();

  const onePost = dataExtract(data)?.[0];
  console.log(onePost);
  let thumbnails = "";
  let productPrice = "";
  let salePrice = "";

  thumbnails = onePost?.thumbnail;
  productPrice = Number(onePost?.price).toLocaleString();
  // const a = Object.values(onePost?.size);
  // console.log(a);
  // selectedProductCount = Number(onePost?.size[selected].split("&&")[1]);

  salePrice = (
    Number(onePost?.price) *
    (1 - Number(onePost?.sale) / 100)
  ).toLocaleString();

  // productPrice = onePost?.price.toLocaleString();
  // console.log(productPrice);

  // console.log(thumbnails);

  // console.log("profile", profile);
  // const

  const plusButton = (e) => {
    console.log(onePost, "plus button");
    e.preventDefault();
    if (
      onePost.size &&
      Number(count) < Number(Object.entries(onePost.size)[selected][1])
    ) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const minusButton = (e) => {
    e.preventDefault();
    if (onePost.size) {
      if (
        Number(count) > 0 &&
        Number(count) > Number(Object.entries(onePost.size)[selected][1])
      ) {
        console.log(count);
        setCount((prevCount) => prevCount - 1);
      } else if (
        Number(count) > 0 &&
        Number(count) <= Number(Object.entries(onePost.size)[selected][1])
      ) {
        console.log(count);
        setCount((prevCount) => prevCount - 1);
      }
    }
  };

  // Cal price
  let saleTotalPrice =
    Number(count) * Number(onePost?.price) * (1 - Number(onePost?.sale) / 100);

  // Handle
  const handleSelect = (e) => {
    console.log(e.target.label, "e.target.key");
    setSelected(e.target.value);
  };

  const handleInput = (e) => {
    e.preventDefault();
    setCount({ [e.target.id]: e.target.value });
  };

  const saveLocation = () => {
    localStorage.setItem("prevLocation", `${pathname}`);
    navigate("/login");
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (profile.userUUID) {
      console.log(
        profile.userUUID,
        onePost?.uuid,
        onePost?.size[selected],
        count,
        "addToCartHandler"
      );

      // cartItems에 배열이 있으면 push 하고, 그렇지 않으면 setItem 하기
      console.log("deliveryFee", onePost?.deliveryFee);
      dispatch(
        addCartItem({
          uuid: onePost?.uuid,
          userUUID: profile?.userUUID,
          size: Object.entries(onePost?.size)[selected][0],
          total: count,
          maxTotal: Number(Object.entries(onePost?.size)[selected][1]),
          price: saleTotalPrice,
          name: onePost?.name,
          deliveryFee: onePost?.deliveryFee,
          image: onePost?.image,
        })
      );
      navigate("/cart");
    }
  };

  useEffect(() => {
    const checkCount = () => {
      if (selected !== "default") {
        // console.log(count, onePost.size, "onePost?.size");
        if (Number(count) < Number(Object.entries(onePost.size)[selected][1])) {
          setSoldOutAlert("");
        } else if (
          Number(count) === Number(Object.entries(onePost.size)[selected][1])
        ) {
          setSoldOutAlert("더 이상 구매 할 수 없습니다");
        }
      }
    };
    checkCount();
    console.log(count, "count");
  }, [count, onePost, selected]);

  // let content = <PostDetailPresenterLoading />;

  let content;

  if (isSuccess) {
    content = (
      <PostDetailPresenter
        thumbnails={thumbnails}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        onePost={onePost}
        salePrice={salePrice}
        productPrice={productPrice}
        handleSelect={handleSelect}
        selected={selected}
        count={count}
        handleInput={handleInput}
        plusButton={plusButton}
        minusButton={minusButton}
        saleTotalPrice={saleTotalPrice}
        profile={profile}
        addToCartHandler={addToCartHandler}
        soldOutAlert={soldOutAlert}
        needLoginAlert={needLoginAlert}
        setNeedLoginAlert={setNeedLoginAlert}
        page={page}
        setPage={setPage}
        size={onePost.size}
        saveLocation={saveLocation}
      />
    );
  } else {
    content = <PostDetailPresenterLoading />;
  }

  return content;
};

export default PostDetailContanier;
