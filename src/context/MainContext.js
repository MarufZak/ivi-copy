import axios from "axios";
import { createContext, useEffect } from "react";
import { useReducer } from "react";
const popularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1";
const ratedMoviesUrl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1";
const trendMoviesUrl =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=903ec37228132dd7bac42a4df3559321";

export const MainContext = createContext();

const initialState = {
  popular_movies_loading: false,
  popular_movies_error: false,
  popular_movies: [],
  rated_movies_loading: false,
  rated_movies_error: false,
  rated_movies: [],
  trend_movies_loading: false,
  trend_movies_error: false,
  trend_movies: [],
};

const reducer = (state, action) => {
  if (action.type === "GET_POPULAR_BEGIN") {
    return {
      ...state,
      popular_movies_loading: true,
      popular_movies_error: false
    }
  }
  if (action.type === "GET_POPULAR_SUCCESS") {
    return {
      ...state,
      popular_movies_loading: false,
      popular_movies: action.payload
    }
  }
  if (action.type === "GET_POPULAR_ERROR") {
    return {
      ...state,
      popular_movies_loading: false,
      popular_movies_error: true
    }
  }
  if (action.type === "GET_RATED_BEGIN") {
    return {
      ...state,
      rated_movies_loading: true,
      rated_movies_error: false
    }
  }
  if (action.type === "GET_RATED_SUCCESS") {
    return {
      ...state,
      rated_movies_loading: false,
      rated_movies: action.payload
    }
  }
  if (action.type === "GET_RATED_ERROR") {
    return {
      ...state,
      rated_movies_loading: false,
      rated_movies_error: true,
    }
  }
  if (action.type === "GET_TREND_BEGIN") {
    return {
      ...state,
      trend_movies_loading: true,
      trend_movies_error: false
    }
  }
  if (action.type === "GET_TREND_SUCCESS") {
    return {
      ...state,
      trend_movies_loading: false,
      trend_movies: action.payload
    }
  }
  if (action.type === "GET_TREND_ERROR") {
    return {
      ...state,
      trend_movies_loading: false,
      trend_movies_error: true
    }
  }
};

const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPopular = async(url)=>{
    dispatch({type: "GET_POPULAR_BEGIN"})

    try {
      const response = await axios(url);
      const data = response.data.results;
    
      dispatch({type: "GET_POPULAR_SUCCESS",payload: data})
    } catch (error) {
      dispatch({type: "GET_POPULAR_ERROR"});
    }
  }

  const fetchRated = async(url)=>{
    dispatch({type: "GET_RATED_BEGIN"})

    try {
      const response = await axios(url);
      const data = response.data.results;

      dispatch({type: "GET_RATED_SUCCESS",payload: data})
    } catch (error) {
      dispatch({type: "GET_RATED_ERROR"})
    }
  }

  const fetchTrend = async(url)=>{
    dispatch({type: "GET_TREND_BEGIN"})

    try {
      const response = await axios(url);
      const data = response.data.results;

      dispatch({type: "GET_TREND_SUCCESS",payload: data})
    } catch (error) {
      dispatch({type: "GET_TREND_ERROR"})
    }
  }

  useEffect(()=>{
    fetchPopular(popularMoviesUrl);
    fetchRated(ratedMoviesUrl);
    fetchTrend(trendMoviesUrl);
  },[])

  const value = {
    state
  }

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
