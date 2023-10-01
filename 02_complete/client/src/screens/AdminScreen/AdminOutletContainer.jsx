import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAdminSummaryQuery } from "../../redux/apiSlices/extendedAdmin";
import { useLazyGetLogoutQuery } from "../../redux/apiSlices/extendedAuth";
import {
  clearAdminSearchValue,
  saveAdminSearchValue,
} from "../../redux/slices/adminSlice";
import AdminOutletPresenter from "./AdminOutletPresenter";

const AdminOutletContainer = () => {
  const [toggle, setToggle] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const [getLogout] = useLazyGetLogoutQuery();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { totalSales, adminNavData, reviewContents, isLoading } =
    useGetAdminSummaryQuery("getAdminSummary", {
      selectFromResult: ({ data, isLoading }) => ({
        totalSales: data?.entities[1].contents,
        adminNavData: [
          data?.entities[2].contents,
          data?.entities[3].contents,
          data?.entities[4].contents,
          data?.entities[5].contents,
        ],
        reviewContents: data?.entities[6].contents,
        isLoading,
      }),
    });

  const toggleHandler = (e) => {
    setToggle(!toggle);
  };

  const split = location.pathname.split("/");
  console.log(split, "split");

  const splitNumber = () => {
    switch (split[2]) {
      case "user":
        return 1;
      case "post":
        return 2;
      case "order":
        return 3;
      case "review":
        return 4;
      default:
        return 0;
    }
  };
  const splitResult = splitNumber();

  const searchHandle = (e) => {
    if (e.key === "Enter") {
      // alert("Please enter");
      console.log(splitResult, searchInput);
      dispatch(
        saveAdminSearchValue({
          splitResult: splitResult,
          search: searchInput,
        })
      );
    }
  };

  const multiFunc = (index) => {
    if (index === 6) {
      getLogout();
      setActiveIndex(index);
      navigate("/");
    } else {
      setActiveIndex(index);
    }
  };

  const searchInputHandle = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    dispatch(clearAdminSearchValue());
    setSearchInput("");
  }, [splitResult]);

  return (
    <AdminOutletPresenter
      toggle={toggle}
      toggleHandler={toggleHandler}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      multiFunc={multiFunc}
      split={split}
      adminNavData={adminNavData}
      totalSales={totalSales}
      reviewContents={reviewContents}
      splitResult={splitResult}
      isLoading={isLoading}
      getLogout={getLogout}
      searchInput={searchInput}
      searchInputHandle={searchInputHandle}
      searchHandle={searchHandle}
    />
  );
};

export default AdminOutletContainer;
