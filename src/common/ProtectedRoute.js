import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import React from 'react';
const ProtectedRoute = ({ children, accessBy }) => {
  const { user } = useContext(AuthContext);

  if (accessBy === "non-authenticated") {
    if (!user) {
      return children;
    }
  } else if (accessBy === "authenticated") {
    if (user) {
      return children;
    }
  }
  return(<>
  <Navigate to="/home"></Navigate>
 </>);
};
export default ProtectedRoute;
