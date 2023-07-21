// ProtectedRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, component: Component }) => {
  if (isLoggedIn) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
