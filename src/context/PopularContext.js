import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const PopularContext = createContext();

const initialState = {
  popular_movies_loading: false,
  popular_movies_error: false,
  popular_movies: [],
  total_pages: 1,
  page: 1,
};

const reducer = (state, action) => {
  if (action.type === "FETCH_POPULAR_MOVIES_BEGIN") {
    return {
      ...state,
      popular_movies_loading: true,
      popular_movies_error: false
    }
  } 
  if (action.type === "FETCH_POPULAR_MOVIES_SUCCESS") {
    return {
      ...state,
      popular_movies_loading: false,
      popular_movies: action.payload.popularMovies,
      total_pages: action.payload.totalPages
    }
  }
  if (action.type === "FETCH_POPULAR_MOVIES_ERROR") {
    return {
      ...state,
      popular_movies_loading: false,
      popular_movies_error: true
    }
  }
  if (action.type === "SET_PAGE") {
    return {
      ...state,
      page: action.payload,
    };
  }
};

const PopularProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPopularMovies = async()=>{
    dispatch({type: "FETCH_POPULAR_MOVIES_BEGIN"})    

    try {
      const response = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=${state.page}`);      
      const popularMovies = response.data.results;
      const totalPages = Math.ceil(response.data.total_pages / 1000);

      dispatch({type: "FETCH_POPULAR_MOVIES_SUCCESS",payload: {popularMovies,totalPages}})
    } catch (error) {
      dispatch({type: "FETCH_POPULAR_MOVIES_ERROR"})
    }
  }

  const setPage = (page) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

  useEffect(()=>{
    fetchPopularMovies();
  },[state.page])

  const value = {
    state,
    fetchPopularMovies,
    setPage,
  };

  return (
    <PopularContext.Provider value={value}>{children}</PopularContext.Provider>
  );
};

export default PopularProvider;
