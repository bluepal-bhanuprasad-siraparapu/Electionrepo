// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Role not allowed
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;