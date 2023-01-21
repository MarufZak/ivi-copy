import { createContext, useReducer } from "react";
import axios from 'axios';

export const SingleMovieContext = createContext();

const initialState = {
  single_movie_loading: false,
  single_movie_error: false,
  movie: {},
  similar_movies: [],
  reviews: []
};

const reducer = (state, action) => {
  if (action.type === "FETCH_SINGLE_MOVIE_BEGIN") {
    return {
      ...state,
      single_movie_loading: true,
      single_movie_error: false
    }  
  }
  if (action.type === "FETCH_SINGLE_MOVIE_SUCCESS") {
    return {
      ...state,
      single_movie_loading: false,
      movie: action.payload.movie,
      similar_movies: action.payload.similarMovies,
      reviews: action.payload.reviews
    }
  }
  if (action.type === "FETCH_SINGLE_MOVIE_ERROR") {
    return {
      ...state,
      single_movie_loading: false,
      single_movie_error: true,
    }
  }
};

const SingleMovieProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchSingleMovie = async(id)=>{
    dispatch({type: "FETCH_SINGLE_MOVIE_BEGIN"});

    try {
      const movieResponse = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=903ec37228132dd7bac42a4df3559321&language=en-US`);
      const similarMoviesResponse = await axios(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1`)
      const reviewsResponse = await axios(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1`)

      const movie = movieResponse.data;
      const similarMovies = similarMoviesResponse.data.results;
      const reviews = reviewsResponse.data.results;

      dispatch({type: "FETCH_SINGLE_MOVIE_SUCCESS",payload: {movie,similarMovies,reviews}})      
    } catch (error) {
      dispatch({type: "FETCH_SINGLE_MOVIE_ERROR"})
    }
  }

  const value = {
    state,
    fetchSingleMovie
  }

  return <SingleMovieContext.Provider value={value}>{children}</SingleMovieContext.Provider>;
};

export default SingleMovieProvider;
