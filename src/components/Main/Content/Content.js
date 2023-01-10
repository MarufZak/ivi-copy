import classes from "./Content.module.css";
import useGlobalContext from "../../../hooks/useGlobalContext";
import Track from "../../core/Track/Track";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const Content = () => {
  const { state } = useGlobalContext();

  return (
    <div className={classes.content}>
      <div className="container">
        <div className={classes.content__body}>
          <Track
            type="popularMovies"
            movies={state.popularMovies.movies}
            title="Рекомендуем вам посмотреть"
          />
          <Track
            type="ratedMovies"
            movies={state.ratedMovies.movies}
            title="Фильмы с высоким рейтингом"
          />
          <Track
            type="trendMovies"
            movies={state.trendMovies.movies}
            title="Фильмы с в тренде"
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
