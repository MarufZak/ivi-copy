import classes from "./Body.module.css";
import Picture from '../../core/Picture';

const Body = (props) => {
  const { backdrop_path: img, title, release_date: date, runtime: time, genres, vote_average,overview} = props;
  return (
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
          <img
            className={classes.img}
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
  );
};

export default Body;
