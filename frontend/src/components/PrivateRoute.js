// PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuthTokenFromCookie } from "../utils/utils";
import Dashboard from "./Dashboard";
import { Spinner } from "react-bootstrap";

const PrivateRoute = async() => {
  // In PrivateRoute.js
const [isAuthenticated, setIsAuthenticated] = useState(null);

useEffect(() => {
  const checkAuthentication = async () => {
    const token = await getAuthTokenFromCookie();
    console.log("Token:", token); // Log the token for verification
    setIsAuthenticated(Boolean(token));
  };

  checkAuthentication();
}, []);


  if (isAuthenticated === null) {
    // Loading state, show a spinner
    return <Spinner animation="border" variant="primary" />;
  }

  return isAuthenticated ? <Dashboard /> : <Navigate to="/login" />;
};

export default PrivateRoute;
