import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login/error" }) => {
  // console.log(profile, "protected route");
  const { profile } = useSelector((state) => state.auth);
  // console.log(profile, "ProtectedRoute");
  if (profile.length === 0) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export const AdminProtectedRoute = ({ redirectPath = "/login/error" }) => {
  const { profile } = useSelector((state) => state.auth);
  console.log(profile, "ProtectedRoute");
  if (!profile.isAdminResult) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
