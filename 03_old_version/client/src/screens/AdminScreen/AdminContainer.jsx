import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  ADMIN_SEARCH_REQUEST,
  ADMIN_SUMMARY_REQUEST,
} from "../../redux/constant/adminConstant";
import AdminPresenter from "./AdminPresenter";

const AdminContainer = () => {
  const [toggle, setToggle] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const location = useLocation();
  const { adminSummary, adminNavData, totalSales } = useSelector(
    (state) => state.admin
  );
  const router = useSelector((state) => state.router);

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleHandler = (e) => {
    setToggle(!toggle);
  };

  const [value, setValue] = useState("");

  // if(location)
  // const match = location.match(/type=(.*)/);
  // const type = match?.[1];
  // console.log(location, "location");
  const split = location.pathname.split("/");
  // console.log(split, "split");

  const splitNumber = () => {
    switch (split[2]) {
      case "user":
        return 1;
      case "product":
        return 2;
      case "payment":
        return 3;
      case "review":
        return 4;
      default:
        return 0;
    }
  };
  const splitResult = splitNumber();
  // console.log(splitResult, "splitResult");
  // const totalSales =
  //   adminSummary.allOrders && adminSummary.allOrders.length !== 0
  //     ? adminSummary.allOrders.filter((item) => item.isPaid === true)
  //     : [];

  // const totalSalesAmount =
  //   totalSales.length !== 0
  //     ? totalSales.reduce((prev, item) => prev + Number(item.totalPrice), 0)
  //     : 0;

  // console.log(adminSummary, "adminSummary");
  // console.log(totalSales, "totalSales");
  // console.log(totalSalesAmount, "totalSalesAmount");

  // const adminNavData =
  //   adminSummary && adminSummary.length !== 0
  //     ? [
  //         adminSummary.userCount,
  //         adminSummary.productCount,
  //         totalSalesAmount,
  //         adminSummary.reviewCount.length,
  //       ]

  //     : [];
  console.log(value, "value");
  const searchHandle = (e) => {
    if (e.key === "Enter") {
      // alert("Please enter");
      if (value === "") {
        dispatch({
          type: ADMIN_SEARCH_REQUEST,
          payload: { splitResult: splitResult, search: "undefined" },
        });
      } else {
        dispatch({
          type: ADMIN_SEARCH_REQUEST,
          payload: { splitResult: splitResult, search: value },
        });
      }
    }
  };

  const searchInput = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    dispatch({
      type: ADMIN_SUMMARY_REQUEST,
    });
    if (router.location.key && router.action === "PUSH") {
      setValue("");
    }
  }, [dispatch, router.location.key, router.action]);

  return (
    <AdminPresenter
      // mouseEnter={mouseEnter}
      // mouseOut={mouseOut}
      toggle={toggle}
      toggleHandler={toggleHandler}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      split={split}
      adminNavData={adminNavData}
      totalSales={totalSales}
      reviewCount={adminSummary.reviewCount}
      splitResult={splitResult}
      loading={loading}
      value={value}
      searchInput={searchInput}
      searchHandle={searchHandle}
    />
  );
};

export default AdminContainer;

// 이하 안쓰는 코드, 직접 관여하는 것은 성능에 안 좋다
// const list = window.document.querySelectorAll(".admin-navigation ul li");

// const activeLink = () => {
//   list.forEach((item) => {
//     item.classList.remove("hovered");
//     item.classList.add("hovered");
//   });
// };

// // list.forEach((item, key) => {
// //   // item.addEventListener("onMouseOver", activeLink);
// //   item.addEventListener("mouseover", console.log(item, key, "mouseOver"));
// //   // console.log(key, "active key");
// // });

// // console.log(list, "nodeList");

// const mouseEnter = (e) => {
//   // console.log(list);
//   list.forEach((item, key) => {
//     console.log(item.children[0].className, "mouseEnter");
//     if (item.children[0].className === "hovered") {
//       item.children[0].className = "";
//     }
//   });
//   e.target.classList.add("hovered");
// };

// const mouseOut = (e) => {
//   console.log(e);

//   e.target.classList.remove("hovered");
// };
