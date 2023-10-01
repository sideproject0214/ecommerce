import React from "react";
import Pagination from "../../components/Pagination";

import PlusMinusButton from "../../components/PlusMinusButton";
import Rating from "../../components/Rating";
import Select from "../../components/Select";
import { REVIEW_COUNT_VALUE } from "../../config/variables";

const ProductOnePresenter = (props) => {
  return (
    <>
      <section className="section product-detail ">
        <div className="details container-md">
          <div className="left">
            {props.thumbnails && (
              <>
                <div className="main">
                  <img
                    src={props.thumbnails[props.thumnail]}
                    alt="상품이미지"
                  />
                </div>
                <div className="thumbnails">
                  {props.thumbnails.map((item, index) => {
                    console.log(item, index, "index");
                    return (
                      <div
                        className="thumbnail"
                        onClick={() => props.setThumnail(index)}
                        key={Math.random()}
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
            <div className="productOne-category">
              {props.productOne.category}
            </div>
            <div className="productOne-name">{props.productOne.name}</div>
            <div className="price-div">
              {props.salePrice !== "" ? (
                <>
                  {props.productOne.sale !== 0 ? (
                    <span className="sale">{`${props.productOne.sale}%`}</span>
                  ) : (
                    ""
                  )}
                  &nbsp;&nbsp;
                  <span className="sale-price">{`${props.salePrice}원`}</span>
                  &nbsp;
                  {props.productOne.sale !== 0 ? (
                    <del className="original-price">{`${props.productPrice}원`}</del>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <span className="original-price">{`${props.productPrice}원`}</span>
              )}
            </div>
            <div className="diliveryFee">
              {props.productOne.deliveryFee
                ? `배송비 ${props.productOne.deliveryFee.toLocaleString()}원`
                : "무료배송"}
            </div>
            <Rating
              value={props.productOne.rating}
              text={`${props.productOne.numReviews} 리뷰`}
            />

            <form action="" className="productOneForm">
              <Select
                selected={props.selected}
                handleSelect={props.handleSelect}
              />

              {props.selected !== "default" && (
                <PlusMinusButton
                  count={props.count}
                  handleInput={props.handleInput}
                  plusButton={props.plusButton}
                  minusButton={props.minusButton}
                  alert={alert}
                />
              )}

              <div
                className={props.count === 0 ? "total-div" : "total-div show"}
              >
                {props.count !== 0 && (
                  <>
                    <div className="total-left">
                      <span className="total-amount">{`총 ${props.count}개`}</span>
                      &nbsp;&nbsp;
                      <span className="total-price">
                        {props.noSaleTotalPrice
                          ? `${props.saleTotalPrice.toLocaleString()} 원`
                          : `${props.noSaleTotalPrice} 원`}
                      </span>
                      &nbsp;&nbsp;
                    </div>

                    {props.alert ? (
                      <div
                        className="total-right"
                        to={`/cart/${props.profile.userUUID}`}
                      >
                        <span className="cart">장바구니에 담기</span>
                      </div>
                    ) : props.profile.userUUID ? (
                      <button
                        className="total-right"
                        onClick={props.addToCartHandler}
                      >
                        <span className="cart show">장바구니에 담기</span>
                      </button>
                    ) : (
                      <button
                        to="/login"
                        className="total-right"
                        onClick={props.addToCartHandler}
                      >
                        <span className="cart show">로그인하기</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </form>

            <div className="description">{props.productOne.description}</div>
          </div>
        </div>
      </section>
      <div className="review-table-container container-md">
        <div className="review-table">
          <table className="container-md" style={{ width: "100%" }}>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "54%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "20%" }} />
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

            {props.productOne.Reviews &&
              props.productOne.Reviews.slice(
                props.page * REVIEW_COUNT_VALUE,
                REVIEW_COUNT_VALUE * (props.page + 1)
              ).map((value, index) => {
                // console.log(value, "productOne Review");
                return (
                  <tbody key={Math.random()}>
                    <tr>
                      <td>
                        <div className="review-index text-center">
                          {props.page * REVIEW_COUNT_VALUE + index + 1}
                        </div>
                      </td>
                      <td>
                        <div className="review-comments">{value.comments}</div>
                      </td>
                      <td>
                        <div className="review-rating text-center">
                          {value.rating}
                        </div>
                      </td>
                      <td>
                        <div className="review-comments text-center">
                          {value.userName}
                        </div>
                      </td>
                      <td>
                        <div className="review-comments">
                          {`${value.createdAt.split("T")[0]} ${
                            value.createdAt.split("T")[1].split(".")[0]
                          }`}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
        <div className="review-arrow-container">
          {props.productOne.Reviews && (
            <Pagination
              value={props.productOne.Reviews.length}
              divisor={REVIEW_COUNT_VALUE}
              page={props.page}
              setPage={props.setPage}
            />
          )}
        </div>
      </div>
      <section></section>
    </>
  );
};

export default ProductOnePresenter;
