import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import exportProfile from "../util/exportProfile";
import _ from "lodash";
import "./Header.scss";
import { useLazyGetLogoutQuery } from "../redux/apiSlices/extendedAuth";

const Header = () => {
  const { profile } = useSelector((state) => state.auth);
  const { location } = useSelector((state) => state.router);
  const { cartItems } = useSelector((state) => state.posts);
  const { profileName, profileId } = exportProfile(profile);

  const [isNavFix, setNavFix] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [getLogout] = useLazyGetLogoutQuery();

  const NavbarData = [
    {
      title: "로그인 / 회원가입",
      path: "/login",
      icon: <i className="fa-solid fa-right-to-bracket"></i>,
      cName: "nav-link",
    },
  ];

  const profileData = [
    {
      title: `${profileName} 님`,
      path: profileId,
      icon: "",
      cName: "nav-link",
    },
    {
      title: "로그아웃",
      path: "#",
      icon: "",
      cName: "nav-link",
    },
  ];

  const LoginNavbarData = [
    {
      title: "장바구니",
      path: "/cart",
      icon: <i className="fa-solid fa-cart-arrow-down"></i>,
      cName: "nav-link",
      count: cartItems === undefined ? "" : `${cartItems.length}`,
    },
    {
      title: "주문배송",
      path: "/shipping",
      icon: <i className="fa-solid fa-truck"></i>,
      cName: "nav-link",
    },
    {
      title: "마이페이지",
      path: "/mypage",
      icon: <i className="fa-solid fa-circle-user"></i>,
      cName: "nav-link",
    },
  ];

  const AdminData = [
    {
      title: "상품 올리기",
      path: "/post/upload",
      icon: <i className="fa-solid fa-store"></i>,
      cName: "nav-link",
    },
    {
      title: "관리자",
      path: "/admin",
      icon: <i className="far fa-user-circle"></i>,
      cName: "nav-link",
    },
  ];

  let LoginNavbarDataConcat = "";
  LoginNavbarDataConcat = LoginNavbarData;

  LoginNavbarDataConcat = profile?.isAdminResult
    ? profileData.concat(LoginNavbarData, AdminData)
    : profileData.concat(LoginNavbarData);

  const showSidebar = () => setSidebar(!sidebar);

  const onClickSidebar = () => {
    console.log(location.pathname);
    if (location.pathname !== "/cart") {
      localStorage.setItem("prevLocation", `${location.pathname}`);
    }
    setSidebar(false);
  };

  const handleScroll = () => {
    const scrollHeight = window.scrollY;

    if (scrollHeight > 50) {
      setNavFix(true);
    } else {
      setNavFix(false);
    }
  };

  const { pathname } = useLocation();
  const product = pathname.split("/")[1];

  window.addEventListener("scroll", _.throttle(handleScroll, 200));

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
                  <i className="fa-regular fa-circle-xmark"></i>
                </div>
              </div>

              <ul className="nav-list">
                {profile.length !== 0
                  ? LoginNavbarDataConcat &&
                    LoginNavbarDataConcat.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link
                            to={item.path}
                            onClick={
                              item?.title === "로그아웃"
                                ? () => getLogout()
                                : onClickSidebar
                            }
                          >
                            {item.icon}
                            <span className="nav-list__title">
                              {item.title}
                            </span>
                            <span className={item?.count && "nav-list__count"}>
                              {item?.count}
                            </span>
                          </Link>
                        </li>
                      );
                    })
                  : NavbarData.map((item, index) => {
                      return (
                        <li key={index} className={item.cName}>
                          <Link to={item.path} onClick={onClickSidebar}>
                            {item.icon}
                            <span className="nav-list__title">
                              {item.title}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
              </ul>
            </div>

            <Link className="cart-icon" to="/cart">
              <i className="fa-solid fa-bag-shopping"></i>
            </Link>

            <div className="hamburger" onClick={showSidebar}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
