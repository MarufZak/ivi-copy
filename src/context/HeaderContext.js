import { createContext, useEffect, useReducer } from "react";
import useGlobalContext from '../hooks/useGlobalContext';

// https://api.themoviedb.org/3/discover/movie?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=action&with_watch_monetization_types=flatrate

export const HeaderContext = createContext();

// 903ec37228132dd7bac42a4df3559321

const reducer = (state, action) => {
  if (action.type === "QUERY_CHANGE") {
    return {
      ...state,
      query: action.payload,
    };
  }
  if (action.type === "DISPLAY_MOVIES") {
    return {
      ...state,
      movies: action.payload,
    };
  }
  if (action.type === "POPUP_HIDE") {
    return {
      ...state,
      isPopupActive: false
    }
  }
  if (action.type === "POPUP_SHOW") {
    return {
      ...state,
      isPopupActive: true
    }
  }
};

const initialState = {
  query: "",
  page: 1,
  movies: [],
  isPopupActive: false
};

const HeaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {fetchData} = useGlobalContext();

  const showPopup = ()=>{
    document.body.classList.add('lock');
    dispatch({type: "POPUP_SHOW"});
  }

  const hidePopup = ()=>{
    document.body.classList.remove('lock');
    dispatch({type: "POPUP_HIDE"});
  }

  const fetchSearchMovies = ()=>{
    fetchData(`https://api.themoviedb.org/3/search/movie?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&query=${state.query}&page=${state.page}`,dispatch,"DISPLAY_MOVIES");
  }

  const queryChange = (query) => {
    dispatch({ type: "QUERY_CHANGE", payload: query });
  };

  const value = {
    state,
    fetchSearchMovies,
    queryChange,
    showPopup,
    hidePopup
  }

  return (
    <HeaderContext.Provider
      value={value}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
