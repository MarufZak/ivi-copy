import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews/Reviews";
import Header from "./Header/Header";
import Body from "./Body/Body";
import classes from "./SingleMovie.module.css";
import {Loading, Track} from '../core'
import {useSingleMovieContext} from '../../hooks';

const SingleMovie = () => {
  const { movieId } = useParams();
  const {state,fetchSingleMovie} = useSingleMovieContext();

  useEffect(()=>{
    fetchSingleMovie(movieId);
  },[movieId])

  if (state.single_movie_loading) {
    return <Loading/>
  }

  return (
    <div className={classes.movie}>
      <div className="container">
        <Header genres={state.movie.genres}></Header>
        <Body {...state.movie} />
        <div className={classes.similar}>
          <Track
            title={`С фильмом «${state.movie.title}» смотрят`}
            movies={state.similar_movies}
          />
        </div>
        <Reviews reviews={state.reviews} />
      </div>
    </div>
  );
};

export default SingleMovie;
