import { createContext, useEffect, useReducer } from "react";
import useGlobalContext from "../hooks/useGlobalContext";

export const SingleMovieContext = createContext();

const initialState = {
  movie: {},
  reviews: [],
  similarMovies: [],
};

const reducer = (state, action) => {
  if (action.type === "CLEAR_SINGLE_MOVIE") {
    return {
      movie: {},
      reviews: [],
      similarMovies: [],
    };
  }
  if (action.type === "DISPLAY_MOVIE") {
    return {
      ...state,
      movie: action.payload,
    };
  }
  if (action.type === "DISPLAY_REVIEWS") {
    return {
      ...state,
      reviews: action.payload,
    };
  }
  if (action.type === "DISPLAY_SIMILAR_MOVIES") {
    return {
      ...state,
      similarMovies: action.payload,
    };
  }
};

const SingleMovieProvider = ({children}) => {
  const { fetchData } = useGlobalContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchSingleMovie = (id)=>{
    dispatch({type: "CLEAR_SINGLE_MOVIE"});


    fetchData(`https://api.themoviedb.org/3/movie/${id}?api_key=903ec37228132dd7bac42a4df3559321&language=en-US`,dispatch,"DISPLAY_MOVIE");
    fetchData(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1`,dispatch,"DISPLAY_SIMILAR_MOVIES");
    fetchData(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1`,dispatch,"DISPLAY_REVIEWS");
  }

  const value = {
    state,
    fetchSingleMovie
  }

  return <SingleMovieContext.Provider value={value}>{children}</SingleMovieContext.Provider>;
};

export default SingleMovieProvider;
