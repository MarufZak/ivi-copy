import { createContext, useEffect, useReducer, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import useGlobalContext from "../hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = {
  name: "",
  email: "",
  password: "",
  user: {},
  isLoading: false,
};

const reducer = (state, action) => {
  if (action.type === "EMAIL_CHANGE") {
    return {
      ...state,
      email: action.payload,
    };
  }
  if (action.type === "PASSWORD_CHANGE") {
    return {
      ...state,
      password: action.payload,
    };
  }
  if (action.type === "NAME_CHANGE") {
    return {
      ...state,
      name: action.payload,
    };
  }
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "LOADING_TRUE") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "LOADING_FALSE") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "EMAIL_VERIFIED") {
    console.log(state.user);
    return {
      ...state,
      user: {
        ...state.user,
        isEmailVerified: true,
      },
    };
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { handleError, showModal } = useGlobalContext();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigation = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if (user && isSigningUp) {
        const interval = setInterval(()=>{
          user.reload().then(()=>{
          if (user.emailVerified) {
            setIsSigningUp(false);
            dispatch({type:"EMAIL_VERIFIED"});
            navigation("/");
            clearInterval(interval)
          }
        });

        return ()=>clearInterval(interval)
        },[5000])
      }
    })

    return ()=>unsubscribe();
  },[isSigningUp])


  const reset = () => {
    changeEmail("");
    changeName("");
    changePassword("");
  };

  const changeEmail = (email) => {
    dispatch({ type: "EMAIL_CHANGE", payload: email });
  };

  const changePassword = (password) => {
    dispatch({ type: "PASSWORD_CHANGE", payload: password });
  };

  const changeName = (name) => {
    dispatch({ type: "NAME_CHANGE", payload: name });
  };

  const signup = async () => {
    setIsSigningUp(true);
    dispatch({ type: "LOADING_TRUE" });

    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: state.name });
      })
      .then(() => sendEmailVerification(auth.currentUser))
      .then(() => {
        showModal("Verify your email", "email link is sent to your email");
        dispatch({
          type: "SET_USER",
          payload: {
            email: auth.currentUser.email,
            name: auth.currentUser.displayName,
            isEmailVerified: auth.currentUser.emailVerified,
          },
        });
        navigation("/confirm");
      })
      .catch((error) => {
        showModal("Error", error);
        reset();
      });

    dispatch({ type: "LOADING_FALSE" });
  };

  const login = async () => {
    dispatch({ type: "LOADING_TRUE" });

    signInWithEmailAndPassword(auth, state.email, state.password)
      .then((user) => {
        dispatch({
          type: "SET_USER",
          payload: {
            email: user.user.email,
            name: user.user.displayName,
            isEmailVerified: user.user.emailVerified,
          },
        });
        showModal("My modal", "My text");
        navigation("/");
      })
      .catch((error) => {
        showModal("Not logged in", "error");
      })
      .finally(() => {
        reset();
        dispatch({ type: "LOADING_FALSE" });
      });
  };

  const loginWithGoogle = async () => {
    dispatch({ type: "LOADING_TRUE" });

    try {
      const user = await signInWithPopup(auth, provider);

      dispatch({
        type: "SET_USER",
        payload: { email: user.user.email, name: user.user.displayName },
      });

      reset();

      showModal("Signed up", "Success");

      navigation("/");
    } catch (error) {
      showModal("Not Signed up", "error");
    }

    dispatch({ type: "LOADING_FALSE" });
  };

  const signout = async () => {
    try {
      const response = await signOut(auth);

      dispatch({ type: "SET_USER", payload: {} });

      showModal("Sign out", "success");
    } catch (error) {
      showModal("Error", "not signed out");
    }
  };

  const value = {
    changeEmail,
    changePassword,
    signup,
    login,
    loginWithGoogle,
    changeName,
    signout,
    state,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
