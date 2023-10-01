import { Helmet } from "react-helmet";
import Pagination from "../../components/Pagination";
import Rating from "../../components/Rating";
import Select from "../../components/Select";
import { REVIEW_COUNT_VALUE } from "../../config/variables";

const PostDetailPresenter = (props) => {
  console.log(props, "PostDetailPresenter");
  return (
    <>
      {" "}
      <Helmet>
        <meta name="사플쇼핑" content="남자 옷, 여자 옷" />
        <title>{props.onePost.name} | Ecommerce</title>
      </Helmet>
      <section className="section product-detail ">
        <div className="details container-md">
          <div className="left">
            {props.thumbnails && (
              <>
                <div className="main">
                  <img
                    src={props.thumbnails[props.thumbnail]}
                    alt="상품이미지"
                  />
                </div>
                <div className="thumbnails">
                  {props.thumbnails.map((item, index) => {
                    console.log(item, index, "index");
                    return (
                      <div
                        className="thumbnail"
                        onClick={() => props.setThumbnail(index)}
                        key={Math.random()}
                      >
                        <img src={item} alt="" />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="right">
            <div className="productOne-category">{props.onePost.category}</div>
            <div className="productOne-name">{props.onePost.name}</div>
            <div className="price-div">
              {props.salePrice !== "" ? (
                <>
                  {props.onePost.sale !== 0 ? (
                    <span className="sale">{`${props.onePost.sale}%`}</span>
                  ) : (
                    ""
                  )}
                  &nbsp;&nbsp;
                  <span className="sale-price">{`${props.salePrice}원`}</span>
                  &nbsp;
                  {props.onePost.sale !== 0 ? (
                    <del className="original-price">{`${props.productPrice}원`}</del>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <span className="original-price">{`${props.productPrice}원`}</span>
              )}
            </div>
            <div className="deliveryFee">
              {props.onePost.deliveryFee
                ? `배송비 ${props.onePost.deliveryFee.toLocaleString()}원`
                : "무료배송"}
            </div>
            <Rating
              value={props.onePost.rating}
              text={`${props.onePost.numReviews} 리뷰`}
            />

            <form action="" className="productOneForm">
              <Select
                selected={props.selected}
                handleSelect={props.handleSelect}
                size={props.size}
              />

              {props.selected !== "default" && (
                <div className="input-group plus-minus-input">
                  <button
                    className="button plus-button"
                    onClick={props.plusButton}
                  >
                    <i className="fa fa-plus"></i>
                  </button>

                  <input
                    type="text"
                    value={props.count}
                    onChange={props.handleInput}
                  />
                  <button
                    className="button plus-button"
                    onClick={props.minusButton}
                  >
                    <i className="fa fa-minus"></i>
                  </button>
                  <span>{props.soldOutAlert && props.soldOutAlert}</span>
                </div>
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
                        {props.saleTotalPrice.toLocaleString()}
                      </span>
                      &nbsp;&nbsp;
                    </div>

                    {props.profile !== null ? (
                      <>
                        <button
                          className="total-right"
                          onClick={props.addToCartHandler}
                        >
                          <span className="cart show">장바구니에 담기</span>
                        </button>
                      </>
                    ) : (
                      <button
                        className="total-right"
                        onClick={props.saveLocation}
                      >
                        <span className="cart show">로그인하기</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </form>

            <div className="description">{props.onePost.description}</div>
          </div>
        </div>
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

              {props.onePost.Reviews &&
                props.onePost.Reviews.slice(
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
                          <div className="review-comments">
                            {value.comments}
                          </div>
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
                            {`${value.createdAt.split(" ")[0]} ${
                              value.createdAt.split(" ")[1].split(".")[0]
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
            {props.onePost.Reviews && (
              <Pagination
                value={props.onePost.Reviews.length}
                divisor={REVIEW_COUNT_VALUE}
                page={props.page}
                setPage={props.setPage}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PostDetailPresenter;
