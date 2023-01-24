import { auth } from "../../firebase/firebase";
import Loading from "./Loading/Loading";
import { useEffect, useState } from "react";
import useAuthContext from '../../hooks/useAuthContext';

const AuthWrapper = ({ children }) => {
  const {state} = useAuthContext();

  if (state.auth_loading) {
    return <Loading/>
  }

  return children;
};

export default AuthWrapper;
