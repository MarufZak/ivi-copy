import { createContext, useReducer } from "react";
import axios from "axios";

export const AppProvider = createContext();

const initialState = {
  modal: {
    state: false,
    title: '',
    text: ''
  }
};

const reducer = (state, action) => {
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

  const showModal = (title,text)=>{
    dispatch({type: "SHOW_MODAL",payload: {title,text}})
  }

  const hideModal = ()=>{
    dispatch({type: "HIDE_MODAL"})
  }

  const value = {
    state,
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
