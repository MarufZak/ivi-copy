import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "../../styles/singleMovie.css";
import Track from '../core/Track/Track';
import Reviews from "./Reviews/Reviews";
import Loading from "../core/Loading";

const SingleMovie = () => {
  const { movieId } = useParams();
  const { state, fetchSingleMovie } = useGlobalContext();

  useEffect(() => {
    fetchSingleMovie(movieId);
  }, [movieId]);

  console.log(state.singleMovie.isLoading);
  if (state.singleMovie.isLoading) {
    return <Loading/>
  }

  const {
    title,
    genres,
    production_countries: countries,
    release_date: date,
    runtime: time,
    vote_average,
    overview,
    vote_count,
    adult,
    backdrop_path: img,
  } = state.singleMovie.movie;

  return (
    <div className="movie">
      <div className="container">
        <Header genres={genres}></Header>
        <div className="movie__body">
          <div className="movie__trailer">
            <div className="movie__trailer-img">
              <picture>
                <source
                  srcSet={`https://image.tmdb.org/t/p/original${img}`}
                  media="(min-width: 576px)"
                />
                <source
                  srcSet={`https://image.tmdb.org/t/p/w500${img}`}
                  media="(max-width: 576px)"
                />
                <img
                  src={"https://image.tmdb.org/t/p/original" + img}
                  alt="trailer"
                />
              </picture>
            </div>
          </div>
          <div className="movie__content">
            <h1 className="movie__title">
              {title} ({date?.slice(0, 4)})
            </h1>
            <ul className="movie__info">
              <li className="movie__info-item">{date?.slice(0, 4)}</li>
              {time && (
                <li className="movie__info-item">
                  {Math.floor(time / 60)} ч. {time % 60} мин
                </li>
              )}
              {adult && <li className="movie__info-item">18+</li>}
            </ul>
            <ul className="movie__genres">
              <li>{countries && countries[0].iso_3166_1}</li>
              {genres?.map((genre) => (
                <li key={genre.id} className="movie__genre">
                  {genre.name}
                </li>
              ))}
            </ul>
            <p className="movie__rating">{vote_average?.toFixed(1)}</p>
            <p className="movie__desc">{overview}</p>
          </div>
        </div>
        <div className="movie__similar">
          <Track type="singleMovie" title={`С фильмом «${title}» смотрят`} movies={state.singleMovie.movie.similarMovies} />
        </div>
        <Reviews reviews={state.singleMovie.movie.reviews} />
      </div>
    </div>
  );
};

export default SingleMovie;
