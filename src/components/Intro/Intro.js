import "../../styles/intro.css";
import { Splide, SplideTrack } from "@splidejs/react-splide";
import Slide from "./Slide";
import useGlobalContext from "../../hooks/useGlobalContext";
import Icon from "../core/Icon";
import Loading from '../core/Loading';

const Intro = () => {
  const { state } = useGlobalContext();

  if (state.popularMovies.isLoading || state.ratedMovies.isLoading || state.trendMovies.isLoading) {
    return <Loading/>
  }

  return (
    <Splide
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
        {state.popularMovies.movies?.slice(3, 6).map((movie) => (
          <Slide key={movie.id} {...movie} />
        ))}
      </SplideTrack>
      <div className="splide__arrows">
        <button className="splide__arrow splide__arrow--prev intro__slider-arrow">
          <Icon>arrow</Icon>
        </button>
        <button className="splide__arrow splide__arrow--next intro__slider-arrow">
          <Icon>arrow</Icon>
        </button>
      </div>
    </Splide>
  );
};

export default Intro;
