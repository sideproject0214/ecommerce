import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Pagination from "../../../components/Pagination";
import {
  ADMIN_DELETE_REVIEW_REQUEST,
  ADMIN_REVIEW_REQUEST,
} from "../../../redux/constant/adminConstant";
import { ADD_ALERTSIDE } from "../../../redux/constant/alertConstant";

const AdminReview = () => {
  const { reviewList, reviewCount, deleteReviewMsg } = useSelector(
    (state) => state.admin
  );
  const [page, setPage] = useState(0);
  const [paginationNum, setPaginationNum] = useState(5);
  const [checkedInputs, setCheckedInputs] = useState([]);
  const [deleteRatingNum, setDeleteRatingNum] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState([]);

  const dispatch = useDispatch();

  console.log(checkedInputs, "checked input");

  const allCheckHandle = (checked) => {
    if (checked) {
      const allID = reviewList.map((value, _) => {
        return `${value.id}`;
      });
      setCheckedInputs(allID);
    } else {
      setCheckedInputs([]);
    }
  };

  const checkHandler = (checked, id, e) => {
    console.log(e.target.name, "e.target");
    if (checked) {
      // console.log(typeof id);
      setCheckedInputs([...checkedInputs, id]);
      setDeleteRatingNum([
        ...deleteRatingNum,
        Number(e.target.name.split("_")[0]),
      ]);
      setDeleteProductId([...deleteProductId, e.target.name.split("_")[1]]);
      setDeleteProductId([...deleteProductId, e.target.name.split("_")[1]]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
      setDeleteRatingNum(
        deleteRatingNum.filter(
          (el) => el !== Number(e.target.name.split("_")[0])
        )
      );
      setDeleteProductId(
        deleteProductId.filter((el) => el !== e.target.name.split("_")[1])
      );
    }
  };
  console.log(deleteRatingNum, deleteProductId, "deleteRatingNum");

  const deleteReview = () => {
    if (checkedInputs.length === 0) {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: "삭제할 리뷰를 선택해주세요",
          type: "ERROR",
        },
      });
    } else {
      dispatch({
        type: ADMIN_DELETE_REVIEW_REQUEST,
        payload: {
          id: checkedInputs,
          pagination: paginationNum,
          setPage: page * paginationNum,
          deleteRatingNum: deleteRatingNum,
          productId: deleteProductId,
          // userId: userId
        },
      });
    }
  };

  // admin_summary 때문에 2번 리퀘스트 되고 있음.

  // useEffect(() => {
  //   dispatch({
  //     type: ADMIN_REVIEW_REQUEST,
  //     payload: {
  //       pagination: 5,
  //       setPage: 0,
  //     },
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   if (page === 0 && paginationNum === 5) {
  //     dispatch({
  //       type: ADMIN_REVIEW_REQUEST,
  //       payload: {
  //         pagination: 5,
  //         setPage: 0,
  //       },
  //     });
  //   } else {
  //     dispatch({
  //       type: ADMIN_REVIEW_REQUEST,
  //       payload: {
  //         pagination: paginationNum,
  //         setPage: page * paginationNum,
  //       },
  //     });
  //   }
  // }, [dispatch, paginationNum, page]);

  useEffect(() => {
    dispatch({
      type: ADMIN_REVIEW_REQUEST,
      payload: { pagination: paginationNum, setPage: page * paginationNum },
    });
  }, [dispatch, paginationNum, page]);

  console.log(reviewList, "reviewList");

  useEffect(() => {
    if (deleteReviewMsg.msg === "DELETE_REVIEW_SUCCESS") {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: `${deleteReviewMsg.count}개 삭제했습니다`,
          type: "SUCCESS",
        },
      });
      setCheckedInputs([]);
    }
  }, [dispatch, deleteReviewMsg.msg, deleteReviewMsg.count]);

  return (
    <div className="admin__body__user-context review">
      <div className="admin__body__user-context__product">
        <div className="admin__body__user-context__product__header">
          <h2>리뷰 현황</h2>

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
            {reviewList.length > 0 && (
              <div
                className="admin__body__user-context__product__delete"
                onClick={deleteReview}
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
                    checkedInputs.length === reviewList.length ? true : false
                  }
                  onChange={(e) => allCheckHandle(e.target.checked)}
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
            {reviewList.length > 0 &&
              reviewList.map((value, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      id={value.id}
                      name={`${value.rating}_${value.productId}/${value.orderId}`}
                      checked={
                        checkedInputs.includes(`${value.id}`) ? true : false
                      }
                      onChange={(e) =>
                        checkHandler(e.target.checked, e.target.id, e)
                      }
                    />
                  </td>
                  <td>
                    {value.Post && value.Post.name !== null
                      ? value.Post.name
                      : ""}
                  </td>
                  <td>{value.comments}</td>
                  <td>{value.rating}</td>
                  <td>{value.userName}</td>
                  <td>{value.createdAt.split("T")[0]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        value={reviewCount}
        divisor={paginationNum}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AdminReview;
