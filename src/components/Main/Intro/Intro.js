import { Splide, SplideTrack } from "@splidejs/react-splide";
import {useMainContext} from '../../../hooks';
import { useState } from 'react';
import Slide from "./Slide/Slide";
import classes from "./Intro.module.css";
import Arrows from "./Arrows/Arrows";

const Intro = () => {
  const { state } = useMainContext();
  const [activeSlideIndex,setActiveSlideIndex] = useState(0);

  return (
    <Splide 
      onActive={(e)=>setActiveSlideIndex(e.index)}
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
        {state.popularMovies.slice(14,17).map((movie,index) => (
          <Slide activeSlideIndex={activeSlideIndex} key={movie.id} index={index} {...movie} />
        ))}
      </SplideTrack>
      <Arrows/>
    </Splide>
  );
};

export default Intro;
