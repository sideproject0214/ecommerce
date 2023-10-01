import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { push } from "connected-react-router";
// import { push } from "redux-first-history";

import { CART_ADD_ITEM_REQUEST } from "../../redux/constant/cartConstant";
import { PRODUCT_ONE_LOADING_REQUEST } from "../../redux/constant/productConstant";
import { history } from "../../store";
import ProductOnePresenter from "./ProductOnePresenter";

const ProductOneContainer = () => {
  const { pathname } = useLocation();
  const { productOne } = useSelector((state) => state.product);
  const { profile } = useSelector((state) => state.auth);
  console.log(profile, "productOne profile");

  // if (profile.NormalCookieToken) {
  //   profile = profile.NormalCookieToken;
  //   console.log(profile, "profile token");
  // }

  // let history = useHistory()
  const uuid = pathname.split("/product/")[1];
  const [count, setCount] = useState(0);
  const [thumnail, setThumnail] = useState(0);
  // console.log("count: " + count);
  const [selected, setSelected] = useState("default");
  const [alert, setAlert] = useState("");

  // review 페이지 자르기
  const [page, setPage] = useState(0);
  // const [pageReview, setPageReview] = useState([]);

  const dispatch = useDispatch();
  console.log(productOne, "productOne");
  // console.log(uuid);
  let thumbnails = "";
  let productPrice = "";
  let salePrice = "";

  thumbnails = productOne.thumbnail;
  productPrice = Number(productOne.price).toLocaleString();
  // const a = Object.values(productOne.size);
  // console.log(a);
  // selectedProductCount = Number(productOne.size[selected].split("&&")[1]);

  salePrice = (
    Number(productOne.price) *
    (1 - Number(productOne.sale) / 100)
  ).toLocaleString();

  // productPrice = productOne.price.toLocaleString();
  // console.log(productPrice);

  // console.log(thumbnails);
  console.log(productOne);
  // console.log("profile", profile);
  // const

  const plusButton = () => {
    if (
      productOne.size &&
      Number(count) < Number(Object.entries(productOne.size)[selected][1])
    ) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const minusButton = () => {
    if (productOne.size) {
      if (
        Number(count) > 0 &&
        Number(count) > Number(Object.entries(productOne.size)[selected][1])
      ) {
        console.log(count);
        setCount((prevCount) => prevCount - 1);
      } else if (
        Number(count) > 0 &&
        Number(count) <= Number(Object.entries(productOne.size)[selected][1])
      ) {
        console.log(count);
        setCount((prevCount) => prevCount - 1);
      }
    }
  };

  // Cal price
  let noSaleTotalPrice =
    Number(productOne.price) * (1 - Number(productOne.sale) / 100);

  let saleTotalPrice =
    Number(count) *
    Number(productOne.price) *
    (1 - Number(productOne.sale) / 100);

  // Handle
  const handleSelect = (e) => {
    console.log(e.target.label, "e.target.key");
    setSelected(e.target.value);
  };

  const handleInput = (e) => {
    e.preventDefault();
    setCount({ [e.target.id]: e.target.value });
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (profile.userUUID) {
      console.log(
        profile.userUUID,
        productOne.uuid,
        productOne.size[selected],
        count,
        "addToCartHandler"
      );

      // cartItems에 배열이 있으면 push 하고, 그렇지 않으면 setItem 하기
      console.log("deliveryFee", productOne.deliveryFee);
      dispatch({
        type: CART_ADD_ITEM_REQUEST,
        payload: {
          userUUID: profile.userUUID,
          uuid: productOne.uuid,
          size: Object.entries(productOne.size)[selected][0],
          total: count,
          maxTotal: Number(Object.entries(productOne.size)[selected][1]),
          price: noSaleTotalPrice ? noSaleTotalPrice : saleTotalPrice,
          name: productOne.name,
          deliveryFee: productOne.deliveryFee,
          image: productOne.image,
        },
      });
      // profileUUID로 이동하기
      // history.push(
      //   `/cart/${productOne.uuid}?size=${
      //     productOne.size[selected].split("&&")[0]
      //   }?total=${count}?price=${
      //     noSaleTotalPrice ? noSaleTotalPrice : saleTotalPrice
      //   }?name=${productOne.name}?image=${productOne.image}`
      // );
      history.push(`/cart`);
    } else {
      // dispatch({
      //   type: CART_ADD_ITEM_REQUEST,
      //   payload: {
      //     uuid: productOne.uuid,
      //     size: productOne.size[selected].split("&&")[0],
      //     total: count,
      //     maxTotal: Number(productOne.size[selected].split("&&")[1]),
      //     price: noSaleTotalPrice ? noSaleTotalPrice : saleTotalPrice,
      //     name: productOne.name,
      //     deliveryFee: productOne.deliveryFee ? productOne.deliveryFee : 0,
      //     image: productOne.image,
      //   },
      // });
      // localStorage.setItem(
      //   "prevLocation",
      //   `/cart/${productOne.uuid}?size=${
      //     productOne.size[selected].split("&&")[0]
      //   }?total=${count}?price=${
      //     noSaleTotalPrice ? noSaleTotalPrice : saleTotalPrice
      //   }?name=${productOne.name}?image=${productOne.image}`
      // );
      localStorage.setItem("prevLocation", `/product/${productOne.uuid}`);
      history.push("/login");
      // console.log("push fail");
    }
  };

  // Review Array Divide
  // let reviewArrayDivide = [];

  // const reviewArrResult = () => {
  //   if (productOne.Reviews) {
  //     setPageReview(productOne.Reviews.slice(page * 4, 4 * (page + 1)));
  //   }
  //   // slice로 0~4(4개) 보여주기로 해야됨.
  //   //  useState로 어디어디 자를 지 정하고, 이게 페이지 번호가 됨.
  //   // const arr = productOne.Reviews;
  //   // const add = (pre, con) => {
  //   //   if (pre) {
  //   //     return [...pre, con];
  //   //   } else {
  //   //     return [pre];
  //   //   }
  //   // };
  //   // if (productOne.Reviews && productOne.Reviews.length > 4) {
  //   //   for (let i = 0; i < parseInt(arr.length / 4) + 1; i++) {
  //   //     reviewArrayDivide[i] = [arr.slice(i * 4, 4 * (i + 1))];
  //   //     // const result = add(reviewArrayDivide[i], reviewArrayDivide[i + 1]);
  //   //     reviewArrayDivide.concat(reviewArrayDivide[i]);
  //   //     // console.log(result, "result");
  //   //   }
  //   // }
  //   // reviewArrayDivide = arr;
  // };

  // reviewArrResult();

  useEffect(() => {
    dispatch({ type: PRODUCT_ONE_LOADING_REQUEST, payload: uuid });
    console.log("dispatch Works!!!");
  }, [dispatch, uuid]);

  useEffect(() => {
    const checkCount = () => {
      if (selected !== "default") {
        console.log(count, productOne.size, "productOne.size");
        if (
          Number(count) <= Number(Object.entries(productOne.size)[selected][1])
        ) {
          setAlert("");
        } else if (
          Number(count) > Number(Object.entries(productOne.size)[selected][1])
        ) {
          setAlert("더 이상 구입할 수 없습니다");
        }
      }
    };
    checkCount();
  }, [count, productOne.size, selected]);

  return (
    <ProductOnePresenter
      thumbnails={thumbnails}
      thumnail={thumnail}
      setThumnail={setThumnail}
      productOne={productOne}
      salePrice={salePrice}
      productPrice={productPrice}
      handleSelect={handleSelect}
      selected={selected}
      count={count}
      handleInput={handleInput}
      plusButton={plusButton}
      minusButton={minusButton}
      noSaleTotalPrice={noSaleTotalPrice}
      saleTotalPrice={saleTotalPrice}
      profile={profile}
      addToCartHandler={addToCartHandler}
      alert={alert}
      page={page}
      setPage={setPage}
    />
  );
};

export default ProductOneContainer;
