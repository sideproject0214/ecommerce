import Pagination from "../../components/Pagination";
import "./AdminReview.scss";

const AdminReviewPresenter = (props) => {
  console.log(
    props.adminReviewSearchTotalCount,
    "props.adminReviewSearchTotalCount"
  );
  return (
    <div className="admin__body__user-context review">
      <div className="admin__body__user-context__product">
        <div className="admin__body__user-context__product__header">
          <h2>리뷰 현황</h2>

          <div className="admin__body__user-context__product__header__box">
            <select
              className="admin__body__user-context__product__header__box__select"
              name="select"
              onChange={(e) => props.setPaginationNum(e.target.value)}
              value={props.paginationNum}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            {props.adminReview?.length > 0 && (
              <div
                className="admin__body__user-context__product__delete"
                onClick={props.deleteReview}
              >
                <p>삭제하기</p>
              </div>
            )}
          </div>
        </div>
        <table>
          <colgroup>
            <col style={{ width: "5%" }} name="checkbox" />
            <col style={{ width: "20%" }} name="product" />
            <col style={{ width: "43%" }} name="review" />
            <col style={{ width: "8%" }} name="reviewNum" />
            <col style={{ width: "10%" }} name="writer" />
            <col style={{ width: "14%" }} name="createdAt" />
          </colgroup>
          <thead>
            <tr>
              <td>
                <input
                  type="checkbox"
                  name=""
                  checked={
                    props.checkedInputs.length === props.adminReview?.length
                      ? true
                      : false
                  }
                  onChange={(e) => props.allCheckHandle(e.target.checked)}
                />
              </td>

              <td>상품명</td>
              <td>리뷰</td>
              <td>평정</td>
              <td>작성자</td>
              <td>작성일</td>
            </tr>
          </thead>
          <tbody>
            {props.adminReview?.length > 0 &&
              props.adminReview?.map((review, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      id={review?.id}
                      name={`${review?.rating}_${review?.productId}/${review?.orderId}`}
                      checked={
                        props.checkedInputs.includes(`${review?.id}`)
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        props.checkHandler(e.target.checked, e.target.id, e)
                      }
                    />
                  </td>
                  <td>
                    {review?.Post && review?.Post.name !== null
                      ? review?.Post.name
                      : ""}
                  </td>
                  <td>{review?.comments}</td>
                  <td>{review?.rating}</td>
                  <td>{review?.userName}</td>
                  <td>{review?.createdAt.split(" ")[0]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        value={
          props.adminReviewSearchTotalCount !== undefined &&
          props.adminReviewSearchTotalCount[0]?.uuid
        }
        divisor={props.paginationNum}
        page={props.page}
        setPage={props.setPage}
      />
    </div>
  );
};

export default AdminReviewPresenter;
