import classes from "./Content.module.css";
import {Track} from "../../core";
import {useMainContext} from '../../../hooks';

const Content = () => {
  const { state } = useMainContext();

  return (
    <div className={classes.content}>
      <div className="container">
        <div className={classes.content__body}>
          <Track
            movies={state.popularMovies}
            title="Рекомендуем вам посмотреть"
          />
          <Track
            movies={state.ratedMovies}
            title="Фильмы с высоким рейтингом"
          />
          <Track
            movies={state.trendMovies}
            title="Фильмы с в тренде"
          />
        </div>
      </div>
    </div>
  );
};

export default Content;
