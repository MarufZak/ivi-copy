import { createContext, useReducer } from "react";
import useGlobalContext from "../hooks/useGlobalContext";

export const PopularContext = createContext();

const initialState = {
  popularMovies: [],
  page: 1,
  totalPages: 1,
};

const reducer = (state, action) => {
  const totalPages =  action.totalPages > 90 ? 100 : action.totalPages > 40 ? 50 : action.totalPages;
  if (action.type === "DISPLAY_POPULAR") {
    return {
      ...state,
      popularMovies: action.payload,
      totalPages
    };
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
  const { fetchData } = useGlobalContext();

  const fetchPopularMovies = () => {
    dispatch({ type: "SET_PAGE", payload: state.page });

    fetchData(
      `https://api.themoviedb.org/3/movie/popular?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=${state.page}`,
      dispatch,
      "DISPLAY_POPULAR"
    );
  };

  const setPage = (page) => {
    dispatch({ type: "SET_PAGE", payload: page });
  };

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
