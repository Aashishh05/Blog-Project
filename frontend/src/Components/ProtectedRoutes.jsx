import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn) {  
    return <Navigate to="/" />;
  }

  // ✅ check role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;