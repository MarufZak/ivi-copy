import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews/Reviews";
import Header from "./Header/Header";
import classes from "./SingleMovie.module.css";
import {Picture,Loading,Track} from '../core'
import {useGlobalContext,useSingleMovieContext} from '../../hooks';

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

  const {
    title,
    genres,
    release_date: date,
    runtime: time,
    vote_average,
    overview,
    backdrop_path: img,
  } = state.movie;

  return (
    <div className={classes.movie}>
      <div className="container">
        <Header genres={genres}></Header>
        <div className={classes.body}>
          <div className={classes.img_block}>
              <Picture>
                  <source
                    srcSet={`https://image.tmdb.org/t/p/original${img}`}
                    media="(min-width: 576px)"
                  />
                  <source
                    srcSet={`https://image.tmdb.org/t/p/w500${img}`}
                    media="(max-width: 576px)"
                  />
                  <img className={classes.img}
                    src={"https://image.tmdb.org/t/p/original" + img}
                    alt="trailer"
                  />
              </Picture>
          </div>
          <div className={classes.content}>
            <h1 className={classes.title}>
              {title} ({date?.slice(0, 4)})
            </h1>
            <ul className={classes.info}>
              <li className="movie__info-item">{date?.slice(0, 4)}</li>
              {time && (
                <li className="movie__info-item">
                  {Math.floor(time / 60)} ч. {time % 60} мин
                </li>
              )}
            </ul>
            <ul className={classes.genres}>
              {genres?.map((genre) => (
                <li key={genre.id} className={classes.genre}>
                  {genre.name}
                </li>
              ))}
            </ul>
            <p className={classes.rating}>{vote_average?.toFixed(1)}</p>
            <p className={classes.desc}>{overview}</p>
          </div>
        </div>
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
