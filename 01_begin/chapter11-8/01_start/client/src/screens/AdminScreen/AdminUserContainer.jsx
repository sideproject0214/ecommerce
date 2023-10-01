import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAdminSummaryQuery,
  useGetAdminUserQuery,
  usePutDeleteAdminUserMutation,
  usePutMakeAdminUserMutation,
  usePutUserInitializeMutation,
} from "../../redux/apiSlices/extendedAdmin";
import { addAlertSide } from "../../redux/slices/alertSlice";
import AdminUserPresenter from "./AdminUserPresenter";

const AdminUserContainer = () => {
  const dispatch = useDispatch();
  const { userSearch } = useSelector((state) => state.admin);
  const [page, setPage] = useState(0);

  const [checkedInputs, setCheckedInputs] = useState([]);
  const [paginationNum, setPaginationNum] = useState(5);

  const [putMakeAdminUser] = usePutMakeAdminUserMutation();

  const { data: beforeAdminUser } = useGetAdminUserQuery({
    pagination: paginationNum,
    setPage: page * paginationNum,
    search: userSearch,
  });

  let adminUser;
  let adminUserSearchTotalCount;

  if (beforeAdminUser !== undefined) {
    adminUser = beforeAdminUser?.filter((x) => x.uuid !== undefined);
    adminUserSearchTotalCount = beforeAdminUser?.filter(
      (x) => x.uuid === undefined
    );
  }

  const [putDeleteAdminUser, { data: deleteUser }] =
    usePutDeleteAdminUserMutation();

  const [putUserInitialize, { data: initializeMsg }] =
    usePutUserInitializeMutation();

  const makeAdmin = (e) => {
    const item = e.target.id.split("_");
    console.log(item, "changeAdminStateid");

    putMakeAdminUser({
      uuid: item[0],
      isAdmin: item[1] === "t" ? true : false,
    });
  };

  const deleteAdmin = () => {
    if (checkedInputs.length === 0) {
      addAlertSide({
        id: Math.random(),
        message: "선택하지 않았습니다",
        type: "ERROR",
      });
    } else {
      console.log(checkedInputs, "checkedInputs");
      putDeleteAdminUser(checkedInputs);
    }
  };

  const allCheckHandle = (checked) => {
    if (checked) {
      const allUUID = adminUser?.map((value, _) => {
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

  const initialization = (e) => {
    putUserInitialize({ uuid: e.target.id.split("_")[0] });
  };

  useEffect(() => {
    if (deleteUser?.msg === "DELETE_USER_SUCCESS") {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: `${deleteUser.count}개 삭제했습니다`,
          type: "SUCCESS",
        })
      );
    } else if (initializeMsg?.msg === "INITIALIZE SUCCESS") {
      dispatch(
        addAlertSide({
          id: Math.random(),
          message: `비밀번호 초기화 성공!`,
          type: "SUCCESS",
        })
      );
    }
  }, [dispatch, deleteUser, initializeMsg?.msg, deleteUser?.msg]);

  useEffect(() => {
    setCheckedInputs([]);
  }, [page]);

  return (
    <AdminUserPresenter
      paginationNum={paginationNum}
      adminUser={adminUser}
      deleteAdmin={deleteAdmin}
      checkedInputs={checkedInputs}
      allCheckHandle={allCheckHandle}
      checkHandler={checkHandler}
      makeAdmin={makeAdmin}
      initialization={initialization}
      page={page}
      setPage={setPage}
      setPaginationNum={setPaginationNum}
      adminUserSearchTotalCount={adminUserSearchTotalCount}
    />
  );
};

export default AdminUserContainer;
