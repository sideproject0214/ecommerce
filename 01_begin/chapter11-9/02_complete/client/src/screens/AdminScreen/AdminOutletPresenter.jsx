import { Link, Outlet } from "react-router-dom";
import { AdminNavbarData, AdminPanalData } from "../../config/navbarData.jsx";
import Modal from "../../components/Modal.jsx";
import WhiteLoader from "../../components/WhiteLoader.jsx";
import "./AdminOutlet.scss";
import { Helmet } from "react-helmet";

const AdminOutletPresenter = (props) => {
  return props.isLoading ? (
    <Modal>
      <WhiteLoader />
    </Modal>
  ) : (
    <>
      <Helmet>
        <meta name="사플쇼핑" content="남자 옷, 여자 옷" />
        <title>관리자 | Ecommerce</title>
      </Helmet>
      <div className="admin__container" style={{ height: "100rem" }}>
        <div
          className={
            props.toggle ? "admin__navigation active" : "admin__navigation"
          }
        >
          <ul>
            {AdminNavbarData.map((item, index) => (
              <li
                key={index}
                className={props.splitResult === index ? "hovered" : ""}
                onClick={() => props.multiFunc(index)}
              >
                <Link to={item.path} name={`admin-list-${index}`}>
                  <span className={item.cName}>{item.icon}</span>
                  {props.toggle ? (
                    ""
                  ) : (
                    <p className={item.cName}>{item.title}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={props.toggle ? "admin__main close" : "admin__main"}>
          <div className="admin__main__topbar">
            <div
              className="admin__main__topbar__toggle"
              onClick={props.toggleHandler}
            >
              <i className="fa-solid fa-bars"></i>
            </div>

            {props.splitResult === 0 ? (
              ""
            ) : (
              <div className="admin__main__search">
                <label htmlFor="">
                  <input
                    type="text"
                    placeholder={
                      props.splitResult === 1
                        ? "유저 검색(이름, 이메일)"
                        : props.splitResult === 2
                        ? "상품 검색(상품명, 상품설명, 브랜드, 카테고리) "
                        : props.splitResult === 3
                        ? "주문 검색(주문번호, 이름)"
                        : "리뷰 검색(상품명, 리뷰, 평점, 작성자)"
                    }
                    value={props.searchInput}
                    onChange={props.searchInputHandle}
                    onKeyDown={props.searchHandle}
                  />
                  <i className="fa-solid fa-search"></i>
                </label>
              </div>
            )}
          </div>
          <div className="admin__body">
            <div className="admin__body__cardbox">
              {AdminPanalData.map((value, index) => (
                <Link
                  to={value.path}
                  className={value.boxCName}
                  key={index}
                  onClick={() => props.setActiveIndex(index + 1)}
                >
                  <div className="">
                    <div className={value.numberCName}>
                      {props.adminNavData && props.adminNavData.length !== 0
                        ? index === 2
                          ? `${Number(
                              props.adminNavData[index]
                            ).toLocaleString()}원`
                          : props.adminNavData[index]
                        : ""}
                    </div>
                    <div className={value.titleCName}>{value.title}</div>
                  </div>
                  <div className={value.iconCName}>{value.icon}</div>
                </Link>
              ))}
            </div>

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOutletPresenter;
