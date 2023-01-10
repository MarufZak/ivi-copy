import { SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import classes from "./Slide.module.css";
import Image from "../../../core/Image";

const Slide = ({ backdrop_path, title, id, index, activeSlideIndex }) => {
  return (
    <SplideSlide
      className={`${classes.slide} ${
        index === activeSlideIndex && classes["is-active"]
      }`}
    >
      <div className="container">
        <div className={classes.body}>
          <Image
            className={classes.img}
            src={"https://image.tmdb.org/t/p/original/" + backdrop_path}
            alt="movie image"
          ></Image>
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
