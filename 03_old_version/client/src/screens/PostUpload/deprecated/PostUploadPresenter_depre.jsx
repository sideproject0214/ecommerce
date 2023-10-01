import React from "react";

const PostUploadPresenter = (props) => {
  return (
    <>
      <form className="container board">
        <div className="post-container">
          <div className="post-col">
            <div className="payment-info">
              <div className="shipping">상품 올리기</div>

              <div className="shipping-address">
                <input
                  className="basic-input-2"
                  type="text"
                  placeholder="상품 제목"
                  name="title"
                  value={props.form.title}
                  onChange={props.onChange}
                />

                <input
                  className="basic-input-2"
                  type="text"
                  name="description"
                  placeholder="상품 설명"
                  value={props.form.description}
                  onChange={props.onChange}
                />
                <div className="brand-category">
                  <input
                    className="basic-input-2 brand"
                    type="text"
                    name="brand"
                    placeholder="브랜드"
                    value={props.form.brand}
                    onChange={props.onChange}
                  />
                  <input
                    className="basic-input-2"
                    type="text"
                    name="category"
                    placeholder="카테고리"
                    value={props.category}
                    onChange={props.onChange}
                  />
                </div>
                <div className="size-container">
                  <div className="exclamation">
                    <div className="toolTip">
                      <i className="fas fa-exclamation-circle"></i>
                      <span className="toolTipText">
                        사이즈 숫자 입력후 콤마(,)입력해주세요
                      </span>
                    </div>
                  </div>
                  <input
                    className="basic-input-3 size-input"
                    type="text"
                    name="size"
                    placeholder="사이즈"
                    value={props.form.size}
                    onChange={props.onChange}
                  />
                </div>
                <div className="price-container">
                  <input
                    className="basic-input-2"
                    type="text"
                    name="price"
                    placeholder="가격"
                    value={props.form.price}
                    onChange={props.onChange}
                  />
                  <input
                    className="basic-input-2"
                    type="text"
                    name="countInStock"
                    placeholder="재고"
                    value={props.form.countInStock}
                    onChange={props.onChange}
                  />
                  <input
                    className="basic-input-2"
                    type="text"
                    name="sale"
                    placeholder="세일"
                    value={props.form.sale}
                    onChange={props.onChange}
                  />
                  <input
                    className="basic-input-2"
                    type="text"
                    name="deliveryFee"
                    placeholder="배송료"
                    value={props.form.deliveryFee}
                    onChange={props.onChange}
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
                <i className="fas fa-upload"></i>&nbsp; 메인 사진
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
              {props.mainImage.number ? (
                props.mainImage.number > 1 ? (
                  <p className="alert">1개 이상 올릴 수 없습니다</p>
                ) : (
                  <p>{props.mainImage.number}개가 선택되었습니다</p>
                )
              ) : (
                <p>선택된 파일이 없습니다</p>
              )}

              <div className="main-image-preview-box">
                <img
                  src={props.mainImage.preview}
                  id="image__section"
                  alt="preview"
                />
              </div>
              {/* input file은 커스텀 마이징이 어렵기에 div를 쓴다. 그리고 label의 경우 for로 연결이 되지만 가운데가 클릭안되는 문제가 있기에 div를 쓴다 */}
            </div>

            <div className="image-box">
              <div
                onClick={props.onClickThumbnailImageInput}
                className="image-upload-button"
              >
                <i className="fas fa-upload"></i>&nbsp; 썸네일 사진
              </div>
              <input
                type="file"
                id="thumbnail__image__upload"
                name="post"
                multiple="multiple"
                ref={props.thumbnailImageRef}
                onChange={props.thumbnailSelect}
              />
              {props.thumbnailImage.number ? (
                props.thumbnailImage.number > 4 ? (
                  <p className="alert">4개 이상 올릴 수 없습니다</p>
                ) : (
                  <p>{props.thumbnailImage.number}개가 선택되었습니다</p>
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
              {/* <div className="thumbnail-image-box">
                {props.thumbnailImage.preview &&
                  props.thumbnailImage.preview.map((value, index) => {
                    return (
                      <div className="box" key={index}>
                        <img
                          src={value[0].url}
                          id="image__section"
                          alt="preview"
                        />
                        <p>{value[0].name}</p>
                      </div>
                    );
                  })}
              </div> */}
            </div>
          </div>
        </div>
        <div className="post-upload-button-box" type="submit">
          <button className="post-upload-button">
            <p>상품 올리기</p>
          </button>
        </div>
      </form>
    </>
  );
};

export default PostUploadPresenter;
