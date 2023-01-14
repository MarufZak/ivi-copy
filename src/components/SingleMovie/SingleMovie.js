import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews/Reviews";
import Header from "./Header/Header";
import classes from "./SingleMovie.module.css";
import {Picture,Loading,Track} from '../core'
import {useGlobalContext,useSingleMovieContext} from '../../hooks';
import Body from "./Body/Body";

const SingleMovie = () => {
  const { movieId } = useParams();
  const {state:globalState} = useGlobalContext();
  const {state,fetchSingleMovie} = useSingleMovieContext();

  useEffect(()=>{
    fetchSingleMovie(movieId);
  },[movieId])

  if (globalState.isLoading) {
    return <Loading />;
  }

  if (!state.movie.title) return;

  const { title, genres } = state.movie;

  return (
    <div className={classes.movie}>
      <div className="container">
        <Header genres={genres}></Header>
        <Body {...state.movie} />
        <div className={classes.similar}>
          <Track
            title={`С фильмом «${title}» смотрят`}
            movies={state.similarMovies}
          />
        </div>
        <Reviews reviews={state.reviews} />
      </div>
    </div>
  );
};

export default SingleMovie;
