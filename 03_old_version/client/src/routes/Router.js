import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Header from "../components/Header.jsx";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RedirectScreen from "../screens/RedirectScreen";
import LoginSuccess from "../screens/LoginSuccess";
import LogoutScreen from "../screens/LogoutScreen.jsx";

import ProductOne from "../screens/ProductOne";
import CartScreen from "../screens/CartScreen";

// import PaymentScreen from "../screens/old_PaymentScreen.jsx";
import PaymentScreen from "../screens/PaymentScreen";
import PayCancel from "../screens/PayRedirectScreen/PayCancel";
import PayFailure from "../screens/PayRedirectScreen/PayFailure";
import PaySuccess from "../screens/PayRedirectScreen/PaySuccess";
import PaymentSucess from "../screens/PayRedirectScreen/PaymentSucess.jsx";
import Shipping from "../screens/ShippingScreen";

import ShippingCancelRedirect from "../screens/ShippingScreen/ShippingCancelRedirect.jsx";
import AuthRedirect from "../screens/AuthRedirect.jsx";
import PostUpload from "../screens/PostUpload";
import PostModifyUpload from "../screens/PostModifyUpload";
import AdminScreen from "../screens/AdminScreen";
import { useSelector } from "react-redux";
import AlertSideProvider from "../components/alert/AlertSideProvider.jsx";
import Footer from "../components/Footer.jsx";
import AdminHome from "../screens/AdminScreen/component/AdminHome.jsx";
import AdminReview from "../screens/AdminScreen/component/AdminReview.jsx";
import AdminUser from "../screens/AdminScreen/component/AdminUser.jsx";
import AdminProduct from "../screens/AdminScreen/component/AdminProduct.jsx";
import AdminPayment from "../screens/AdminScreen/component/AdminPayment";

import LoginError from "../screens/LoginError.jsx";
import MyPage from "../screens/MyPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute.js";

const MyRouter = (e) => {
  const { pathname } = useLocation();
  // console.log(e, "Myrouter history");
  const { profile } = useSelector((state) => state.auth);
  console.log(profile, "MyRouter history");
  return (
    <>
      <AlertSideProvider />
      {pathname.includes("/login") ||
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
        <Route path="/login" element={<LoginScreen />} />;
        <Route path="/login/naver" element={<RedirectScreen />} />
        <Route path="/login/kakao" element={<RedirectScreen />} />
        <Route path="/login/google" element={<RedirectScreen />} />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/login/error" element={<LoginError />} />
        <Route path="/auth/verify/:token" element={<AuthRedirect />} />
        <Route path="/logout" element={<LogoutScreen />} />
        <Route path="/product/:uuid" element={<ProductOne />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route element={<ProtectedRoute profile={profile} />}>
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/post/upload" element={<PostUpload />} />
          <Route path="/post/upload/:id" element={<PostModifyUpload />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        {/* 모달을 사용하기 위해서는 를 빼는게 중요하다 */}
        {/* <Route path="/payment/" element={<PaymentScreen/>} /> */}
        {/* <OrderProtectedRoute path="/payment/" element={<PaymentScreen/>} /> */}
        <Route path="/pay/redirect/success" element={<PaySuccess />} />
        <Route path="/pay/redirect/failure" element={<PayFailure />} />
        <Route path="/pay/redirect/cancel" element={<PayCancel />} />
        <Route path="/kakaopay/success" element={<PaymentSucess />} />
        <Route path="/shipping/cancel" element={<ShippingCancelRedirect />} />
        {/* <Route path="/admin" element={<customRoutes />}></Route> */}
        <Route path="/admin" element={<AdminScreen />}>
          <Route index element={<AdminHome />} />
          <Route path="user" element={<AdminUser />} />
          <Route path="product" element={<AdminProduct />} />
          <Route path="payment" element={<AdminPayment />} />
          <Route path="review" element={<AdminReview />} />
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
