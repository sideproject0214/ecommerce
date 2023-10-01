// import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ redirectPath = "/login/error" }) => {
  const { profile } = useSelector((state) => state.auth);
  // console.log(profile, "protected route");
  if (profile.length === 0) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
