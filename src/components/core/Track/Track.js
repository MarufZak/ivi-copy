import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useState, useEffect } from "react";
import useGlobalContext from '../../../hooks/useGlobalContext';
import Icon from '../Icon';
import classes from "./Track.module.css";
import Card from "../Card/Card";

const Track = ({ title, movies, type }) => {
  const [error, setError] = useState({ state: false, msg: "" });
  const { state } = useGlobalContext();

  useEffect(() => {
    if (state[type]?.error.state === true) {
      setError({ state: true, msg: state[type].error.msg });
    }
  }, [state[type]?.error.state]);



  return (
    <div className={classes.track}>
      {error.state && <h2>Error: {error.msg}</h2>}
      <header className={classes.header}>
        <h2 className={classes.title}>{movies?.length>0 ? title : ''}</h2>
      </header>
      <Splide
        className={classes.slider}
        hasTrack={false}
        options={{
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
          {movies?.map((movie) => (
            <SplideSlide key={movie.id}>
              <Card {...movie} />
            </SplideSlide>
          ))}
        </SplideTrack>
          <div className={`splide__arrows ${classes.slider__arrows}`}>
          <button className={`splide__arrow splide__arrow--prev ${classes.slider__arrow}`}>
            <Icon>arrow</Icon>
          </button>
          <button className={`splide__arrow splide__arrow--next ${classes.slider__arrow}`}>
            <Icon>arrow</Icon>
          </button>
        </div>
      </Splide>
    </div>
  );
};

export default Track;
