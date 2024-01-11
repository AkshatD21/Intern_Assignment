import React from "react";
import { Navigate } from "react-router-dom";

// This is a Protected Route to ensure that if the user has logged in once, it's token get saved in the local storage.
// If the token is present in the local storage then the gets to the home page, other wise it's get redirected to the login page

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("authToken"); // Or your auth logic
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
