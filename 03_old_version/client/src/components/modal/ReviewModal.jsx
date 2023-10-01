import React from "react";
import Modal from "./modal";
import { options } from "../../config/select";

const ReviewModal = (props) => {
  return (
    <Modal>
      <div className="overview-area">
        <div className="overview-header">
          <div
            className="overview-header-close"
            onClick={() => props.setReviewOpen(false)}
          >
            <i className="fas fa-times-circle"></i>
          </div>
        </div>
        <div className="overview">
          리뷰 <span className="overview-title">작성</span>
        </div>
        <form action="" className="review-input">
          <label>
            <div className="product-title">상품명 : {props.title}</div>
            <div className="product-review">
              <input
                type="text"
                name="review"
                // id="review-input"
                value={props.form.review || ""} // 초기값이 없어 uncontrolled 에러가 난다. 이를 잡기위해 초기값을 넣는다.
                onChange={props.onChange}
              />
              <select
                name="select"
                id="star-select"
                onChange={props.onChange}
                value={props.form.select}
              >
                {options.map((option, i) => {
                  return (
                    <option value={option.value} key={i}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
              <button
                className="review-submit"
                type="submit"
                onClick={props.handleSubmit}
              >
                제출하기
              </button>
            </div>
          </label>
        </form>
      </div>
    </Modal>
  );
};

export default ReviewModal;
