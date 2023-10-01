import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../../components/Pagination";
// import ToggleBtn from "../../../components/ToggleBtn";
import {
  ADMIN_POST_REQUEST,
  DELETE_ADMIN_POST_REQUEST,
} from "../../../redux/constant/adminConstant";
import { ADD_ALERTSIDE } from "../../../redux/constant/alertConstant";

const AdminProduct = () => {
  const { adminPost, adminPostCount, deletePostMsg } = useSelector(
    (state) => state.admin
  );
  const [checkedInputs, setCheckedInputs] = useState([]);

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [paginationNum, setPaginationNum] = useState(5);

  console.log(adminPost);
  console.log(checkedInputs);
  console.log(paginationNum);

  const allCheckHandle = (checked) => {
    if (checked) {
      const allUUID = adminPost.map((value, _) => {
        return value.uuid;
      });
      setCheckedInputs(allUUID);
    } else {
      setCheckedInputs([]);
    }
  };

  const checkHandler = (checked, uuid) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, uuid]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== uuid));
    }
  };

  const deleteAdmin = () => {
    if (checkedInputs.length === 0) {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: "삭제할 포스트를 선택해주세요",
          type: "ERROR",
        },
      });
    } else {
      dispatch({ type: DELETE_ADMIN_POST_REQUEST, payload: checkedInputs });
    }
  };

  useEffect(() => {
    dispatch({
      type: ADMIN_POST_REQUEST,
      payload: { pagination: paginationNum, setPage: page * paginationNum },
    });
  }, [dispatch, paginationNum, page]);

  useEffect(() => {
    if (deletePostMsg.msg === "DELETE_POST_SUCCESS") {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: `${deletePostMsg.count}개 삭제했습니다`,
          type: "SUCCESS",
        },
      });
    }
  }, [dispatch, deletePostMsg.msg, deletePostMsg.count]);

  return (
    <div className="admin__body__user-context">
      <div className="admin__body__user-context__product">
        <div className="admin__body__user-context__product__header">
          <h2>상품 현황</h2>

          <div className="admin__body__user-context__product__header__box">
            <select
              className="admin__body__user-context__product__header__box__select"
              name="select"
              onChange={(e) => setPaginationNum(e.target.value)}
              value={paginationNum}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            {adminPost.length > 0 && (
              <div
                className="admin__body__user-context__product__delete"
                onClick={deleteAdmin}
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
                    checkedInputs.length === adminPost.length ? true : false
                  }
                  onChange={(e) => allCheckHandle(e.target.checked)}
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
            {adminPost.map((value, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    id={value.uuid}
                    checked={checkedInputs.includes(value.uuid) ? true : false}
                    onChange={(e) =>
                      checkHandler(e.target.checked, e.target.id)
                    }
                  />
                </td>
                <td>{value.name}</td>
                <td>{value.description}</td>
                <td>{value.brand}</td>
                <td>{value.category}</td>
                <td>
                  {Object.entries(value.size).map((value, index) => {
                    return (
                      <div key={value}>{`${value[0]} : ${value[1]}개`}</div>
                    );
                  })}
                </td>
                <td>{value.price.toLocaleString()}</td>
                <td>{value.sale}</td>
                <td>{value.freeShipping ? "네" : "아니오"}</td>

                <td>
                  <Link
                    className="admin__body__user-context__product__btn"
                    id={`${value.uuid}_modify`}
                    to={`/post/upload/${value.uuid}`}
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
        value={adminPostCount}
        divisor={paginationNum}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AdminProduct;
