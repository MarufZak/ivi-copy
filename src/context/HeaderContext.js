import axios from "axios";
import { createContext, useReducer } from "react";

export const HeaderContext = createContext();

// 903ec37228132dd7bac42a4df3559321

const reducer = (state, action) => {
  if (action.type === "QUERY_CHANGE") {
    return {
      ...state,
      query: action.payload
    }
  }
  if (action.type === "PAGE_INCREASE") {
    return {
      ...state,
      page: state.page+1
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
  if (action.type === "FETCH_SEARCH_MOVIES_BEGIN") {
    return {
      ...state,
      search_movies_loading: true,
      search_movies_error: false,
    }
  }
  if (action.type === "FETCH_SEARCH_MOVIES_SUCCESS") {
    console.log('success');
    return {
      ...state,
      search_movies_loading: false,
      search_movies: [...state.search_movies,...action.payload],
    }
  } 
  if (action.type === "FETCH_SEARCH_MOVIES_ERROR") {
    return {
      ...state,
      search_movies_loading: false,
      search_movies_error: true
    }
  }
  if (action.type === "CLEAR_SEARCH_MOVIES") {
    return {
      ...state,
      search_movies: [],
    }
  }
};

const initialState = {
  search_movies_loading: false,
  search_movies_error: false,
  search_movies: [],
  isPopupActive: false,
  page: 1,
  query: ''
};

const HeaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showPopup = ()=>{
    document.body.classList.add('lock');
    dispatch({type: "POPUP_SHOW"});
  }

  const hidePopup = ()=>{
    document.body.classList.remove('lock');
    dispatch({type: "POPUP_HIDE"});
  }

  const loadMore = ()=>{
    dispatch({type: "PAGE_INCREASE"})
    
    fetchSearchMovies();
  }

  const queryChange = (query)=>{
    dispatch({type: "QUERY_CHANGE",payload: query})
  }

  const fetchSearchMovies = async()=>{
    dispatch({type: "FETCH_SEARCH_MOVIES_BEGIN"})

    try {
      const response = await axios(`https://api.themoviedb.org/3/search/movie?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&query=${state.query}&page=${state.page}`);
      const data = response.data.results;

      dispatch({type: "FETCH_SEARCH_MOVIES_SUCCESS",payload: data})
    } catch (error) {
      dispatch({type: "FETCH_SEARCH_MOVIES_ERROR"})
    }
  }

  const clearMovies = ()=>{
    dispatch({type: "CLEAR_SEARCH_MOVIES"})
  }

  const value = {
    state,
    fetchSearchMovies,
    showPopup,
    hidePopup,
    loadMore,
    queryChange,
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
