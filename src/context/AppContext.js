import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
// 903ec37228132dd7bac42a4df3559321
const popularMoviesUrl =
  "https://api.themoviedb.org/3/movie/popular?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&page=1";

export const AppProvider = createContext();

const initialState = {
  popularMovies: [],
  isLoading: false,
  isError: false,
};

const reducer = (state, action) => {
  if (action.type === "LOADING_TRUE") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "LOADING_FALSE") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "ERROR_TRUE") {
    return {
      ...state,
      isError: { state: true, msg: action.payload },
    };
  }
  if (action.type === "ERROR_FALSE") {
    return {
      ...state,
      isError: { state: false, msg: "" },
    };
  }
  if (action.type === "DISPLAY_POPULAR") {
    return {
      ...state,
      popularMovies: action.payload,
    };
  }
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchPopular = async (url) => {
    dispatch({ type: "LOADING_TRUE" });
    dispatch({ type: "ERROR_FALSE" });

    try {
      const response = await axios(url);
      const data = response.data.results;

      console.log(data);

      dispatch({ type: "DISPLAY_POPULAR", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR_TRUE", payload: error.msg });
    }

    dispatch({ type: "LOADING_FALSE" });
  };

  useEffect(() => {
    fetchPopular(popularMoviesUrl);
  }, []);

  return (
    <AppProvider.Provider value={{ state }}>{children}</AppProvider.Provider>
  );
};

export default AppContext;
