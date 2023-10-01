import Pagination from "../../components/Pagination";
import ToggleBtn from "../../components/ToggleBtn";
import "./AdminUser.scss";

const AdminUserPresenter = (props) => {
  return (
    <div className="admin__body__user-context">
      <div className="admin__body__user-context__admin-users">
        <div className="admin__body__user-context__admin-users__header">
          <h2>사용자 현황</h2>
          <div className="admin__body__user-context__header__box">
            <select
              className="admin__body__user-context__header__box__select"
              name="select"
              onChange={(e) => props.setPaginationNum(e.target.value)}
              value={props.paginationNum}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            {props.adminUser?.length > 0 && (
              <div
                className="admin__body__user-context__admin-users__delete"
                onClick={props.deleteAdmin}
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
                    props.checkedInputs.length === props.adminUser?.length
                      ? true
                      : false
                  }
                  onChange={(e) => props.allCheckHandle(e.target.checked)}
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
            {props.adminUser?.map((user, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    id={user?.uuid}
                    checked={
                      props.checkedInputs.includes(user?.uuid) ? true : false
                    }
                    onChange={(e) =>
                      props.checkHandler(e.target.checked, e.target.id)
                    }
                  />
                </td>
                <td>{user?.name}</td>
                <td>
                  <div>
                    <ToggleBtn
                      toggle={user?.isAdmin}
                      id={user?.isAdmin ? `${user?.uuid}_t` : `${user?.uuid}_f`}
                      makeAdmin={props.makeAdmin}
                    />
                  </div>
                </td>
                <td id={user?.uuid}>{user?.email}</td>
                <td>{user?.createdAt.split(" ")[0]}</td>
                <td>{user?.updatedAt.split(" ")[0]}</td>
                <td>
                  {user?.isVerified === true
                    ? "이메일"
                    : user?.kakaoID !== null
                    ? "카카오"
                    : user?.googleID !== null
                    ? "구글"
                    : user?.naverID !== null
                    ? "네이버"
                    : ""}
                </td>
                <td>
                  <div
                    className="admin__body__user-context__admin-users__btn"
                    id={`${user?.uuid}_initial`}
                    onClick={(e) => props.initialization(e)}
                  >
                    초기화
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {props.adminUser?.length === 0 ? (
        ""
      ) : (
        <Pagination
          value={
            props.adminUserSearchTotalCount !== undefined &&
            props.adminUserSearchTotalCount[0]?.id
          }
          divisor={props.paginationNum}
          page={props.page}
          setPage={props.setPage}
        />
      )}
    </div>
  );
};

export default AdminUserPresenter;
