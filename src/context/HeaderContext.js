import { createContext, useReducer } from "react";
import axios from "axios";

export const HeaderContext = createContext();

// 903ec37228132dd7bac42a4df3559321

const reducer = (state, action) => {
  if (action.type === "SEARCH_TRUE") {
    return {
      ...state,
      isSearchActive: true,
    };
  }
  if (action.type === "SEARCH_FALSE") {
    return {
      ...state,
      isSearchActive: false,
    };
  }
  if (action.type === "QUERY_CHANGE") {
    return {
      ...state,
      query: action.payload,
    };
  }
  if (action.type === "DISPLAY_MOVIES") {
    return {
      ...state,
      movies: action.payload,
    };
  }
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
      error: { state: true, msg: action.payload },
    };
  }
  if (action.type === "ERROR_FALSE") {
    return {
      ...state,
      error: { state: false, msg: "" },
    };
  }
};

const initialState = {
  isSearchActive: false,
  query: "",
  page: 1,
  movies: [],
  isLoading: false,
  error: { state: false, msg: "" },
};

const HeaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchTrue = () => {
    dispatch({ type: "SEARCH_TRUE" });
  };
  const searchFalse = () => {
    dispatch({ type: "SEARCH_FALSE" });
  };

  const fetchSearchMovies = async () => {
    dispatch({ type: "LOADING_TRUE" });
    dispatch({ type: "ERROR_FALSE" });

    try {
      const response = await axios(
        `https://api.themoviedb.org/3/search/movie?api_key=903ec37228132dd7bac42a4df3559321&language=en-US&query=${state.query}&page=${state.page}&include_adult=false`
      );
      const data = response.data.results;

      dispatch({ type: "DISPLAY_MOVIES", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR_TRUE", payload: error.code });
    }

    dispatch({ type: "LOADING_TRUE" });
  };

  const queryChange = (query) => {
    dispatch({ type: "QUERY_CHANGE", payload: query });
  };

  return (
    <HeaderContext.Provider
      value={{ state, searchTrue,searchFalse, fetchSearchMovies, queryChange }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
