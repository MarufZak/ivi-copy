import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import classes from "./Track.module.css";
import Card from "../Card/Card";
import Arrows from "./Arrows/Arrows";
import Header from "./Header/Header";

const Track = ({ title, movies }) => {
  if (movies.length === 0) return;

  return (
    <div className={classes.track}>
      <Header title={title} />
      <Splide
        className={classes.slider}
        hasTrack={false}
        options={{
          arrows: movies.length > 0,
          perPage: 7,
          gap: 24,
          pagination: false,
          breakpoints: {
            992: {
              perPage: 4,
            },
            578: {
              perPage: 3,
            },
            360: {
              perPage: 2,
            },
          },
        }}
      >
        <SplideTrack>
          {movies.map((movie) => (
            <SplideSlide key={movie.id}>
              <Card {...movie} />
            </SplideSlide>
          ))}
        </SplideTrack>
        <Arrows />
      </Splide>
    </div>
  );
};

export default Track;
