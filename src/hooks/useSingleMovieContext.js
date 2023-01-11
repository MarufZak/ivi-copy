import { useContext } from "react";
import { SingleMovieContext } from "../context/SingleMovieContext";

const useSingleMovieContext = () => {
  return useContext(SingleMovieContext);
};

export default useSingleMovieContext;
