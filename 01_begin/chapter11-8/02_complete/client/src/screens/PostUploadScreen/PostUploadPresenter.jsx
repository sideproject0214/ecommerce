import Modal from "../../components/Modal";
import WhiteLoader from "../../components/WhiteLoader";
import "./PostUploadScreen.scss";
import { Helmet } from "react-helmet";

const PostUploadPresenter = (props) => {
  return (
    <>
      <Helmet>
        <meta name="사플쇼핑" content="남자 옷, 여자 옷" />
        <title>상품 올리기 | Ecommerce</title>
      </Helmet>
      {props.isLoading ? (
        <Modal>
          <WhiteLoader />
        </Modal>
      ) : (
        ""
      )}
      <form className="container board">
        <div className="post-container">
          <div className="post-col">
            <div className="post-col__context">
              {Object.keys(props.productOne).length !== 0 ? (
                <div className="post-col__context__header">상품 수정하기</div>
              ) : (
                <div className="post-col__context__header">상품 올리기</div>
              )}

              <div className="post-col__context__body">
                <div className="post-col__context__body__contents">
                  <div className="post-col__context__body__contents__label">
                    <label>상품 이름</label>
                  </div>
                  <input
                    className={"post-col__context__body__contents__input"}
                    type="text"
                    name="name"
                    placeholder="상품 이름"
                    value={props.form.name}
                    onChange={props.onChange}
                  />
                </div>
                <div className="post-col__context__body__contents">
                  <div className="post-col__context__body__contents__label">
                    <label>상품 설명</label>
                  </div>
                  <textarea
                    className="post-col__context__body__contents__textarea"
                    type="textarea"
                    name="description"
                    placeholder="상품 설명"
                    value={props.form.description}
                    onChange={props.onChange}
                  />
                </div>
                <div className="post-col__context__body__contents">
                  <div className="post-col__context__body__contents__label">
                    <label>브랜드</label>
                  </div>
                  <input
                    className="post-col__context__body__contents__input"
                    type="text"
                    name="brand"
                    placeholder="브랜드"
                    value={props.form.brand}
                    onChange={props.onChange}
                  />
                </div>
                <div className="post-col__context__body__contents">
                  <div className="post-col__context__body__contents__label">
                    <label className="">카테고리</label>
                  </div>
                  <input
                    className="post-col__context__body__contents__input"
                    type="text"
                    name="category"
                    placeholder="카테고리"
                    value={props.form.category}
                    onChange={props.onChange}
                  />
                </div>
                <div
                  className={
                    props.select.length > 1
                      ? "post-col__context__body__contents plus-select"
                      : "post-col__context__body__contents"
                  }
                >
                  <div className="post-col__context__body__contents__bigbox">
                    {props.select.length === 1 ? (
                      <div>
                        <div
                          className={
                            "post-col__context__body__contents__bigbox__smallbox"
                          }
                        >
                          <div className="post-col__context__body__contents__bigbox__smallbox__box">
                            <div className="post-col__context__body__contents__bigbox__smallbox__box__label">
                              <label htmlFor="">{`선택사항`}</label>
                            </div>
                            <input
                              className="post-col__context__body__contents__bigbox__smallbox__box__input"
                              type="text"
                              name="size-1"
                              placeholder="사이즈 등"
                              value={props.form[`size-1`] || ""}
                              onChange={props.onChange}
                            />
                          </div>
                          <div className="post-col__context__body__contents__bigbox__smallbox__box">
                            <div className="post-col__context__body__contents__bigbox__smallbox__box__label">
                              <label htmlFor="">{`재고`}</label>
                            </div>
                            <input
                              className={
                                props.borderRed[`stock-1`]
                                  ? "post-col__context__body__contents__bigbox__smallbox__box__input border-red"
                                  : "post-col__context__body__contents__bigbox__smallbox__box__input"
                              }
                              type="text"
                              name="stock-1"
                              placeholder="갯수"
                              value={props.form[`stock-1`] || ""}
                              onChange={props.numberOnChange}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      props.select.map((value, index) => {
                        // console.log(value, "value");
                        // 아래에 key 값으로 최상위에 주었어야 하나, 이러면 css에서 last-of-type이 작동을 안하게 된다.
                        // last-of-type은 동일한 계층의 클래스 중 마지막을 선택하는 것으로 아래에 최상위 div를 선택하면 작동안해서
                        // 이렇게 각자 key값을 준 것임
                        return (
                          <div
                            className={
                              "post-col__context__body__contents__bigbox__smallbox plus"
                            }
                            key={value + 1}
                          >
                            <div className="post-col__context__body__contents__bigbox__smallbox__box">
                              <div className="post-col__context__body__contents__bigbox__smallbox__box__label">
                                <label htmlFor="">{`선택사항 ${value}`}</label>
                              </div>
                              <input
                                className="post-col__context__body__contents__bigbox__smallbox__box__input"
                                type="text"
                                name={`size-${value}`}
                                placeholder="사이즈 등"
                                value={props.form[`size-${value}`] || ""}
                                onChange={props.onChange}
                              />
                            </div>
                            <div
                              className="post-col__context__body__contents__bigbox__smallbox__box "
                              key={value + 2}
                            >
                              <div className="post-col__context__body__contents__bigbox__smallbox__box__label">
                                <label htmlFor="">{`재고 ${value}`}</label>
                              </div>
                              <input
                                className={
                                  props.borderRed[`stock-${value}`]
                                    ? "post-col__context__body__contents__bigbox__smallbox__box__input border-red"
                                    : "post-col__context__body__contents__bigbox__smallbox__box__input"
                                }
                                type="text"
                                name={`stock-${value}`}
                                placeholder="갯수"
                                value={props.form[`stock-${value}`] || ""}
                                onChange={props.numberOnChange}
                              />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="post-col__context__body__contents__bigbox__plusMinusBtn">
                    <div
                      className="post-col__context__body__contents__bigbox__plusMinusBtn__plus"
                      onClick={props.plusMinusBtn}
                    >
                      <i className="fa-solid fa-plus-circle" id="plus"></i>
                    </div>
                    <div
                      className="post-col__context__body__contents__bigbox__plusMinusBtn__minus"
                      onClick={props.plusMinusBtn}
                    >
                      <i className="fa-solid fa-minus-circle" id="minus"></i>
                    </div>
                  </div>
                </div>
                <div className="post-col__context__body__contents">
                  <div className="post-col__context__body__contents__label">
                    <label>가격</label>
                  </div>
                  <input
                    className={
                      props.borderRed.price
                        ? "post-col__context__body__contents__bigbox__smallbox__box__input border-red"
                        : "post-col__context__body__contents__bigbox__smallbox__box__input"
                    }
                    type="text"
                    name="price"
                    placeholder="가격"
                    value={props.form.price}
                    onChange={props.numberOnChange}
                  />
                </div>
                <div className="post-col__context__body__contents">
                  <div className="post-col__context__body__contents__label">
                    <label>세일(%)</label>
                  </div>
                  <input
                    className={
                      props.borderRed.sale
                        ? "post-col__context__body__contents__bigbox__smallbox__box__input border-red"
                        : "post-col__context__body__contents__bigbox__smallbox__box__input"
                    }
                    type="text"
                    name="sale"
                    placeholder="0 : 세일 없음, 10 등 숫자 : 퍼센티지 단위로 세일 "
                    value={props.form.sale}
                    onChange={props.saleOnChange}
                  />
                </div>
                <div className="post-col__context__body__contents">
                  <div className="post-col__context__body__contents__label">
                    <label>배송료</label>
                  </div>
                  <input
                    className={
                      props.borderRed.deliveryFee
                        ? "post-col__context__body__contents__bigbox__smallbox__box__input border-red"
                        : "post-col__context__body__contents__bigbox__smallbox__box__input"
                    }
                    type="text"
                    name="deliveryFee"
                    placeholder="배송료"
                    value={props.form.deliveryFee}
                    onChange={props.numberOnChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="image-container">
            <div className="image-box">
              <div
                onClick={props.onClickMainImageInput}
                className="image-upload-button"
              >
                <i className="fa-solid fa-upload"></i>&nbsp; 메인 사진
              </div>
              <input
                type="file"
                id="main__image__upload"
                name="post"
                multiple="multiple"
                onChange={props.mainImageSelect}
                accept="image/*"
                ref={props.mainImageRef}
              />
              {props.mainImageNum ? (
                props.mainImageNum > 1 ? (
                  <p className="alert">1개 이상 올릴 수 없습니다</p>
                ) : (
                  <p>{props.mainImageNum}개가 선택되었습니다</p>
                )
              ) : (
                <p>선택된 파일이 없습니다</p>
              )}

              <div className="main-image-preview-box">
                {props.mainPreview ? (
                  <div className="box">
                    <div className="box__image">
                      <img
                        src={props.mainPreview}
                        id="image__section"
                        alt="preview"
                      />
                      <div
                        className="box__icons"
                        onClick={props.mainImageLocalDelete}
                      >
                        <i className="far fa-times-circle"></i>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="box hover-none">
                    <div className="box__image">
                      <img
                        src={props.defaultImage}
                        id="image__section"
                        alt="preview"
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* input file은 커스텀 마이징이 어렵기에 div를 쓴다. 그리고 label의 경우 for로 연결이 되지만 가운데가 클릭안되는 문제가 있기에 div를 쓴다 */}
            </div>

            <div className="image-box">
              <div
                onClick={props.onClickThumbnailImageInput}
                className="image-upload-button"
              >
                <i className="fa-solid fa-upload"></i>&nbsp; 썸네일 사진
              </div>
              <input
                type="file"
                id="thumbnail__image__upload"
                name="post"
                multiple="multiple"
                ref={props.thumbnailImageRef}
                onChange={props.thumbnailSelect}
              />
              {props.thumbnailNum ? (
                props.thumbnailNum > 3 ? (
                  <p className="alert">3개 이상 올릴 수 없습니다</p>
                ) : (
                  <p>{props.thumbnailNum}개가 선택되었습니다</p>
                )
              ) : (
                <p>선택된 파일이 없습니다</p>
              )}
              {props.sameFileAlert ? (
                <p className="same-alert">
                  동일한 이름을 가진 파일이 존재합니다
                </p>
              ) : (
                ""
              )}
              <div className="thumbnail-image-box">
                {props.thumbnailPreview
                  ? props.thumbnailPreview.map((value, index) => {
                      return (
                        <div className="box" key={index}>
                          <div className="box__image">
                            <img
                              src={value[0].url}
                              id="image__section"
                              alt="preview"
                            />

                            <div
                              className="box__icons"
                              onClick={props.thumbnailLocalDelete}
                            >
                              <i
                                className="far fa-times-circle"
                                id={value[0].name}
                              ></i>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          <div className="post-upload-button-box" type="submit">
            <button className="post-upload-button" onClick={props.submit}>
              <p>상품 올리기</p>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PostUploadPresenter;
