import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavbarData, LoginNavbarData } from "../database/navbarData";

import { useSelector } from "react-redux";
import _ from "lodash";
import exportProfile from "../util/exportProfile";

const Header = () => {
  const [isNavFix, setNavFix] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const { profile } = useSelector((state) => state.auth);
  const { location } = useSelector((state) => state.router);

  console.log(profile, "profile");

  // /* SideBar */
  // let profileName = "";
  // let profileId = "";
  // let LoginNavbarDataConcat = "";

  // // console.log(profile);

  // if (profile && profile.NaverCookieToken) {
  //   const {
  //     NaverCookieToken: {
  //       response: { name, id },
  //     },
  //   } = profile;
  //   profileName = name;
  //   profileId = id; // 이걸 안해주면 리액트는 처음에 값 없이 렌더링 하려다보니 에러 발생

  //   // LoginNavbarDataConcat = profileData.concat(LoginNavbarData);
  // } else if (profile && profile.KakaoCookieToken) {
  //   const {
  //     KakaoCookieToken: { name, id },
  //   } = profile;
  //   profileName = name;
  //   profileId = id;
  // } else if (profile && profile.GoogleCookieToken) {
  //   const {
  //     GoogleCookieToken: { name, id },
  //   } = profile;
  //   profileName = name;
  //   profileId = id;
  // } else if (profile && profile.NormalCookieToken) {
  //   console.log(profile, "normal profile");
  //   const {
  //     NormalCookieToken: { name, userUUID: id },
  //   } = profile;
  //   profileName = name;
  //   profileId = id;
  // } else {
  //   LoginNavbarDataConcat = LoginNavbarData;
  // }

  let LoginNavbarDataConcat = "";
  LoginNavbarDataConcat = LoginNavbarData;
  const { profileName, profileId } = exportProfile(profile);

  const profileData = [
    {
      title: `${profileName} 님`,
      path: profileId,
      icon: "",
      cName: "nav-link",
    },
    {
      title: "로그아웃",
      path: "/logout",
      icon: "",
      cName: "nav-link",
    },
  ];

  const AdminData = [
    {
      title: "상품 올리기",
      path: "/post/upload",
      icon: <i className="fas fa-store"></i>,
      cName: "nav-link",
    },
    {
      title: "관리자",
      path: "/admin",
      icon: <i className="far fa-user-circle"></i>,
      cName: "nav-link",
    },
  ];

  LoginNavbarDataConcat = profile.isAdminResult
    ? profileData.concat(LoginNavbarData, AdminData)
    : profileData.concat(LoginNavbarData);

  // console.log(profile, profileId, profileName);

  const showSidebar = () => setSidebar(!sidebar);

  const onClickSidebar = () => {
    console.log(location.pathname);
    localStorage.setItem("prevLocation", `${location.pathname}`);
    setSidebar(false);
  };

  /* Fix Nav 1: Error */

  const handleScroll = () => {
    const scrollHeight = window.scrollY;
    // const navHeight = navRef.current.getBoundingClientRect().bottom;
    // console.log(scrollHeight);
    if (scrollHeight > 50) {
      setNavFix(true);
    } else {
      setNavFix(false);
    }
  };

  const { pathname } = useLocation();
  const product = pathname.split("/")[1];

  window.addEventListener("scroll", _.throttle(handleScroll, 200));
  // window.addEventListener("scroll", setTimeout(handleScroll(), 300));

  // console.log(LoginNavbarDataConcat);
  // console.log("proflie", profile);

  // useEffect(() => {
  //   loadUser();
  // }, []);
  return (
    <>
      <div className="header">
        <div
          className={
            isNavFix
              ? product === "product"
                ? "nav fix-nav white"
                : "nav fix-nav"
              : product === "product"
              ? "nav white"
              : "nav"
          }
        >
          <div className="navigation container">
            <Link to="/" className="logo">
              SSaple
            </Link>

            <div className={sidebar ? "menu show" : "menu"}>
              <div className="top-nav">
                {/* 사이브바 메뉴를 위한 로고 임 */}
                <Link to="/" onClick={onClickSidebar}>
                  <div className="logo">
                    <h1>SSaple</h1>
                  </div>
                </Link>
                <div className="close" onClick={showSidebar}>
                  <i className="fa fa-times"></i>
                </div>
              </div>

              <ul className="nav-list">
                {profile && profile.length !== 0
                  ? LoginNavbarDataConcat &&
                    LoginNavbarDataConcat.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path} onClick={onClickSidebar}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })
                  : NavbarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path} onClick={onClickSidebar}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      );
                    })}
              </ul>
            </div>

            <Link className="cart-icon" to="#cart">
              <i className="fas fa-shopping-bag"></i>
            </Link>

            <div className="hamburger" onClick={showSidebar}>
              <i className="fas fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
