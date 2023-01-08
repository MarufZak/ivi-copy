import { createContext, useContext } from "react";

const TrackContext = createContext();

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

const TrackProvider = () => {
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
      dispatch({ type: "TREND_ERROR_TRUE", payload: error.code });
    }

    dispatch({ type: "TREND_LOADING_FALSE" });
  };

  useEffect(() => {
    fetchPopular(popularMoviesUrl);
    fetchRated(ratedMoviesUrl);
    fetchTrend(trendMoviesUrl);
  }, []);

  return <div>TrackProvider</div>;
};

export const useTrackContext = () => {
  return useContext(TrackContext);
};

export default TrackProvider;
