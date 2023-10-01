import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

import LoginScreen from "../screens/LoginScreen/index.jsx";
import EmailLoginRedirect from "../screens/LoginScreen/EmailLoginRedirect";
import { useGetLoginCheckQuery } from "../redux/apiSlices/extendedAuth.js";
import ChangePassword from "../screens/LoginScreen/ChangePassword.jsx";
import PwChangeScreen from "../screens/LoginScreen/PwChangeScreen.jsx";

import SnsLoginRedirect from "../screens/LoginScreen/SnsLoginRedirect.jsx";

import LoginError from "../screens/LoginScreen/LoginError.jsx";
import LoginSuccess from "../screens/LoginScreen/LoginSuccess.jsx";

import HomeScreen from "../screens/HomeScreen/index";
import PostDetailScreen from "../screens/PostDetailScreen/index.jsx"; // ch4

import AlertGlobalProvider from "../components/AlertGlobalProvider/index.jsx"; // ch3

const MyRouter = () => {
  const { pathname } = useLocation();
  useGetLoginCheckQuery();
  return (
    <>
      <AlertGlobalProvider />
      {pathname.includes("/login") ||
      pathname.includes("/logout") ||
      pathname.includes("/pay/redirect") ||
      pathname.includes("/address/recent") ||
      pathname.includes("/admin") ? (
        ""
      ) : (
        <>
          <Header />
        </>
      )}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/login/naver" element={<SnsLoginRedirect />} />
        <Route path="/login/kakao" element={<SnsLoginRedirect />} />
        <Route path="/login/google" element={<SnsLoginRedirect />} />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/login/error" element={<LoginError />} />
        <Route path="/login/verify/:token" element={<EmailLoginRedirect />} />
        <Route path="/login/pwchange" element={<ChangePassword />} />
        <Route path="/login/pwchange/:pwaddress" element={<PwChangeScreen />} />

        <Route path="/post/:uuid" element={<PostDetailScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {pathname.includes("/login") ||
      pathname.includes("/pay/redirect") ||
      pathname.includes("/address/recent") ||
      pathname.includes("/admin") ? (
        ""
      ) : (
        <>
          <Footer />
        </>
      )}
    </>
  );
};
export default MyRouter;
