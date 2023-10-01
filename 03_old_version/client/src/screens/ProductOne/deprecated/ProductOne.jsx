import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// import { push } from "connected-react-router";
// import { push } from "redux-first-history";

import PlusMinusButton from "../../../components/PlusMinusButton";
import Rating from "../../../components/Rating";
import Select from "../../../components/Select";
import { CART_ADD_ITEM_REQUEST } from "../../../redux/constant/cartConstant";
import { PRODUCT_ONE_LOADING_REQUEST } from "../../../redux/constant/productConstant";
import { history } from "../../../store";

const ProductOne = () => {
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
    setCount(e.target.value);
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
    <>
      <section className="section product-detail ">
        <div className="details container-md">
          <div className="left">
            {thumbnails && (
              <>
                <div className="main">
                  <img src={thumbnails[thumnail]} alt="상품이미지" />
                </div>
                <div className="thumbnails">
                  {thumbnails.map((item, index) => {
                    console.log(item, index, "index");
                    return (
                      <div
                        className="thumbnail"
                        onClick={() => setThumnail(index)}
                        key={index}
                      >
                        <img src={item} alt="" />
                      </div>
                    );
                  })}
                </div>
                {/* <div className="thumbnails">
                <div className="thumbnail" onClick={() => setThumnail(0)}>
                  <img src={thumbnails[0]} alt="" />
                </div>
                <div className="thumbnail" onClick={() => setThumnail(1)}>
                  <img src={thumbnails[1]} alt="" />
                </div>
                <div className="thumbnail" onClick={() => setThumnail(2)}>
                  <img src={thumbnails[2]} alt="" />
                </div>
                <div className="thumbnail" onClick={() => setThumnail(3)}>
                  <img src={thumbnails[3]} alt="" />
                </div>
              </div> */}
              </>
            )}
          </div>
          <div className="right">
            <div className="productOne-category">{productOne.category}</div>
            <div className="productOne-name">{productOne.name}</div>
            <div className="price-div">
              {salePrice !== "" ? (
                <>
                  {productOne.sale !== 0 ? (
                    <span className="sale">{`${productOne.sale}%`}</span>
                  ) : (
                    ""
                  )}
                  &nbsp;&nbsp;
                  <span className="sale-price">{`${salePrice}원`}</span>
                  &nbsp;
                  {productOne.sale !== 0 ? (
                    <del className="original-price">{`${productPrice}원`}</del>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <span className="original-price">{`${productPrice}원`}</span>
              )}
            </div>
            <div className="diliveryFee">
              {productOne.deliveryFee
                ? `배송비 ${productOne.deliveryFee.toLocaleString()}원`
                : "무료배송"}
            </div>
            <Rating
              value={productOne.rating}
              text={`${productOne.numReviews} 리뷰`}
            />

            <form action="" className="productOneForm">
              <Select selected={selected} handleSelect={handleSelect} />

              {selected !== "default" && (
                <PlusMinusButton
                  count={count}
                  handleInput={handleInput}
                  plusButton={plusButton}
                  minusButton={minusButton}
                  alert={alert}
                />
              )}

              <div className={count === 0 ? "total-div" : "total-div show"}>
                {count !== 0 && (
                  <>
                    <div className="total-left">
                      <span className="total-amount">{`총 ${count}개`}</span>
                      &nbsp;&nbsp;
                      <span className="total-price">
                        {noSaleTotalPrice
                          ? `${saleTotalPrice.toLocaleString()} 원`
                          : `${noSaleTotalPrice} 원`}
                      </span>
                      &nbsp;&nbsp;
                    </div>

                    {alert ? (
                      <div
                        className="total-right"
                        to={`/cart/${profile.userUUID}`}
                      >
                        <span className="cart">장바구니에 담기</span>
                      </div>
                    ) : profile.userUUID ? (
                      <button
                        className="total-right"
                        onClick={addToCartHandler}
                      >
                        <span className="cart show">장바구니에 담기</span>
                      </button>
                    ) : (
                      <button
                        to="/login"
                        className="total-right"
                        onClick={addToCartHandler}
                      >
                        <span className="cart show">로그인하기</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </form>

            <div className="description">{productOne.description}</div>
          </div>
        </div>
      </section>
      <div className="table-container">
        <div className="order-table">
          <table className="container-md" style={{ width: "100%" }}>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "55%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <thead>
              <tr className="top-row">
                <th scope="col">번호</th>
                <th scope="col">리뷰</th>
                <th scope="col">점수</th>
                <th scope="col">이름</th>
                <th scope="col">작성일</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <section></section>
    </>
  );
};

export default ProductOne;
