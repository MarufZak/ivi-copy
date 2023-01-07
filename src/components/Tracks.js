import Track from "./core/Track/Track";
import useGlobalContext from "../hooks/useGlobalContext";

const Tracks = () => {
  const { state } = useGlobalContext();

  return (
    <div className="tracks">
      <div className="container">
        <div className="tracks__body">
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

export default Tracks;
