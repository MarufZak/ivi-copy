import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading/Loading";
import useAuthContext from "../../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const {state} = useAuthContext();

  if (state.auth_loading) {
    return <Loading />;
  }

  if (state.user.name) {
    return <Navigate to="/notfound" />;
  }

  return children;
};

export default PrivateRoute;