import { useEffect,useReducer,createContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { setDoc, doc, arrayUnion, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useGlobalContext } from "../hooks";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const initialState = {
  liked_movies_loading: false,
  liked_movies_error: false,
  liked_movies: [],

  auth_loading: true,
  auth_error: false,

  user: {
    name: '',
    email: '',
    emailVerified: false
  }  
};

const reducer = (state, action) => {
  if (action.type === "ADD_LIKED_MOVIE") {
    return {
      ...state,
      liked_movies: [...state.liked_movies, action.payload],
    };
  }
  if (action.type === "REMOVE_LIKED_MOVIE") {
    return {
      ...state,
      liked_movies: state.liked_movies.filter((movie) => movie.id !== action.payload),
    };
  }
  if (action.type === "FETCH_LIKED_MOVIES_BEGIN") {
    return {
      ...state,
      liked_movies_loading: true,
      liked_movies_error: false
    }
  }
  if (action.type === "FETCH_LIKED_MOVIES_SUCCESS") {
    return {
      ...state,
      liked_movies_loading: false,
      liked_movies: action.payload
    }
  }
  if (action.type === "FETCH_LIKED_MOVIES_ERROR") {
    return {
      ...state,
      liked_movies_loading: false,
      liked_movies_error: true
    }
  }
  if (action.type === "AUTH_BEGIN") {
    return {
      ...state,
      auth_loading: true,
      auth_error: false
    }
  }
  if (action.type === "AUTH_SUCCESS") {
    return {
      ...state,
      auth_loading: false,
      user: {
        name: action.payload.name,
        email: action.payload.email,
        emailVerified: action.payload.emailVerified
      }
    }
  }
  if (action.type === "AUTH_ERROR") {
    return {
      ...state,
      auth_loading: false,
      auth_error: true
    }
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showModal } = useGlobalContext();
  const navigation = useNavigate();

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if (user) {
        dispatch({type: "AUTH_SUCCESS",payload: {name: user.displayName,email: user.email, emailVerified: user.emailVerified}})
      } else {
        dispatch({type: "AUTH_SUCCESS",payload: {name: "",email:"",emailVerified: false}})
      }
    },()=>{
      dispatch({type: "AUTH_ERROR"})
      showModal("Error","Error in auth")
    })
    return ()=>unsubscribe();
  },[])
  
  useEffect(() => {
    const fetchLikedMovies = async()=>{
      dispatch({type: "FETCH_LIKED_MOVIES_BEGIN"})
  
      try {
        const myDoc = await getDoc(doc(db, "users", state.user.name));
        dispatch({ type: "FETCH_LIKED_MOVIES_SUCCESS", payload: myDoc.data().liked_movies });
      } catch (error) {
        dispatch({type: "FETCH_LIKED_MOVIES_ERROR"})
      }
    }
    if (auth.currentUser) {
      fetchLikedMovies();
    }
  }, [auth.currentUser]);


  const signup = (name, email, password) => {
    dispatch({type: "AUTH_BEGIN"})

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: name }).then(() => {
          dispatch({type: "AUTH_SUCCESS",payload: {name:auth.currentUser?.displayName,email: auth.currentUser?.email, emailVerified: auth.currentUser?.emailVerified}})
          setDoc(doc(db, "users", auth.currentUser.displayName), {
            liked_movies: [],
          });
        });
      })
      .then(() => {
        sendEmailVerification(auth.currentUser);
        showModal("Verification link is sent to your email","please verify it.");
        navigation("/");
      })
  };

  const login = (email, password) => {
    dispatch({type: "AUTH_BEGIN"})

    signInWithEmailAndPassword(auth, email, password).then(() => {
      showModal("Success", "Signed in");
      dispatch({type: "AUTH_SUCCESS",payload: {name: auth.currentUser.displayName,email: auth.currentUser.email, emailVerified: auth.currentUser.emailVerified}})
      navigation("/");
    })
  };

  const signout = () => {
    dispatch({type: "AUTH_BEGIN"})

    signOut(auth)
      .then(() => {
        showModal("Success", "signed out");
        dispatch({type: "AUTH_SUCCESS",payload: {name: "",email: "",emailVerified: false}})
      })
  };

  const handleLike = (id, title, img) => {
    if (!auth.currentUser) {
      return showModal("Register","Register first")
    }

    updateDoc(doc(db, "users", state.user.name), {
      liked_movies: arrayUnion({ id, title, img }),
    }).then(() => {
      dispatch({ type: "ADD_LIKED_MOVIE", payload: { id, title, img } });
    }).catch(()=>{
      showModal("Error","Error ocurred, try later")
    });
  };

  const handleDislike = (id, title, img) => {
    updateDoc(doc(db, "users", state.user.name), {
      liked_movies: arrayRemove({ id, title, img }),
    }).then(() => {
      dispatch({ type: "REMOVE_LIKED_MOVIE", payload: id });
    });
  };

  const value = {
      state,
      signup,
      signout,
      login,
      handleLike,
      handleDislike,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
