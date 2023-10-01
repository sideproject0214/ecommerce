import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination";
import ToggleBtn from "../../../components/ToggleBtn";
import {
  ADMIN_USER_REQUEST,
  DELETE_ADMIN_USER_REQUEST,
  INITIALIZE_PASSWORD_REQUEST,
  MAKE_ADMIN_USER_REQUEST,
} from "../../../redux/constant/adminConstant";
import { ADD_ALERTSIDE } from "../../../redux/constant/alertConstant";

const AdminUser = () => {
  const dispatch = useDispatch();
  const { adminUser, adminSummary, deleteUser, initializeMsg } = useSelector(
    (state) => state.admin
  );
  const [page, setPage] = useState(0);

  const [checkedInputs, setCheckedInputs] = useState([]);
  const [paginationNum, setPaginationNum] = useState(5);

  const makeAdmin = (e) => {
    console.log(e.target.id, "id");
    const itemId = e.target.id;
    let changeAdminState = adminUser.find((x) => x.uuid === itemId).isAdmin;
    dispatch({
      type: MAKE_ADMIN_USER_REQUEST,
      payload: { uuid: itemId, isAdmin: changeAdminState },
    });
  };

  // console.log(userUUID, "userUUID");
  console.log(adminSummary, "adminUser");
  // console.log(uuidArr, "uuidArr");

  // console.log(emptyArr, "emptyArr");
  // console.log(emptyUUID, "emptyUUID1111");
  console.log(checkedInputs, "checkedInputs111");
  // 관리자 토글을 누르면 즉시 반응해서 데이터 값을 바꾼다.

  const deleteAdmin = () => {
    if (checkedInputs.length === 0) {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: "선택하지 않았습니다",
          type: "ERROR",
        },
      });
    } else {
      dispatch({ type: DELETE_ADMIN_USER_REQUEST, payload: checkedInputs });
    }
  };

  const allCheckHandle = (checked) => {
    if (checked) {
      const allUUID = adminUser.map((value, _) => {
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
    dispatch({
      type: INITIALIZE_PASSWORD_REQUEST,
      payload: { uuid: e.target.id.split("_")[0] },
    });
  };

  useEffect(() => {
    if (deleteUser.msg === "DELETE_USER_SUCCESS") {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: `${deleteUser.count}개 삭제했습니다`,
          type: "SUCCESS",
        },
      });
    } else if (initializeMsg.msg === "INITIALIZE SUCCESS") {
      dispatch({
        type: ADD_ALERTSIDE,
        payload: {
          id: Math.random(),
          message: `비밀번호 초기화 성공!`,
          type: "SUCCESS",
        },
      });
    }
  }, [dispatch, deleteUser.msg, initializeMsg.msg, deleteUser.count]);

  useEffect(() => {
    dispatch({
      type: ADMIN_USER_REQUEST,
      payload: { pagination: paginationNum, setPage: page * paginationNum },
    });
  }, [dispatch, page, paginationNum]);

  return (
    <div className="admin__body__user-context">
      <div className="admin__body__user-context__admin-users">
        <div className="admin__body__user-context__admin-users__header">
          <h2>사용자 현황</h2>
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
            {adminUser.length > 0 && (
              <div
                className="admin__body__user-context__admin-users__delete"
                onClick={deleteAdmin}
              >
                <p>삭제하기</p>
              </div>
            )}
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <td>
                <input
                  type="checkbox"
                  name=""
                  checked={
                    checkedInputs.length === adminSummary.userCount
                      ? true
                      : false
                  }
                  onChange={(e) => allCheckHandle(e.target.checked)}
                />
              </td>
              <td>이름</td>
              <td>관리자</td>
              <td>이메일</td>
              <td>가입일</td>
              <td>수정일</td>
              <td>가입방법</td>
              <td>패스워드 초기화</td>
            </tr>
          </thead>
          <tbody>
            {adminUser.map((value, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    id={value.uuid}
                    checked={checkedInputs.includes(value.uuid) ? true : false}
                    onChange={(e) =>
                      checkHandler(e.target.checked, e.target.id)
                    }
                    // onClick={(e) => {
                    //   if (e.target.checked) {
                    //     setEmptyUUID([...emptyUUID, e.target.id]);
                    //     console.log(emptyUUID, "emptyUUID");
                    //     // emptyArr.push(e.target.id);
                    //   } else {
                    //     const startNum = emptyUUID.findIndex(
                    //       (x) => x === value.uuid
                    //     );
                    //     // console.log(startNum, "startNum");
                    //     emptyUUID.splice(startNum, 1);
                    //     // emptyUUID.splice(startNum, 1);
                    //     console.log(emptyUUID, "emptyArr");
                    //     // console.log(startNum, "startNum");
                    //     // emptyArr.splice(startNum, 1);
                    //     // console.log(emptyArr, "emptyArr");
                    //   }
                    // }}
                  />
                </td>
                <td>{value.name}</td>
                <td>
                  <div>
                    <ToggleBtn
                      toggle={value.isAdmin}
                      id={value.uuid}
                      makeAdmin={makeAdmin}
                    />
                  </div>
                </td>
                <td
                  id={value.uuid}
                  onClick={(e) => {
                    console.log(e.target.id);
                  }}
                >
                  {value.email}
                </td>
                <td>{value.createdAt.split("T")[0]}</td>
                <td>{value.updatedAt.split("T")[0]}</td>
                <td>
                  {value.isVerified === true
                    ? "이메일"
                    : value.kakaoID !== null
                    ? "카카오"
                    : value.googleID !== null
                    ? "구글"
                    : value.naverID !== null
                    ? "네이버"
                    : ""}
                </td>
                <td>
                  <div
                    className="admin__body__user-context__admin-users__btn"
                    id={`${value.uuid}_initial`}
                    onClick={(e) => initialization(e)}
                  >
                    초기화
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        value={adminSummary.userCount}
        divisor={paginationNum}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AdminUser;
