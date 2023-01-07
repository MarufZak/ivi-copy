import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
// 903ec37228132dd7bac42a4df3559321
const popularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1";
const ratedMoviesUrl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1";
const trendMoviesUrl =
  "https://api.themoviedb.org/3/trending/movie/week?api_key=903ec37228132dd7bac42a4df3559321";

export const AppProvider = createContext();

const initialState = {
  popularMovies: {
    error: { state: false, msg: "" },
    movies: [],
    isLoading: false,
  },
  ratedMovies: {
    error: { state: false, msg: "" },
    movies: [],
    isLoading: false,
  },
  trendMovies: {
    error: { state: false, msg: "" },
    movies: [],
    isLoading: false,
  },
  isLoading: false,
  error: { state: false, msg: "" },
};

const reducer = (state, action) => {
  if (action.type === "POPULAR_ERROR_TRUE") {
    return {
      ...state,
      popularMovies: {
        ...state.popularMovies,
        error: { state: true, msg: action.payload },
      },
    };
  }
  if (action.type === "POPULAR_ERROR_FALSE") {
    return {
      ...state,
      popularMovies: {
        ...state.popularMovies,
        error: { state: false, msg: "" },
      },
    };
  }
  if (action.type === "POPULAR_LOADING_TRUE") {
    return {
      ...state,
      popularMovies: {
        ...state.popularMovies,
        isLoading: true,
      },
    };
  }
  if (action.type === "POPULAR_LOADING_FALSE") {
    return {
      ...state,
      popularMovies: {
        ...state.popularMovies,
        isLoading: false,
      },
    };
  }
  if (action.type === "DISPLAY_POPULAR") {
    return {
      ...state,
      popularMovies: { ...state.popularMovies, movies: action.payload },
    };
  }
  if (action.type === "RATED_LOADING_TRUE") {
    return {
      ...state,
      ratedMovies: {
        ...state.ratedMovies,
        isLoading: true,
      },
    };
  }
  if (action.type === "RATED_LOADING_FALSE") {
    return {
      ...state,
      ratedMovies: {
        ...state.ratedMovies,
        isLoading: false,
      },
    };
  }
  if (action.type === "RATED_ERROR_TRUE") {
    return {
      ...state,
      ratedMovies: {
        ...state.ratedMovies,
        error: { state: true, msg: action.payload },
      },
    };
  }
  if (action.type === "RATED_ERROR_FALSE") {
    return {
      ...state,
      ratedMovies: {
        ...state.ratedMovies,
        error: { state: false, msg: "" },
      },
    };
  }
  if (action.type === "DISPLAY_RATED") {
    return {
      ...state,
      ratedMovies: { ...state.ratedMovies, movies: action.payload },
    };
  }
  if (action.type === "TREND_LOADING_TRUE") {
    return {
      ...state,
      trendMovies: {
        ...state.trendMovies,
        isLoading: true,
      },
    };
  }
  if (action.type === "TREND_LOADING_FALSE") {
    return {
      ...state,
      trendMovies: {
        ...state.trendMovies,
        isLoading: false,
      },
    };
  }
  if (action.type === "TREND_ERROR_TRUE") {
    return {
      ...state,
      trendMovies: {
        ...state.trendMovies,
        error: { state: true, msg: action.payload },
      },
    };
  }
  if (action.type === "TREND_ERROR_FALSE") {
    return {
      ...state,
      trendMovies: {
        ...state.trendMovies,
        error: { state: false, msg: "" },
      },
    };
  }
  if (action.type === "DISPLAY_TREND") {
    return {
      ...state,
      trendMovies: { ...state.trendMovies, movies: action.payload },
    };
  }
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPopular = async (url) => {
    dispatch({ type: "POPULAR_LOADING_TRUE" });
    dispatch({ type: "POPULAR_ERROR_FALSE" });

    try {
      const response = await axios(url);
      const data = response.data.results;

      dispatch({ type: "DISPLAY_POPULAR", payload: data });
    } catch (error) {
      dispatch({ type: "POPULAR_ERROR_TRUE", payload: error.code });
    }

    dispatch({ type: "POPULAR_LOADING_FALSE" });
  };

  const fetchRated = async (url) => {
    dispatch({ type: "RATED_LOADING_TRUE" });
    dispatch({ type: "RATED_ERROR_FALSE" });

    try {
      const response = await axios(url);
      const data = response.data.results;

      dispatch({ type: "DISPLAY_RATED", payload: data });
    } catch (error) {
      dispatch({ type: "RATED_ERROR_TRUE", payload: error.code });
    }

    dispatch({ type: "RATED_LOADING_FALSE" });
  };

  const fetchTrend = async (url) => {
    dispatch({ type: "TREND_LOADING_TRUE" });
    dispatch({ type: "TREND_ERROR_FALSE" });

    try {
      const response = await axios(url);
      const data = response.data.results;

      dispatch({ type: "DISPLAY_TREND", payload: data });
    } catch (error) {
      dispatch({ type: "TREND_ERROR_TRUE",payload: error.code });
    }

    dispatch({ type: "TREND_LOADING_FALSE" });
  };

  useEffect(() => {
    fetchPopular(popularMoviesUrl);
    fetchRated(ratedMoviesUrl);
    fetchTrend(trendMoviesUrl);
  }, []);

  return (
    <AppProvider.Provider value={{ state, dispatch }}>
      {children}
    </AppProvider.Provider>
  );
};

export default AppContext;
