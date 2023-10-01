import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAdminPostQuery,
  useGetAdminSummaryQuery,
  usePutDeleteAdminPostMutation,
} from "../../redux/apiSlices/extendedAdmin";
import {
  clearModifySaveData,
  saveAdminPostPage,
} from "../../redux/slices/adminSlice";
import { addAlertSide } from "../../redux/slices/alertSlice";
import AdminPostPresenter from "./AdminPostPresenter";

const AdminPostContainer = () => {
  const { adminPage, postSearch } = useSelector((state) => state.admin);
  const [checkedInputs, setCheckedInputs] = useState([]);

  const dispatch = useDispatch();
  // const [page, setPage] = useState(0);
  const [paginationNum, setPaginationNum] = useState(5);

  const savePageFunc = (value) => {
    dispatch(saveAdminPostPage(value));
  };

  // console.log(page, "Setpage");

  const { data: beforeAdminPost, isLoading } = useGetAdminPostQuery({
    pagination: paginationNum,
    setPage: adminPage * paginationNum,
    search: postSearch,
  });

  const adminPost = beforeAdminPost?.filter((x) => x.uuid !== undefined);
  const adminPostSearchTotalCount = beforeAdminPost?.filter(
    (x) => x.uuid === undefined
  );

  console.log(adminPost, adminPostSearchTotalCount, "useGetAdminPost");

  const [putDeleteAdminPost, { data: deletePostMsg }] =
    usePutDeleteAdminPostMutation();

  console.log(adminPost, "adminPost");
  console.log(checkedInputs);
  console.log(paginationNum);

  const allCheckHandle = (checked) => {
    if (checked) {
      const allUUID = adminPost?.map((value, _) => {
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
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: "삭제할 포스트를 선택해주세요",
          type: "ERROR",
        })
      );
    } else {
      putDeleteAdminPost(checkedInputs);
    }
  };

  useEffect(() => {
    if (deletePostMsg?.msg === "DELETE_POST_SUCCESS") {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: `${deletePostMsg.count}개 삭제했습니다`,
          type: "SUCCESS",
        })
      );
    }
  }, [dispatch, deletePostMsg?.msg, deletePostMsg?.count]);

  useEffect(() => {
    setCheckedInputs([]);
  }, [adminPage]);

  useEffect(() => {
    if (isLoading) {
      dispatch(clearModifySaveData);
    }
  }, [isLoading]);

  return (
    <AdminPostPresenter
      paginationNum={paginationNum}
      setPaginationNum={setPaginationNum}
      adminPost={adminPost}
      deleteAdmin={deleteAdmin}
      checkedInputs={checkedInputs}
      allCheckHandle={allCheckHandle}
      checkHandler={checkHandler}
      adminPage={adminPage}
      savePageFunc={savePageFunc}
      adminPostSearchTotalCount={adminPostSearchTotalCount}
    />
  );
};

export default AdminPostContainer;
