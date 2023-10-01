import React from "react";
import Modal from "./modal";
import { options } from "../../config/select";

const ReviewUpdateModal = (props) => {
  // console.log(props.updateReview, "ReviewUpdateModal");

  // const { updateReview } = useSelector((state) => state.cart);
  // console.log(updateReview, "updateReview Modal");

  return (
    <Modal>
      <div className="overview-area">
        <div className="overview-header">
          <div
            className="overview-header-close"
            onClick={(e) => props.setUpdateReviewOpen(false)}
          >
            <i className="fas fa-times-circle"></i>
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
                value={
                  // 초기 값이 있는 input일 경우 이렇게 해줘야 한다. 일반
                  props.updateReview.comments || "" // value로 하면 안된다.
                }
                // value={
                //   props.form.review !== ""
                //     ? props.form.review
                //     : updateReview.comments
                //     ? updateReview.comments
                //     : "12"
                // }
                // 이렇게 하는 이유 : 초기값으로 처음에는 props.updateReview.comments 이 없기에 이 처음값도 정해줘야 한다
                onChange={props.onChange}
              />
              {/* defaultValue 값이 작동하지 않을때 : https://jaketrent.com/post/rerender-defaultvalue-value-change  */}

              <select
                name="select"
                id="star-select"
                onChange={props.onChange}
                defaultValue={props.updateReview.rating}
                // value={
                //   props.form.select !== ""
                //     ? props.form.select
                //     : updateReview.rating
                //     ? updateReview.rating
                //     : 0
                // }
                key={props.updateReview.rating}
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
