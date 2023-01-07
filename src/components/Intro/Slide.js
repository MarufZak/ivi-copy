import { SplideSlide } from "@splidejs/react-splide";
import Button from '../core/Button';

const Slide = ({ backdrop_path, adult,title }) => {
  return (
    <SplideSlide className="intro__slide">
      <div className="container">
        <div className="intro__slide-body">
            <img className="intro__slide-img"
              src={"https://image.tmdb.org/t/p/original/" + backdrop_path}
              alt="movie image"
            />
            <article className="intro__slide-info">
                <h2 className="intro__slide-title">{title}</h2>
                <Button>Смотреть по подписке</Button>
            </article>
        </div>
      </div>
    </SplideSlide>
  );
};

export default Slide;
