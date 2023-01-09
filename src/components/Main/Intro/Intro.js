import { Splide, SplideTrack } from "@splidejs/react-splide";
import Slide from "./Slide/Slide";
import useGlobalContext from "../../../hooks/useGlobalContext";
import Icon from "../../core/Icon";
import Loading from "../../core/Loading";
import { useState } from 'react';
import classes from "./Intro.module.css";;

const Intro = () => {
  const { state } = useGlobalContext();
  const [activeSlideIndex,setActiveSlideIndex] = useState(0);

  if (
    state.popularMovies.isLoading ||
    state.ratedMovies.isLoading ||
    state.trendMovies.isLoading
  ) {
    return <Loading />;
  }

  return (
    <Splide onActive={(e)=>setActiveSlideIndex(e.index)}
      className={classes.slider}
      hasTrack={false}
      options={{
        height: 430,
        padding: { left: 100, right: 100 },
        gap: 24,
        breakpoints: {
          576: {
            padding: { left: 50, right: 50 },
          },
        },
        pagination: false,
      }}
    >
      <SplideTrack>
        {state.popularMovies.movies?.slice(3, 6).map((movie,index) => (
          <Slide activeSlideIndex={activeSlideIndex} key={movie.id} index={index} {...movie} />
        ))}
      </SplideTrack>
      <div className="splide__arrows">
        <button className={`splide__arrow splide__arrow--prev ${classes.slider__arrow}`}>
          <Icon>arrow</Icon>
        </button>
        <button className={`splide__arrow splide__arrow--next ${classes.slider__arrow}`}>
          <Icon>arrow</Icon>
        </button>
      </div>
    </Splide>
  );
};

export default Intro;
