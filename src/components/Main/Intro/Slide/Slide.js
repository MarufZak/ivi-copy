import { SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import classes from "./Slide.module.css";
import {Picture} from "../../../core";

const Slide = ({ backdrop_path, title, id, index, activeSlideIndex }) => {
  return (
    <SplideSlide
      className={`${classes.slide} ${
        index === activeSlideIndex && classes.isActive
      }`}
    >
      <div className="container">
        <div className={classes.body}>
          <Picture>
            <source srcSet={"https://image.tmdb.org/t/p/original/" + backdrop_path} media="(min-width: 577px)" />
            <source srcSet={"https://image.tmdb.org/t/p/w500/" + backdrop_path} media="(max-width: 576px)" />
            <img src={"https://image.tmdb.org/t/p/original/" + backdrop_path} className={classes.img} alt="movie image" />
          </Picture>
          <article className={classes.info}>
            <h2 className={classes.title}>{title}</h2>
            <Link to={`/movie/${id}`} className="btn btn--red">
              Смотреть по подписке
            </Link>
          </article>
        </div>
      </div>
    </SplideSlide>
  );
};

export default Slide;
