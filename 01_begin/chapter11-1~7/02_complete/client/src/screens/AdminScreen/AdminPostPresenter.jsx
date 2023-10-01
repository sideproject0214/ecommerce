import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import "./AdminPost.scss";

const AdminPostPresenter = (props) => {
  return (
    <div className="admin__body__user-context">
      <div className="admin__body__user-context__product">
        <div className="admin__body__user-context__product__header">
          <h2>상품 현황</h2>

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
            {props.adminPost?.length > 0 && (
              <div
                className="admin__body__user-context__product__delete"
                onClick={props.deleteAdmin}
              >
                <p>삭제하기</p>
              </div>
            )}
          </div>
        </div>
        <table>
          <colgroup>
            <col style={{ width: "2%" }} name="checkbox" />
            <col style={{ width: "13%" }} name="name" />
            <col style={{ width: "30%" }} name="description" />
            <col style={{ width: "8%" }} name="brand" />
            <col style={{ width: "8%" }} name="category" />
            <col style={{ width: "10%" }} name="size" />
            <col style={{ width: "8%" }} name="price" />
            <col style={{ width: "5%" }} name="sale" />
            <col style={{ width: "7%" }} name="freeshipping" />
            <col style={{ width: "9%" }} name="modify" />
          </colgroup>
          <thead>
            <tr>
              <td>
                <input
                  type="checkbox"
                  name=""
                  checked={
                    props.checkedInputs.length === props.adminPost?.length
                      ? true
                      : false
                  }
                  onChange={(e) => props.allCheckHandle(e.target.checked)}
                />
              </td>

              <td>상품명</td>
              <td>상품설명</td>
              <td>브랜드</td>
              <td>카테고리</td>
              <td>사이즈(재고)</td>
              <td>가격</td>

              <td>세일</td>
              <td>무료배송</td>
              <td>수정하기</td>
            </tr>
          </thead>
          <tbody>
            {props.adminPost?.map((post, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    id={post.uuid}
                    checked={
                      props.checkedInputs.includes(post.uuid) ? true : false
                    }
                    onChange={(e) =>
                      props.checkHandler(e.target.checked, e.target.id)
                    }
                  />
                </td>
                <td>{post.name}</td>
                <td>{post.description}</td>
                <td>{post.brand}</td>
                <td>{post.category}</td>
                <td>
                  {Object.entries(post.size).map((value, index) => {
                    return (
                      <div key={value}>{`${value[0]} : ${value[1]}개`}</div>
                    );
                  })}
                </td>
                <td>{post.price.toLocaleString()}</td>
                <td>{post.sale}</td>
                <td>{post.freeShipping ? "네" : "아니오"}</td>

                <td>
                  <Link
                    className="admin__body__user-context__product__btn"
                    id={`${post.uuid}_modify`}
                    to={`/post/upload/${post.uuid}`}
                  >
                    수정
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        value={
          props.adminPostSearchTotalCount !== undefined &&
          props.adminPostSearchTotalCount[0]?.id
        }
        divisor={props.paginationNum}
        page={props.adminPage}
        setPage={props.savePageFunc}
      />
    </div>
  );
};

export default AdminPostPresenter;
