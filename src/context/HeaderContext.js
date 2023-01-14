import { createContext, useEffect, useReducer } from "react";
import useGlobalContext from '../hooks/useGlobalContext';

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
      page: state.page+1,
      movies: [...state.movies,...action.payload],
    };
  }
  if (action.type === "CLEAR_MOVIES") {
    return {
      ...state,
      page: 1,
      movies: []
    }
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

  const clearMovies = ()=>{
    dispatch({type: "CLEAR_MOVIES"})
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
    hidePopup,
    clearMovies
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
