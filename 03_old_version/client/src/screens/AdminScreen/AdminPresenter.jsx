import React from "react";
import { Link, Outlet } from "react-router-dom";
import Modal from "../../components/modal/modal.jsx";
import WhiteLoader from "../../components/WhiteLoader.jsx";
import { AdminNavbarData, AdminPanalData } from "../../database/navbarData.js";

const AdminPresenter = (props) => {
  // console.log(props.splitResult, "splitResult");
  console.log(props.adminNavData, "adminNavData");
  return props.loading || props.adminNavData.length === 0 ? (
    <Modal>
      <WhiteLoader />
    </Modal>
  ) : (
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
              onClick={() => props.setActiveIndex(index)}
            >
              <Link to={item.path} name={`admin-list-${index}`}>
                <span className={item.cName}>{item.icon}</span>
                {props.toggle ? "" : <p className={item.cName}>{item.title}</p>}
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
            <i className="fas fa-bars"></i>
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
                      ? "유저 검색"
                      : props.splitResult === 2
                      ? "상품 검색 "
                      : props.splitResult === 3
                      ? "주문 검색"
                      : "리뷰 검색"
                  }
                  value={props.value}
                  onChange={props.searchInput}
                  onKeyDown={props.searchHandle}
                />
                <i className="fas fa-search"></i>
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
                        ? `${props.adminNavData[index].toLocaleString()}원`
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
            <Outlet
              context={{
                sales: props.totalSales,
                reviews: props.reviewCount,
              }}
            />
          </div>
          {/* <Outlet
          context={{
            sales: props.totalSales,
            reviews: props.reviewCount,
          }}
        /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminPresenter;
