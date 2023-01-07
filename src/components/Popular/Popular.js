import "../../styles/popular.css";
import { Splide, SplideTrack } from "@splidejs/react-splide";
import Slide from "./Slide";
import useGlobalContext from "../../hooks/useGlobalContext";
import Icon from '../core/Icon';

const Popular = () => {
  const { state } = useGlobalContext();

  console.log(state.popularMovies);

  return (
    <div className="popular">
      <div className="container">
        <header className="popular__header">
          <h2 className="popular__title">Рекомендуем вам посмотреть</h2>
        </header>
        <Splide className="popular__slider"
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
          hasTrack={false}
        >
          <SplideTrack>
            {state.popularMovies?.map((movie) => (
              <Slide key={movie.id} {...movie} />
            ))}
          </SplideTrack>
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev popular__slider-arrow">
              <Icon>arrow</Icon>
            </button>
            <button className="splide__arrow splide__arrow--next popular__slider-arrow">
              <Icon>arrow</Icon>
            </button>
          </div>
        </Splide>
      </div>
    </div>
  );
};

export default Popular;
