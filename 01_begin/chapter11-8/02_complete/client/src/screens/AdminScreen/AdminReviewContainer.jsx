import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAdminReviewQuery,
  usePutAdminDeleteReviewMutation,
} from "../../redux/apiSlices/extendedAdmin";
import { addAlertSide } from "../../redux/slices/alertSlice";
import AdminReviewPresenter from "./AdminReviewPresenter";

const AdminReviewContainer = () => {
  const [page, setPage] = useState(0);
  const [paginationNum, setPaginationNum] = useState(5);
  const { reviewSearch } = useSelector((state) => state.admin);

  const { data: beforeAdminReview } = useGetAdminReviewQuery({
    pagination: paginationNum,
    setPage: page * paginationNum,
    search: reviewSearch,
  });

  const adminReview = beforeAdminReview?.filter((x) => x.id !== undefined);
  const adminReviewSearchTotalCount = beforeAdminReview?.filter(
    (x) => x.id === undefined
  );

  console.log(
    beforeAdminReview,
    adminReview,
    adminReviewSearchTotalCount,
    "useGetAdminPost"
  );
  const [putAdminDeleteReview, { data: deleteReviewMsg }] =
    usePutAdminDeleteReviewMutation();

  const [checkedInputs, setCheckedInputs] = useState([]);
  const [deleteRatingNum, setDeleteRatingNum] = useState([]);
  const [deleteReviewProductId, setDeleteReviewProductId] = useState([]);

  const dispatch = useDispatch();

  console.log(checkedInputs, "checked input");

  const allCheckHandle = (checked) => {
    if (checked) {
      const allID = adminReview.map((value, _) => {
        return `${value.id}`;
      });
      const allDeleteRatingNum = adminReview.map((value, _) => {
        return { id: value.id, rating: value.rating };
      });
      const allReviewProductId = adminReview.map((value, _) => {
        return `${value.productId}`;
      });
      setCheckedInputs(allID);
      setDeleteRatingNum(allDeleteRatingNum);
      setDeleteReviewProductId(allReviewProductId);
    } else {
      setCheckedInputs([]);
      setDeleteRatingNum([]);
      setDeleteReviewProductId([]);
    }
  };

  const checkHandler = (checked, id, e) => {
    console.log(e.target.name, "e.target");
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
      setDeleteRatingNum([
        ...deleteRatingNum,
        { id: id, rating: Number(e.target.name.split("_")[0]) },
      ]);
      setDeleteReviewProductId([
        ...deleteReviewProductId,
        e.target.name.split("_")[1],
      ]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
      setDeleteRatingNum(deleteRatingNum.filter((el) => el.id !== id));
      setDeleteReviewProductId(
        deleteReviewProductId.filter((el) => el !== e.target.name.split("_")[1])
      );
    }
  };

  console.log(
    checkedInputs,
    deleteRatingNum,
    deleteReviewProductId,
    "deleteRatingNum"
  );

  const deleteReview = () => {
    if (checkedInputs.length === 0) {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "삭제할 리뷰를 선택해주세요",
          type: "ERROR",
        })
      );
    } else {
      putAdminDeleteReview({
        id: checkedInputs,
        pagination: paginationNum,
        setPage: page * paginationNum,
        deleteRatingNum: deleteRatingNum.map((arr, i) => arr.rating),
        productId: deleteReviewProductId,
      });
    }
  };

  // console.log(deleteReviewMsg, "deleteReviewMsg");
  useEffect(() => {
    if (deleteReviewMsg !== undefined) {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: `${deleteReviewMsg?.count}개 삭제했습니다`,
          type: "SUCCESS",
        })
      );

      setCheckedInputs([]);
      setDeleteRatingNum([]);
      setDeleteReviewProductId([]);
    }
  }, [dispatch, deleteReviewMsg]);

  return (
    <AdminReviewPresenter
      setPaginationNum={setPaginationNum}
      paginationNum={paginationNum}
      adminReview={adminReview}
      deleteReview={deleteReview}
      checkedInputs={checkedInputs}
      allCheckHandle={allCheckHandle}
      checkHandler={checkHandler}
      page={page}
      setPage={setPage}
      adminReviewSearchTotalCount={adminReviewSearchTotalCount}
    />
  );
};

export default AdminReviewContainer;
