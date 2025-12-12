import React, { Children } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";
import LoadingPage from "../pages/LoadingPage/LoadingPage";

const PrivateRoute = ({children}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  if (!user) {
    return <Navigate to={"/register"} />;
  }
  return children
};

export default PrivateRoute;
