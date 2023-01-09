import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Track from "../core/Track/Track";
import Reviews from "./Reviews/Reviews";
import Loading from "../core/Loading";
import Header from "./Header/Header";
import placeholderImage from "../../assets/images/placeholder.jpg";
import classes from "./SingleMovie.module.css";

const SingleMovie = () => {
  const { movieId } = useParams();
  const { state, fetchSingleMovie } = useGlobalContext();

  useEffect(() => {
    fetchSingleMovie(movieId);
  }, [movieId]);

  if (state.singleMovie.isLoading) {
    return <Loading />;
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
    <div className={classes.movie}>
      <div className="container">
        <Header genres={genres}></Header>
        <div className={classes.body}>
          <div className={classes.trailer}>
            <div className={classes.img}>
              {img ? (
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
              ) : (
                <img src={placeholderImage} alt="image is not available" />
              )}
            </div>
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
              {adult && <li className="movie__info-item">18+</li>}
            </ul>
            <ul className={classes.genres}>
              <li>{countries && countries[0]?.iso_3166_1}</li>
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
            type="singleMovie"
            title={`С фильмом «${title}» смотрят`}
            movies={state.singleMovie.movie.similarMovies}
          />
        </div>
        <Reviews reviews={state.singleMovie.movie.reviews} />
      </div>
    </div>
  );
};

export default SingleMovie;
