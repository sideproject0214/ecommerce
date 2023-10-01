import React from "react";
import Modal from "../../components/Modal";
import { options } from "../../config/select";

const ReviewUpdateModal = (props) => {
  console.log(props, "updateReview Modal");

  return (
    <Modal>
      <div className="overview-area">
        <div className="overview-header">
          <div className="overview-header-close" onClick={props.modalClose}>
            <i className="fa-solid fa-times-circle"></i>
          </div>
        </div>
        <div className="overview">
          리뷰 <span className="overview-title">수정</span>
        </div>
        <form action="" className="review-input">
          <label>
            <div className="product-title">상품명 : {props.title}</div>
            <div className="product-review">
              <input
                type="textarea"
                name="review"
                value={props.form.review || props.updateReview.comments || ""}
                onChange={props.onChange}
              />

              <select
                name="select"
                id="star-select"
                onChange={props.onChange}
                value={props.form.select || props.updateReview.rating || 0}
                key={props?.updateReview.rating}
              >
                {options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                className="review-submit update"
                type="submit"
                onClick={props.updateSubmit}
              >
                수정하기
              </button>
            </div>
          </label>
        </form>
      </div>
      )
    </Modal>
  );
};

export default ReviewUpdateModal;
