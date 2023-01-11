import { createContext, useReducer } from "react";
import axios from "axios";

export const AppProvider = createContext();

const initialState = {
  isLoading: false,
  error: { state: false, msg: "" },
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
  if (action.type === "ERROR_FALSE") {
    return {
      ...state,
      error: { state: false, msg: "" },
    };
  }
  if (action.type === "ERROR_TRUE") {
    return {
      ...state,
      error: { state: true, msg: action.payload },
    };
  }
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (url, dispatchFunc, dispatchType) => {
    dispatch({ type: "LOADING_TRUE" });

    try {
      const response = await axios(url);
      let data = response.data;
      data = data.results ? data.results : data;

      dispatchFunc({type: dispatchType,payload: data})
    } catch (error) {
      dispatch({ type: "ERROR_TRUE", payload: error.message });
    }
    dispatch({ type: "LOADING_FALSE" });
  };

  const value = {
    state,
    fetchData
  }

  return (
    <AppProvider.Provider value={value}>
      {children}
    </AppProvider.Provider>
  );
};

export default AppContext;
