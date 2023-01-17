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
import { auth, db, provider } from "../firebase/firebase";
import { useGlobalContext } from "../hooks";
import { useNavigate } from "react-router-dom";
import { getDoc, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const AuthContext = createContext();

const initialState = {
  name: "",
  email: "",
  password: "",
  user: {
    name: '',
    email: '',
    isEmailVerified: false,
    likedMovies: []
  },
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
      user: {
        ...state.user,
        ...action.payload
      },
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
  if (action.type === "SET_LIKED_MOVIES") {
    return {
      ...state,
      user: {
        ...state.user,
        likedMovies: action.payload
      }
    }
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { handleError, showModal } = useGlobalContext();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isSigningUp) {
        const interval = setInterval(() => {
          console.log('interval');
          user.reload().then(() => {
            if (user.emailVerified) {
              setIsSigningUp(false);
              dispatch({ type: "EMAIL_VERIFIED" });
              navigation("/");
              clearInterval(interval);
              showModal("Success", "you have verified your email");
            }
          });

          return () => clearInterval(interval);
        }, [5000]);
      }
    });

    return () => unsubscribe();
  }, [isSigningUp]);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if (user) {
        dispatch({type: "SET_USER",payload: {
          name: user.displayName,
          email: user.email,
          isEmailVerified: user.emailVerified,
        }})
      }
    })

    return ()=>unsubscribe();
  },[])

  useEffect(()=>{
    const getLikedMovies = async()=>{
      try {
        const docRef = doc(db,"users",`${auth.currentUser?.displayName}`)
        let likedMovies = await getDoc(docRef);

        dispatch({type: "SET_LIKED_MOVIES",payload: likedMovies.data().likedMovies})
      } catch (error) {
        console.log(error);
      }
    }
    if (auth.currentUser) {
      getLikedMovies();
    }
  },[auth.currentUser])

  const handleLike = async(id,title,img)=>{
    if (!auth.currentUser) {
      return showModal("Register","Register first");
    }
    try {
      const docRef = doc(db,"users",`${auth.currentUser.displayName}`)
      const data = await getDoc(docRef);
      if (!data.data()) {
        await setDoc(docRef,{likedMovies: [id]})
        dispatch({type: "SET_LIKED_MOVIES",payload: [{id,title,img}]})
      } else {
        if (data.data().likedMovies.indexOf(id) !== -1) {
          await updateDoc(docRef,{likedMovies: arrayRemove({id,title,img})})
          dispatch({type: "SET_LIKED_MOVIES",payload: state.user.likedMovies.filter(movie=>movie.id!==id)})
        } else {
          await updateDoc(docRef,{likedMovies: arrayUnion({id,title,img})})
          dispatch({type: "SET_LIKED_MOVIES",payload: [...state.user.likedMovies,{id,title,img}]})
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  const signup = () => {
    setIsSigningUp(true);
    dispatch({ type: "LOADING_TRUE" });

    createUserWithEmailAndPassword(auth, state.email, state.password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: state.name });
      })
      .then(() => {
        sendEmailVerification(auth.currentUser);
      })
      .then(() => {
        dispatch({
          type: "SET_USER",
          payload: {
            email: auth.currentUser.email,
            name: auth.currentUser.displayName,
            isEmailVerified: auth.currentUser.emailVerified,
            likedMovies: []
          },
        });
      })
      .catch((error) => {
        showModal("Error", "error");
      })
      .finally(() => {
        dispatch({ type: "LOADING_FALSE" });
      });
  };

  const login = () => {
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
        dispatch({ type: "LOADING_FALSE" });
      });
  };

  const loginWithGoogle = () => {
    dispatch({ type: "LOADING_TRUE" });

    signInWithPopup(auth, provider)
      .then((user) => {
        dispatch({
          type: "SET_USER",
          payload: { email: user.user.email, name: user.user.displayName },
        });
        reset();
        showModal("Signed up", "Success");

        navigation("/");
      })
      .catch(() => {
        showModal("Not Signed up", "error");
      })
      .finally(() => {
        dispatch({ type: "LOADING_FALSE" });
      });
  };

  const signout = () => {
    dispatch({ type: "LOADING_TRUE" });

    signOut(auth)
      .then(() => {
        dispatch({ type: "SET_USER", payload: {
          name: '',
          email: '',
          isEmailVerified: false,
          likedMovies: []          
        }})
        showModal("Sign out", "success");
      })
      .catch(() => {
        showModal("Error", "not signed out");
      })
      .finally(() => {
        reset();
        dispatch({ type: "LOADING_FALSE" });
      });
  };
  
  const value = {
    changeEmail,
    changePassword,
    signup,
    login,
    loginWithGoogle,
    changeName,
    signout,
    handleLike,
    state,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
