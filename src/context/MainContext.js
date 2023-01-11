import { createContext } from "react";
import { useReducer } from "react";
import useGlobalContext from "../hooks/useGlobalContext";
const popularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1";
const ratedMoviesUrl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1";
const trendMoviesUrl =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=903ec37228132dd7bac42a4df3559321";

export const MainContext = createContext();

const initialState = {
  popularMovies: [],
  ratedMovies: [],
  trendMovies: [],
};

const reducer = (state, action) => {
  if (action.type === "DISPLAY_POPULAR") {
    return {
      ...state,
      popularMovies: action.payload,
    };
  }
  if (action.type === "DISPLAY_RATED") {
    return {
      ...state,
      ratedMovies: action.payload,
    };
  }
  if (action.type === "DISPLAY_TREND") {
    return {
      ...state,
      trendMovies: action.payload,
    };
  }
};

const MainProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetchData } = useGlobalContext();

  const fetchMain = () => {
    fetchData(popularMoviesUrl, dispatch, "DISPLAY_POPULAR");
    fetchData(ratedMoviesUrl, dispatch, "DISPLAY_RATED");
    fetchData(trendMoviesUrl,dispatch,"DISPLAY_TREND");
  };

  const value = {
    state,
    fetchMain
  }

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainProvider;
