import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector((item) => item.auth.isLoggedIn);
  console.log("isLoggedIn:", isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
