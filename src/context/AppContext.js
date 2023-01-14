import { createContext, useReducer } from "react";
import axios from "axios";

export const AppProvider = createContext();

const initialState = {
  isLoading: false,
  error: { state: false, msg: "" },
  modal: {}
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
  if (action.type === "SHOW_MODAL") {
    return {
      ...state,
      modal: {
        state: true,
        title: action.payload.title,
        text: action.payload.text
      }
    }
  }
  if (action.type === "HIDE_MODAL") {
    return {
      ...state,
      modal: {
        state: false,
        title: "",
        text: ""
      }
    }
  }
};

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async (url, dispatchFunc, dispatchType) => {
    dispatch({ type: "LOADING_TRUE" });

    try {
      const response = await axios(url);
      let data = response.data;
      let pages = data.total_pages || 0;
      data = data.results ? data.results : data;

      dispatchFunc({type: dispatchType,payload: data , totalPages: pages})
    } catch (error) {
      dispatch({ type: "ERROR_TRUE", payload: error.message });
    }
    dispatch({ type: "LOADING_FALSE" });
  };

  const handleError = (error)=>{
    dispatch({type: "ERROR_TRUE",payload: error})
  }

  const showModal = (title,text)=>{
    dispatch({type: "SHOW_MODAL",payload: {title,text}})
  }

  const hideModal = ()=>{
    dispatch({type: "HIDE_MODAL"})
  }

  const value = {
    state,
    fetchData,
    handleError,
    showModal,
    hideModal
  }

  return (
    <AppProvider.Provider value={value}>
      {children}
    </AppProvider.Provider>
  );
};

export default AppContext;
