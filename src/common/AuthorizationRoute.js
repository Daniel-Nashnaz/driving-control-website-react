import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import React from 'react';
const AuthorizationRoute = ({ children, accessBy }) => {
  const { user } = useContext(AuthContext);


  if (accessBy === "User") {
    if (user.roles.includes("ROLE_USER")) {
      return children;
    }
  } 
  else if (accessBy === "Admin") {
    if (user.roles.includes("ROLE_ADMIN")) {
      return children;
    }
  }
  return(<>
  <Navigate to="/notFound"></Navigate>
 </>);
};
export default AuthorizationRoute;
