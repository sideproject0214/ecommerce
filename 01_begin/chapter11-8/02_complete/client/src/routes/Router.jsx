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
import CartScreen from "../screens/CartScreen/index.jsx"; // ch5
import PaymentScreen from "../screens/PaymentScreen/index.jsx"; // ch6
import PayRedirectSuccess from "../screens/PaymentScreen/PayRedirectSuccess.jsx"; // ch6
import PayRedirectFailure from "../screens/PaymentScreen/PayRedirectFailure.jsx"; // ch6
import PayRedirectCancel from "../screens/PaymentScreen/PayRedirectCancel.jsx"; // ch6
import PaymentSucessScreen from "../screens/PaymentScreen/PaymentSuccessScreen.jsx"; // ch6
import ShippingScreen from "../screens/ShippingScreen/index.jsx"; // ch7
import PostUploadScreen from "../screens/PostUploadScreen/index.jsx"; // ch8
import MyPageScreen from "../screens/MyPageScreen/index.jsx"; // ch9

import PostUploadModifyScreen from "../screens/AdminScreen/PostUploadModifyScreen/index"; // ch10
import AdminOutletScreen from "../screens/AdminScreen/AdminOutletContainer"; // ch10
import AdminHome from "../screens/AdminScreen/AdminHome"; // ch10
import AdminUser from "../screens/AdminScreen/AdminUserContainer"; // ch10
import AdminPost from "../screens/AdminScreen/AdminPostContainer"; // ch10
import AdminOrder from "../screens/AdminScreen/AdminOrderContainer"; // ch10
import AdminReview from "../screens/AdminScreen/AdminReviewContainer"; // ch10
import { AdminProtectedRoute, ProtectedRoute } from "./ProtectedRoute"; // ch10

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

        <Route path="/pay/redirect/success" element={<PayRedirectSuccess />} />
        <Route path="/pay/redirect/failure" element={<PayRedirectFailure />} />
        <Route path="/pay/redirect/cancel" element={<PayRedirectCancel />} />
        <Route path="/kakaopay/success" element={<PaymentSucessScreen />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/post/upload" element={<PostUploadScreen />} />
          <Route path="/mypage" element={<MyPageScreen />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/post/upload/:id" element={<PostUploadModifyScreen />} />
          <Route path="/admin" element={<AdminOutletScreen />}>
            <Route index element={<AdminHome />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="post" element={<AdminPost />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="review" element={<AdminReview />} />
          </Route>
        </Route>

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
