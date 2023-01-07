import { useContext } from "react";
import { AppProvider } from "../context/AppContext";


const useGlobalContext = () => {
  return useContext(AppProvider);
}

export default useGlobalContext;